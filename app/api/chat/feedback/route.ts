import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp } from "@/lib/request-ip";
import { rateLimit } from "@/lib/rate-limit";
import { TRACE_ID_PATTERN, recordFeedback } from "@/lib/tracing/firetrace";

/**
 * Thumbs up or down on one chat answer, keyed by the trace id /api/chat
 * streamed for that turn.
 *
 * The rating is recorded as a FireTrace score on that trace (see
 * recordFeedback in lib/tracing/firetrace.ts). Responses are 204: the
 * widget marks the button pressed optimistically and there is nothing to
 * read back.
 *
 * Not authenticated, and it does not need to be. A trace id is 128 bits
 * of randomness handed only to the client that asked the question, so
 * ratings cannot be sprayed at arbitrary answers, and the per-IP limit
 * caps how fast one client can vote.
 */

const RATE_LIMIT_MAX = Number(process.env.CHAT_FEEDBACK_RATE_LIMIT_MAX ?? 60);

const RequestSchema = z.object({
  traceId: z.string().regex(TRACE_ID_PATTERN),
  rating: z.enum(["up", "down"]),
});

export async function POST(request: NextRequest) {
  // Same-origin check, same rationale as /api/chat.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) {
        return NextResponse.json({ code: "forbidden" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ code: "forbidden" }, { status: 403 });
    }
  }

  const ip = getClientIp(request.headers);
  const limit = await rateLimit(`chat-feedback:${ip}`, RATE_LIMIT_MAX);
  if (!limit.allowed) {
    return NextResponse.json(
      { code: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: z.infer<typeof RequestSchema>;
  try {
    body = RequestSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ code: "invalid" }, { status: 400 });
  }

  recordFeedback({ traceId: body.traceId, rating: body.rating });
  return new NextResponse(null, { status: 204 });
}
