import { describe, expect, it } from "vitest";
import { extractMain, htmlPageToMarkdown } from "@/lib/markdown/html-to-md";

describe("htmlPageToMarkdown", () => {
  it("strips nav, buttons, badges, forms, and svg chrome", () => {
    const html = `<html><head><title>T</title></head><body><main>
      <nav><a href="/">Home</a></nav>
      <span data-slot="badge">PHASE 5 OF 7</span>
      <button>Click me</button>
      <a data-slot="button" href="/next">Next phase</a>
      <form><input /></form>
      <svg><path d="M0 0" /></svg>
      <h2>Real Heading</h2>
      <p>Real content stays.</p>
    </main></body></html>`;
    const md = htmlPageToMarkdown(html);
    expect(md).toContain("## Real Heading");
    expect(md).toContain("Real content stays.");
    expect(md).not.toContain("PHASE 5 OF 7");
    expect(md).not.toContain("Click me");
    expect(md).not.toContain("Next phase");
    expect(md).not.toContain("Home");
  });

  it("preserves code fences and language annotations", () => {
    const html = `<main><pre><code class="language-python">print("hi")</code></pre></main>`;
    const md = htmlPageToMarkdown(html);
    expect(md).toContain('```python\nprint("hi")\n```');
  });

  it("emits plain fences for pre blocks without a language", () => {
    const html = `<main><pre>npm install
npm run dev</pre></main>`;
    const md = htmlPageToMarkdown(html);
    expect(md).toContain("```\nnpm install\nnpm run dev\n```");
  });

  it("absolutizes relative links and images and keeps alt text", () => {
    const html = `<main>
      <a href="/playbook/pitching">the pitching guide</a>
      <img src="/blog/demo.png" alt="A demo screenshot" />
    </main>`;
    const md = htmlPageToMarkdown(html);
    expect(md).toContain("[the pitching guide](https://thehackathonplaybook.dev/playbook/pitching)");
    expect(md).toContain("![A demo screenshot](https://thehackathonplaybook.dev/blog/demo.png)");
  });

  it("demotes in-body h1 to h2 and drops the page header block", () => {
    const html = `<main>
      <header><h1>Pitching</h1><p>subtitle</p></header>
      <h1>Another top heading</h1>
      <p>body</p>
    </main>`;
    const md = htmlPageToMarkdown(html);
    expect(md).not.toContain("# Pitching");
    expect(md).toContain("## Another top heading");
  });

  it("falls back to body when no main exists, without leaking head", () => {
    const html = `<html><head><title>Leaky Title</title></head><body><p>only content</p></body></html>`;
    expect(extractMain(html)).not.toContain("Leaky Title");
    expect(htmlPageToMarkdown(html)).toBe("only content");
  });
});
