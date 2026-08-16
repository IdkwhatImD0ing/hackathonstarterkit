import { describe, expect, it } from "vitest";
import { lexicalSearch } from "@/lib/retrieval/search";

describe("lexicalSearch over the real corpus", () => {
  it("finds pitching content for a pitching question", () => {
    const results = lexicalSearch("how do I pitch to judges", 5);
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.chunk.pagePath.includes("pitch"))).toBe(true);
  });

  it("returns nothing for gibberish", () => {
    expect(lexicalSearch("zzqxqq wvwvwv qqqqz", 5)).toHaveLength(0);
  });

  it("caps results at the limit", () => {
    expect(lexicalSearch("hackathon team idea", 3).length).toBeLessThanOrEqual(3);
  });
});
