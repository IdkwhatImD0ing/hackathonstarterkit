# Using APIs

> How to add a service to your app, with worked examples for ElevenLabs voice and a Supabase database.

Canonical: https://thehackathonplaybook.dev/non-coders/apis

---

## What Is an API?

An API is how your app uses another company's service. ElevenLabs, Supabase, Twilio, and Stripe all offer one, so your app can use their voice AI, databases, phone calls, and payments without you building any of that from scratch.

For the longer explanation, plus what an API key and an environment variable are, see [Concepts Explained](https://thehackathonplaybook.dev/non-coders/concepts).

## The Pattern

This works for almost any service.

Sign up and find your API key

Create a free account on the service's website (for example, elevenlabs.io) and find your API key in the dashboard or settings.

Find the docs link

Copy the URL of the service's documentation, usually at docs.servicename.com or servicename.com/docs. The AI reads it to learn how the service works.

Paste the prompt, then add your key

Paste the prompt below into your AI chat. The AI writes the code and creates a file called .env.local with a blank spot for your key, which you fill in yourself. Never paste a key into the chat: the AI can copy it straight into your code, and the chat history keeps it.

## The Prompt Template

Fill in the brackets and paste it into Cursor (Ctrl+I, or Cmd+I on Mac).

universal API prompt

```
I want to use [SERVICE NAME] in my project.

Here are the docs: [paste the docs URL here]

Build [describe what you want] using this service.
I'll put the API key in .env.local myself, so don't ask me to paste it here. Create .env.local with a placeholder for the key, check that .gitignore covers it, and tell me which line to fill in. Keep secret keys in server-side code, never in code that runs in the browser.
```

Why the prompt says “server-side”: .env.local keeps the key out of your code, but it can't stop the app from sending the key to the browser, where anyone using your app can read it. Server-side code runs on your server instead of in your users' browsers, so the key stays hidden.

## Example: ElevenLabs Voice Agent

Here's the template filled in for a real service.

#### [ElevenLabs](https://try.elevenlabs.io/thehackathonplaybook) (affiliate link)

Adds voice conversations to your app.

What you paste into Cursor

```
I want to use ElevenLabs in my project to create a voice agent that can have conversations.

Here are the docs: https://elevenlabs.io/docs/api-reference

Build a conversational voice agent that:
- Lets the user click a button to start talking
- Sends their speech to ElevenLabs for processing
- Plays the AI response back as audio

I'll put my API key in .env.local myself as ELEVENLABS_API_KEY, so don't ask me to paste it here. Create .env.local with a placeholder, check that .gitignore covers it, and only use the key in server-side code so it never reaches the browser.
```

Get your key from elevenlabs.io/app/settings/api-keys and paste it into .env.local once the AI has created the file.

[ElevenLabs

My pick for voice AI

There's a free tier if you want to check it out. See how much usage it includes before you count on it for a live demo.

Affiliate link: I may earn a commission.

Check it out](https://try.elevenlabs.io/thehackathonplaybook)

## Example: Supabase Database

Same pattern, different service.

#### Supabase

Adds a database so your app can save data and show it.

What you paste into Cursor

```
I want to use Supabase as my database.

Here are the docs: https://supabase.com/docs/reference/javascript/introduction

Create a simple database setup that:
- Has a "posts" table with title, content, and created_at columns
- Shows all posts on the main page
- Has a form to create a new post

I'll put my Supabase project URL and anon key in .env.local myself, so don't ask me to paste them here. Create .env.local with placeholders and check that .gitignore covers it.
Turn on Row Level Security for the posts table, and only allow what this app needs: reading posts and adding new ones.
```

Get your URL and anon key from supabase.com/dashboard > Settings > API

The anon key is meant to be public, so apps usually send it to the browser. Row Level Security limits what anyone holding it can do to your data, so keep that line in the prompt.

## What Is an MCP?

Optional. The pattern above is all you need to start.

MCP stands for Model Context Protocol. An MCP server gives your AI a standing connection to one service. Install it once and the AI can keep using that service without a docs link each time. The Supabase one, for example, lets the AI create tables and run queries on your database itself. Supabase, GitHub, ElevenLabs, Stripe, and Figma all offer one.

Install the official server, the one the service links from its own docs. Anyone can publish an MCP server, and whichever one you install gets your key and access to your account, so a fake one could misuse both.

ElevenLabs

```
Install the official ElevenLabs MCP server (github.com/elevenlabs/elevenlabs-mcp) so you can use their voice AI tools directly. Add it to my project's MCP configuration. If it needs my API key, tell me which file to put it in so I can add it myself, and make sure that file stays out of GitHub.
```

Supabase

```
Install the official Supabase MCP server, the one linked from Supabase's own docs, so you can manage my database directly. Add it to my project's MCP configuration. If it needs a key or token, tell me which file to put it in so I can add it myself, and make sure that file stays out of GitHub.
```

Any other service

```
Find the official MCP server for [SERVICE NAME], the one linked from its own docs, and install it. If there isn't an official one, ask me before installing anything. Add it to my project's MCP configuration so you can use it in future conversations. If it needs a key or token, tell me which file to put it in so I can add it myself, and make sure that file stays out of GitHub.
```

Same Prompt, Other Services

The template works the same way for payments (Stripe), text messages (Twilio), image generation (Replicate), email (Resend), and most other services that publish API docs.
