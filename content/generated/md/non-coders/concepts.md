# Concepts Explained

> GitHub, APIs, deploying, and other jargon explained in plain English.

Canonical: https://thehackathonplaybook.dev/non-coders/concepts

---

### GitHub / Repository

A shared folder for your project that remembers every change.

Think of it like a Google Drive folder, but with a built-in time machine. Every time you save ("commit"), it takes a snapshot. You can go back to any snapshot if something breaks. Your AI assistant uses this to keep your work safe.

### Git Commit

Pressing "Save" with a note about what you changed.

When you edit a Word document, you might save versions like "draft\_v2\_final\_FINAL.docx". A commit is the same idea, but organized. Each save has a short description like "added login page" so you can find it later. Tell your AI: "commit this with a descriptive message."

### API

A menu that lets your app order services from other companies.

Imagine a restaurant. You (your app) look at the menu (the API documentation), place an order (send a request), and the kitchen (the server) prepares your food (the response). You never go into the kitchen yourself. APIs let your app use services like sending texts (Twilio), generating speech (ElevenLabs), or storing data (Supabase) without building those things from scratch.

### API Key

Your membership card that proves you're allowed to use a service.

When you sign up for a service like ElevenLabs, they give you a long string of letters and numbers. This is your API key. It's like a membership card: you show it every time your app talks to their service, and they know it's you. Never share it publicly (that's like leaving your credit card on a park bench).

### Deploy

Publishing your app so anyone with the link can use it.

Right now your app only runs on your computer. Deploying is like publishing a Google Doc with "anyone with the link can view." After deploying, your app gets a real URL (like myapp.vercel.app) that anyone in the world can visit. Tell your AI: "deploy this to Vercel."

### Vercel

The service that hosts your app on the internet.

If your app is a document, Vercel is the printer and distributor. It takes your project, puts it on a fast server, and gives it a public URL. It's free for small projects. Think of it like Squarespace, but for apps instead of websites. You connect it to your GitHub, and it automatically publishes every time you save.

### Terminal / Command Line

A text-based way to give instructions to your computer.

Instead of clicking buttons, you type commands. It looks intimidating (a black screen with blinking text), but here's the good news: your AI assistant types the commands for you. When it says "run this in the terminal," just let it do its thing. You rarely need to type terminal commands yourself.

### localhost:3000

Your app running on your own computer, visible only to you.

When you're building, your app runs locally (on your machine) at an address like localhost:3000. Open your browser and go to that address to see it. Nobody else can see it yet. It's your private preview. Once you deploy, it gets a real public URL.

### Environment Variable

A secret value stored safely outside your code.

Your API keys need to be kept secret. An environment variable is like a locked drawer in your desk: the key is inside, your app knows where to find it, but nobody looking at your code can see it. Your AI will create a file called .env.local to store these. Never share this file.

### npm / pnpm

An app store for code libraries.

When your app needs a feature (like a date picker or a chart), instead of building it from scratch, you install a pre-made library. npm and pnpm are the stores where these libraries live. Your AI runs commands like "npm install" to add them. You don't need to browse the store yourself.

### Branch

A separate copy of your project where you can experiment safely.

Imagine you're writing a report and want to try a completely different introduction without losing the original. A branch is a parallel copy. You make changes on the branch, and if you like them, you merge them back. If not, you delete the branch and the original is untouched.

### TypeScript / JavaScript

The programming language your app is written in.

TypeScript is the language the AI writes your app in. You don't need to learn it. Think of it like the language a contractor uses to write building plans: you describe what you want the house to look like, and they translate it into technical blueprints. The AI is your contractor.

Don't memorize these. Bookmark this page and come back when you hit a term you don't recognize. The AI will also explain things if you ask it: just type `/explain` followed by whatever confuses you.
