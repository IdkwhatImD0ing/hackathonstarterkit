import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import index from "@/content/generated/agent-skills/index.json";

const SKILLS_DIR = join(process.cwd(), "content", "generated", "agent-skills");

const VALID_NAMES = new Set(index.skills.map((s) => s.name));

/** Serves the SKILL.md artifact for a skill listed in the discovery index. */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;
  if (!VALID_NAMES.has(name)) {
    return new NextResponse("Unknown skill.\n", { status: 404 });
  }
  const body = await readFile(join(SKILLS_DIR, name, "SKILL.md"), "utf8");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}

export function generateStaticParams() {
  return index.skills.map((s) => ({ name: s.name }));
}
