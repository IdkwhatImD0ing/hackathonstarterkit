"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Trash2, Send, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarkdownLite } from "./markdown-lite";

/**
 * The "Ask the Playbook" chat: floating button bottom-right, glass panel
 * on desktop, full-screen sheet on mobile. Streams from /api/chat,
 * renders citation chips, persists to sessionStorage, and can be opened
 * pre-seeded with the current page via the "playbook-chat:open"
 * CustomEvent (used by the Copy-for-AI dropdown).
 *
 * Accessibility: dialog semantics, focus moves in on open and back on
 * close, Tab is trapped, Escape closes, streamed text lives in an
 * aria-live region, animations respect prefers-reduced-motion via
 * motion-reduce variants.
 */

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  /** Trace id for this answer, the key a thumbs rating is filed under. */
  traceId?: string;
  rating?: Rating;
}

type Rating = "up" | "down";

interface Citation {
  title: string;
  heading: string;
  url: string;
}

const STORAGE_KEY = "playbook-chat";
const SESSION_KEY = "playbook-chat-session";
const MAX_MESSAGE_CHARS = 1500;
const MAX_HISTORY = 10;

const STARTERS = [
  "How do I pick a stack in the first hour?",
  "What makes a hackathon pitch win?",
  "How do I find teammates worth keeping?",
  "What should be in the submission README?",
  "Can I win without knowing how to code?",
];

const ERROR_COPY: Record<string, string> = {
  rate_limited: "You're moving faster than the rate limit. Give it a minute, then ask again.",
  budget: "Chat is taking a break for the rest of the month. Every answer it gives is on the site itself, start at /playbook.",
  disabled: "Chat isn't switched on for this deployment. The whole playbook is still one click away at /playbook.",
  api_error: "The model behind this chat is unreachable right now. Try again in a bit, or read the playbook directly.",
  invalid: "That message didn't go through. Shorten it and try again.",
};

