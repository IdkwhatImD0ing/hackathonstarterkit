"use client";

import { type FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewsletterSignupProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function NewsletterSignup({
  className,
  eyebrow = "Stay up to date",
  title = "Get new hackathon guides in your inbox",
  description = "Short, specific strategies from 36+ wins. No fluff, just the ideas that help you build sharper and pitch better.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          website,
          source: window.location.href,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setSubmitState("error");
        setMessage(result?.message ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitState("success");
      setMessage(result?.message ?? "Check your inbox to confirm your subscription.");
      setEmail("");
    } catch {
      setSubmitState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const isLoading = submitState === "loading";
  const isSuccess = submitState === "success";
  const isError = submitState === "error";

  return (
    <section
      className={cn(
        "glass glow-hover relative overflow-hidden rounded-2xl border border-volt/25 bg-gradient-to-br from-volt/10 via-primary/5 to-transparent p-6 shadow-lg shadow-primary/5",
        className,
      )}
    >
      <div className="absolute -right-12 -top-12 size-32 rounded-full bg-volt/10 blur-3xl" />
      <div className="relative space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-volt/25 bg-volt/10 text-volt">
            <Mail className="size-5" />
          </div>
          <div className="space-y-1.5">
            <p className="font-code text-[10px] uppercase tracking-[0.2em] text-volt">
              {eyebrow}
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div aria-hidden="true" className="absolute left-[-9999px]">
            <label htmlFor="newsletter-website">Website</label>
            <input
              id="newsletter-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoading}
              required
              className="h-11 border-primary/20 bg-background/70 font-body"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 shrink-0 bg-volt px-5 font-display font-bold text-volt-foreground shadow-lg shadow-volt/20 hover:bg-volt/90"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          {message ? (
            <p
              className={cn(
                "flex items-start gap-2 font-body text-sm",
                isSuccess && "text-success",
                isError && "text-destructive",
              )}
            >
              {isSuccess ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              ) : null}
              {isError ? (
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
              ) : null}
              <span>{message}</span>
            </p>
          ) : (
            <p className="font-code text-[10px] uppercase tracking-wider text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
