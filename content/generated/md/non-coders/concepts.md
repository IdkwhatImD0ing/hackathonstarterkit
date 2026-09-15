# Concepts Explained

> GitHub, APIs, deploying, and other jargon explained in plain English.

Canonical: https://thehackathonplaybook.dev/non-coders/concepts

---

### GitHub / Repository

Your project's folder, plus a saved snapshot of every version. Each snapshot is called a commit.

If something breaks, your AI can take the project back to any earlier commit. That history only lives on your computer until it's pushed (uploaded) to GitHub, the website that keeps a copy online.

### Git Commit

A checkpoint of your whole project, with a note about what changed.

It's the tidy version of naming files draft\_v2\_final\_FINAL.docx. Saving a file doesn't make a commit, though. Once a feature works, tell your AI "commit this with a descriptive message." The note it writes, like "added login page," is how you find that version later.

### Branch

A separate copy of your project where you can experiment safely.

Say you want to try a new home page design without losing the one that works. Your AI makes the changes on a branch. If you like them, it merges them back into the main version. If not, it deletes the branch and the original is untouched.

### API

A menu that lets your app order services from other companies.

Your app sends a request, like "read this sentence out loud," and the other company's server sends back a response, like an audio file. The API's documentation lists the requests you can make. That's how your app can send texts (Twilio), generate speech (ElevenLabs), or store data (Supabase) without you building any of it.

### API Key

A code that proves your app is allowed to use a service.

Services like ElevenLabs give you one when you sign up: a long string of letters and numbers. Your app sends it with every request so the service knows it's you. Anyone who has your key can use the service as you, so keep it private unless the service says it's meant to be public.

### Environment Variable

A setting, like an API key, that's kept outside your code.

Your AI puts these settings in a file called .env.local so keys stay out of your code files. Never commit that file. The file keeps a key out of your code, but your app can still send that key to visitors' browsers. So tell your AI to use secret keys (like an ElevenLabs key) only in server code, the part of your app that runs on a server instead of in the visitor's browser. Supabase's anon key is an exception: it's meant to be public, but only once Row Level Security is turned on for your tables. The Supabase prompt on the APIs page turns it on.

### localhost:3000

Your app running on your own computer, visible only to you.

Type it into your browser while your AI has the app running. It's where you test each feature before you commit it.

### Deploy

Publishing your app so anyone with the link can use it.

Deploying puts your app on the internet at a real URL, like myapp.vercel.app. At a hackathon, do it in the first hour so you can always demo from a live URL instead of localhost. Tell your AI: "deploy this to Vercel."

### Vercel

The service that hosts your app on the internet.

It puts your project on a server and gives it a public URL, free for small projects. Connect it to your GitHub repository once, and it publishes a new version every time new commits are pushed there.

### Terminal / Command Line

A text-based way to give instructions to your computer.

It's the black window with blinking text. Your AI types and runs most commands in it for you. If you've added this guide's system prompt, it asks before anything hard to undo, like deleting files or deploying.

### npm / pnpm

An app store for code libraries.

When your app needs something common, like a date picker or a chart, your AI installs a library someone else already built. That's what the "npm install" lines in the terminal are doing. npm and pnpm are two tools for the same job.

### TypeScript / JavaScript

The programming language your app's pages are written in.

TypeScript is JavaScript with extra checks for mistakes. This guide's skills write your app's pages in TypeScript and any backend (the part users don't see) in Python. You don't need to learn either one.

Don't memorize these. Come back when you hit a word you don't recognize, or type `/explain` in your AI chat followed by whatever confuses you.
