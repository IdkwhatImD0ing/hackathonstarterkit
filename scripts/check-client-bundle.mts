/**
 * Fails the build if anything that looks like an API key leaks into the
 * client bundles. Runs after `next build`; CI gate.
 *
 * Two checks:
 * 1. Generic secret patterns (OpenAI sk-*, Upstash tokens) in any client
 *    chunk under .next/static.
 * 2. If secret env vars are set at build time, their literal values must
 *    not appear (catches an accidental NEXT_PUBLIC_ rename or inlining).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const STATIC_DIR = join(process.cwd(), ".next", "static");

// The tail requires 20+ chars with no hyphen: real OpenAI keys are long
// alphanumeric/underscore runs, while CSS utility names in the bundle
// (e.g. "mask-image-linear-from-pos", which contains "sk-image-...")
// are hyphenated lowercase words.
const PATTERNS: [string, RegExp][] = [
  ["OpenAI key", /(?<![A-Za-z0-9-])sk-(?:proj-)?[A-Za-z0-9_]{20,}/],
  ["FireTrace key", /ft_live_[0-9a-f]{16}_[0-9a-f]{64}/],
];

const SECRET_ENV_VARS = [
  "OPENAI_API_KEY",
  "UPSTASH_REDIS_REST_TOKEN",
  "BEEHIIV_API_KEY",
  "ORIGIN_SHARED_SECRET",
  "FIRETRACE_API_KEY",
];

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (full.endsWith(".js") || full.endsWith(".css")) yield full;
  }
}

function main() {
  const failures: string[] = [];
  let scanned = 0;

  for (const file of walk(STATIC_DIR)) {
    scanned++;
    const content = readFileSync(file, "utf8");
    for (const [label, pattern] of PATTERNS) {
      if (pattern.test(content)) {
        failures.push(`${file}: matches ${label} pattern`);
      }
    }
    for (const name of SECRET_ENV_VARS) {
      const value = process.env[name];
      if (value && value.length >= 8 && content.includes(value)) {
        failures.push(`${file}: contains the literal value of ${name}`);
      }
    }
  }

  if (failures.length > 0) {
    console.error("Client bundle secret check FAILED:");
    for (const failure of failures) console.error(`  ${failure}`);
    process.exit(1);
  }
  console.log(`Client bundle secret check passed (${scanned} files scanned).`);
}

main();
