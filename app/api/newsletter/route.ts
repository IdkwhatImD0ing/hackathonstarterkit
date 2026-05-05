const BEEHIIV_API_URL = "https://api.beehiiv.com/v2";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const IP_SUBMISSION_LIMIT = 10;
const EMAIL_SUBMISSION_LIMIT = 3;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  newsletterRateLimits?: Map<string, RateLimitBucket>;
};

const rateLimits =
  globalForRateLimit.newsletterRateLimits ?? new Map<string, RateLimitBucket>();
globalForRateLimit.newsletterRateLimits = rateLimits;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function checkRateLimit(key: string, limit: number) {
  const now = Date.now();
  const bucket = rateLimits.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function genericSuccess() {
  return Response.json({
    ok: true,
    message: "Check your inbox to confirm your subscription.",
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { email, website, source } =
    typeof payload === "object" && payload !== null
      ? (payload as {
          email?: unknown;
          website?: unknown;
          source?: unknown;
        })
      : {};

  if (typeof website === "string" && website.trim() !== "") {
    return genericSuccess();
  }

  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return Response.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const clientIp = getClientIp(request);

  if (
    !checkRateLimit(`ip:${clientIp}`, IP_SUBMISSION_LIMIT) ||
    !checkRateLimit(`email:${normalizedEmail}`, EMAIL_SUBMISSION_LIMIT)
  ) {
    return Response.json(
      { ok: false, message: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!publicationId || !apiKey) {
    console.error("Beehiiv newsletter env vars are missing.");
    return Response.json(
      { ok: false, message: "Newsletter signup is not configured yet." },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${BEEHIIV_API_URL}/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normalizedEmail,
        reactivate_existing: false,
        send_welcome_email: true,
        double_opt_override: "on",
        utm_source: "blog",
        utm_medium: "website",
        utm_campaign: "blog_subscribe",
        referring_site:
          typeof source === "string" && source.length <= 500
            ? source
            : undefined,
      }),
    },
  );

  if (response.ok || [400, 409, 422].includes(response.status)) {
    return genericSuccess();
  }

  console.error("Beehiiv subscription failed", {
    status: response.status,
    body: await response.text(),
  });

  return Response.json(
    {
      ok: false,
      message: "Something went wrong. Please try again in a minute.",
    },
    { status: 502 },
  );
}
