export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  readingTime: string;
  keywords: string[];
  content: BlogSection[];
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "callout"; variant: "tip" | "warning" | "info" | "success"; title?: string; text: string }
  | { type: "stat-row"; stats: { value: string; label: string }[] }
  | { type: "image"; src: string; alt: string; caption?: string; credit?: string; href?: string }
  | { type: "video"; src: string; title: string; caption?: string; credit?: string }
  | { type: "step-list"; steps: { title: string; description: string }[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "pro-con"; pros: string[]; cons: string[] }
  | { type: "code-snippet"; language: string; code: string; filename?: string }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "link-card"; title: string; description: string; href: string; tag?: string }
  | {
      type: "cta-button";
      title: string;
      description?: string;
      label: string;
      href: string;
      tag?: string;
      sponsored?: boolean;
    };

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  blocks?: ContentBlock[];
}