function loadSession(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

/**
 * Id shared by every turn of one conversation, so the turns group together
 * in tracing instead of arriving as unrelated one-offs. Lives in
 * sessionStorage: it dies with the tab and identifies nobody.
 */
function conversationId(): string | undefined {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return undefined;
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageContext, setPageContext] = useState<string | undefined>();

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages(loadSession());
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // Session storage full or unavailable; chat still works.
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  // Open seeded from anywhere on the site (Copy for AI > Ask the Playbook).
  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ path?: string; question?: string }>).detail;
      openerRef.current = document.activeElement as HTMLElement;
      setPageContext(detail?.path);
      if (detail?.question) setInput(detail.question);
      setOpen(true);
    };
    window.addEventListener("playbook-chat:open", onOpen);
    return () => window.removeEventListener("playbook-chat:open", onOpen);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      openerRef.current?.focus?.();
    }
  }, [open]);

  // Focus trap + Escape.
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, a[href], textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  const ask = useCallback(
    async (question: string) => {
      const content = question.trim().slice(0, MAX_MESSAGE_CHARS);
      if (!content || streaming) return;
      setError(null);
      setInput("");

      const history = [...messages, { role: "user" as const, content }];
      setMessages(history);
      setStreaming(true);

      const sessionId = conversationId();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: history.slice(-MAX_HISTORY).map(({ role, content }) => ({ role, content })),
            ...(pageContext ? { pageContext } : {}),
            ...(sessionId ? { sessionId } : {}),
          }),
        });

        if (!response.ok || !response.body) {
          const data = (await response.json().catch(() => ({}))) as { code?: string };
          setError(ERROR_COPY[data.code ?? "api_error"] ?? ERROR_COPY.api_error);
          setStreaming(false);
          return;
        }

        let assistant: ChatMessage = { role: "assistant", content: "" };
        setMessages([...history, assistant]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let currentEvent: string | null = null;

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (line.startsWith("event: ")) {
              currentEvent = line.slice(7).trim();
            } else if (line.startsWith("data: ")) {
              const payload = JSON.parse(line.slice(6));
              if (currentEvent === "citations") {
                assistant = { ...assistant, citations: payload as Citation[] };
              } else if (currentEvent === "trace") {
                assistant = { ...assistant, traceId: (payload as { id: string }).id };
              } else if (currentEvent === "error") {
                setError(ERROR_COPY[(payload as { code?: string }).code ?? "api_error"]);
              } else if (currentEvent === null && payload.delta) {
                assistant = { ...assistant, content: assistant.content + payload.delta };
              }
              setMessages([...history, assistant]);
              if (currentEvent === "done" || currentEvent === "error") currentEvent = null;
            } else if (line === "") {
              currentEvent = null;
            }
          }
        }
      } catch {
        if (!controller.signal.aborted) setError(ERROR_COPY.api_error);
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, pageContext, streaming],
  );

  /**
   * Rate one answer. Fire and forget: a rating that fails to send is not
   * worth an error message, and the button stays pressed either way.
   */
  const rate = useCallback(
    (index: number, rating: Rating) => {
      const message = messages[index];
      if (!message?.traceId || message.rating) return;
      setMessages((current) =>
        current.map((m, i) => (i === index ? { ...m, rating } : m)),
      );
      void fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ traceId: message.traceId, rating }),
      }).catch(() => {
        // Nothing to recover; the rating is a nice-to-have signal.
      });
    },
    [messages],
  );

  const clear = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      // A cleared panel is a new conversation, so it gets a new id.
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close playbook chat" : "Ask the Playbook, an AI chat grounded in this site"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => {
          openerRef.current = document.activeElement as HTMLElement;
          setOpen((v) => !v);
        }}
        className="glow-hover fixed right-5 bottom-5 z-50 flex size-13 items-center justify-center rounded-full border border-volt/30 bg-background/90 text-volt shadow-lg backdrop-blur transition-transform hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ask the Playbook"
          onKeyDown={onKeyDown}
          className="glass fixed inset-0 z-50 flex flex-col border-primary/15 bg-background/95 backdrop-blur-xl sm:inset-auto sm:right-5 sm:bottom-21 sm:h-[36rem] sm:max-h-[75vh] sm:w-105 sm:rounded-xl sm:border sm:shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-primary/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-volt" aria-hidden="true" />
              <span className="font-display text-sm font-bold">Ask the Playbook</span>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 ? (
                <Button variant="ghost" size="icon" aria-label="Clear conversation" onClick={clear}>
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
              <Button variant="ghost" size="icon" aria-label="Close chat" onClick={() => setOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4 font-body text-sm"
            aria-live="polite"
          >
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Answers come straight from the playbook: 36+ wins of hackathon strategy. Ask
                  anything, mid-hackathon or before it.
                </p>
                <div className="flex flex-col items-start gap-2">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => ask(starter)}
                      className="rounded-lg border border-spark/20 bg-spark/5 px-3 py-1.5 text-left text-xs text-foreground/90 transition-colors hover:border-spark/40 hover:bg-spark/10 motion-reduce:transition-none"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((message, i) =>
              message.role === "user" ? (
                <div key={i} className="ml-8 rounded-lg bg-primary/10 px-3 py-2">
                  {message.content}
                </div>
              ) : (
                <div key={i} className="space-y-2">
                  <div className="text-foreground/90">
                    <MarkdownLite text={message.content} />
                    {streaming && i === messages.length - 1 ? (
                      <span
                        className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-volt align-text-bottom motion-reduce:animate-none"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  {message.citations && message.citations.length > 0 ? (
                    <details className="group">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1 font-code text-[10px] text-volt/80 hover:text-volt [&::-webkit-details-marker]:hidden">
                        <span className="inline-block transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden="true">
                          ▸
                        </span>
                        Sources ({message.citations.length})
                      </summary>
                      <div className="mt-1.5 flex flex-wrap gap-1.5" aria-label="Sources">
                        {message.citations.map((citation) => (
                          <a
                            key={citation.url}
                            href={citation.url}
                            className="rounded-full border border-volt/20 bg-volt/5 px-2 py-0.5 font-code text-[10px] text-volt hover:bg-volt/10"
                          >
                            {citation.title}
                          </a>
                        ))}
                      </div>
                    </details>
                  ) : null}
                  {message.traceId && !(streaming && i === messages.length - 1) ? (
                    <div
                      role="group"
                      aria-label="Was this answer helpful?"
                      className="flex items-center gap-1"
                    >
                      {(["up", "down"] as const).map((value) => {
                        const Icon = value === "up" ? ThumbsUp : ThumbsDown;
                        const active = message.rating === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => rate(i, value)}
                            disabled={Boolean(message.rating)}
                            aria-pressed={active}
                            aria-label={
                              value === "up" ? "This answer helped" : "This answer missed"
                            }
                            className={`rounded-md border p-1 transition-colors motion-reduce:transition-none disabled:cursor-default ${
                              active
                                ? "border-volt/40 bg-volt/10 text-volt"
                                : "border-transparent text-muted-foreground/60 hover:border-volt/20 hover:bg-volt/5 hover:text-volt disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:text-muted-foreground/60"
                            }`}
                          >
                            <Icon className="size-3" />
                          </button>
                        );
                      })}
                      {message.rating ? (
                        <span className="ml-1 font-code text-[10px] text-muted-foreground/70">
                          Thanks.
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ),
            )}

            {error ? (
              <p role="alert" className="rounded-lg border border-spark/30 bg-spark/10 px-3 py-2 text-xs">
                {error}
              </p>
            ) : null}
          </div>

          <form
            className="flex items-end gap-2 border-t border-primary/10 p-3"
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  ask(input);
                }
              }}
              rows={1}
              maxLength={MAX_MESSAGE_CHARS}
              placeholder="Ask about strategy, stacks, pitching..."
              aria-label="Your question"
              className="max-h-28 flex-1 resize-none rounded-lg border border-primary/15 bg-background/60 px-3 py-2 font-body text-sm outline-none placeholder:text-muted-foreground/60 focus:border-volt/40"
            />
            <Button
              type="submit"
              size="icon"
              disabled={streaming || input.trim().length === 0}
              aria-label="Send question"
              className="shrink-0"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}
