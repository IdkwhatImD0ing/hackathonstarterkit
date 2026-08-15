import type { ReactNode } from "react";

/**
 * Minimal Markdown renderer for chat responses: fenced code blocks with a
 * language label, lists, paragraphs, bold, inline code, and links. No
 * dependency; matches how the rest of the site renders code (styled pre,
 * no external highlighter). The model is instructed to stay within this
 * subset.
 */

function renderInline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // links, bold, inline code
  const pattern = /(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1]) {
      nodes.push(
        <a
          key={`${keyBase}-l${i}`}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-volt underline underline-offset-2 hover:text-volt/80"
        >
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      nodes.push(<strong key={`${keyBase}-b${i}`}>{match[5]}</strong>);
    } else if (match[6]) {
      nodes.push(
        <code key={`${keyBase}-c${i}`} className="rounded bg-primary/10 px-1 font-code text-[0.85em]">
          {match[7]}
        </code>,
      );
    }
    last = match.index + match[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function MarkdownLite({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  const lines = text.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    const fence = line.match(/^```(\w*)/);
    if (fence) {
      const language = fence[1];
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i]);
        i++;
      }
      i++; // closing fence (or EOF while streaming)
      blocks.push(
        <div key={key++} className="my-2 overflow-hidden rounded-lg border border-primary/10">
          {language ? (
            <div className="border-b border-primary/10 bg-primary/5 px-3 py-1 font-code text-[10px] uppercase tracking-wider text-muted-foreground">
              {language}
            </div>
          ) : null}
          <pre className="overflow-x-auto bg-background/60 p-3 font-code text-xs leading-relaxed">
            {code.join("\n")}
          </pre>
        </div>,
      );
      continue;
    }

    if (/^\s*(-|\d+\.)\s/.test(line)) {
      const items: string[] = [];
      const ordered = /^\s*\d+\./.test(line);
      while (i < lines.length && /^\s*(-|\d+\.)\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*(-|\d+\.)\s/, ""));
        i++;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List
          key={key++}
          className={`my-2 space-y-1 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}
        >
          {items.map((item, j) => (
            <li key={j}>{renderInline(item, `${key}-${j}`)}</li>
          ))}
        </List>,
      );
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push(
        <p key={key++} className="mt-3 mb-1 font-display text-sm font-bold">
          {renderInline(heading[2], `h${key}`)}
        </p>,
      );
      i++;
      continue;
    }

    const paragraph: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^(```|\s*(-|\d+\.)\s|#{1,6}\s)/.test(lines[i])) {
      paragraph.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-1.5 leading-relaxed">
        {renderInline(paragraph.join(" "), `p${key}`)}
      </p>,
    );
  }

  return <>{blocks}</>;
}
