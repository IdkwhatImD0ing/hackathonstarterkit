# Using APIs

> How to add any service to your app with just a key and a docs link.

Canonical: https://thehackathonplaybook.dev/non-coders/apis

---

## What Is an API?

An API is like a restaurant menu. You (your app) look at the menu (the documentation), place an order (send a request), and the kitchen (the service) prepares your food (the response). You never go into the kitchen yourself.

Companies like ElevenLabs, Supabase, Twilio, and Stripe all offer APIs. They let your app use their services (voice AI, databases, phone calls, payments) without you building those things from scratch.

Not sure what an API key or environment variable is? Check [Concepts Explained](https://thehackathonplaybook.dev/non-coders/concepts).

## The Pattern

This works for almost any service. Three steps, every time.

Sign up and copy your API key

Go to the service's website (e.g., elevenlabs.io), create a free account, and find your API key in the dashboard or settings. Copy it.

Find the docs link

Every service has a documentation page (usually at docs.servicename.com or servicename.com/docs). Copy the URL. This is the "menu" your AI reads to understand how the service works.

Paste this prompt into your AI chat

Give the AI your key, the docs link, and describe what you want. The AI reads the docs, writes the code, and stores your key safely. You don't touch any of it.

## The Prompt Template

Copy this, fill in the blanks, and paste it into Cursor (Ctrl+I). Works for any service.

universal API prompt

```
I want to use [SERVICE NAME] in my project.

Here is my API key: [paste your key here]
Here are the docs: [paste the docs URL here]

Build [describe what you want] using this service.
Store the API key in an environment variable, not in the code.
```

That's the whole pattern. The AI reads the docs, figures out how to use the service, writes the code, and stores your key safely. You describe what you want in plain English.

## Example: ElevenLabs Voice Agent

Here's what the prompt looks like when filled in for a real service. This adds a conversational voice AI to your app.

#### [ElevenLabs](https://try.elevenlabs.io/thehackathonplaybook)

Adds voice conversations to your app. Users click a button, speak, and hear an AI response.

What you paste into Cursor

```
I want to use ElevenLabs in my project to create a voice agent that can have conversations.

Here is my API key: sk-abc123...
Here are the docs: https://elevenlabs.io/docs/api-reference

Build a conversational voice agent that:
- Lets the user click a button to start talking
- Sends their speech to ElevenLabs for processing
- Plays the AI response back as audio

Store the API key in an environment variable called ELEVENLABS_API_KEY.
```

Replace the fake API key with your real one from elevenlabs.io/app/settings/api-keys

[ElevenLabs

Get the Voice AI Stack the Pros Use

Free tier covers a hackathon. Sign up, grab your API key, and paste the prompt above into Cursor.

Try ElevenLabs Free](https://try.elevenlabs.io/thehackathonplaybook)

Power User Tip: ElevenLabs MCP

For even deeper integration, ElevenLabs offers an MCP server that gives your AI direct access to their API without you pasting docs each time. Paste this into your AI chat:

```
Search for and install the ElevenLabs MCP server so you can use their voice AI tools directly. Add it to my project's MCP configuration.
```

An MCP (Model Context Protocol) server lets the AI talk to a service directly, without you copying docs or keys into every prompt. Think of it as giving the AI a permanent phone line to that service.

## Example: Supabase Database

Same pattern, different service. This adds a database so your app can save and display data.

#### Supabase

Adds a database to your app. Store data, display lists, create forms.

What you paste into Cursor

```
I want to use Supabase as my database.

Here is my project URL: https://abc123.supabase.co
Here is my anon key: eyJhbGci...
Here are the docs: https://supabase.com/docs/reference/javascript/introduction

Create a simple database setup that:
- Has a "posts" table with title, content, and created_at columns
- Shows all posts on the main page
- Has a form to create a new post

Store the Supabase URL and key in environment variables.
```

Get your URL and anon key from supabase.com/dashboard > Settings > API

Power User Tip: Supabase MCP

Supabase also has an MCP server. Once installed, the AI can create tables, run queries, and manage your database directly without you pasting credentials into every prompt.

```
Search for and install the Supabase MCP server so you can manage my database directly. Add it to my project's MCP configuration.
```

## What Is an MCP?

For power users who want the AI to remember how to use a service permanently.

MCP stands for Model Context Protocol. It's a way to give your AI a permanent connection to a service. Instead of pasting your API key and docs link every time, you install an MCP server once and the AI can use that service whenever it needs to.

Think of the difference like this: the API prompt pattern is like giving someone a recipe card each time you want them to cook. An MCP is like hiring a chef who already knows the recipe.

You don't need MCPs to get started. The API key + docs pattern works perfectly. But as you get comfortable, MCPs make repeated tasks faster. Many popular services (Supabase, GitHub, ElevenLabs, Stripe, Figma) offer MCP servers.

To find and install any MCP

```
Search for an MCP server for [SERVICE NAME] and install it. Add it to my project's MCP configuration so you can use it in future conversations.
```

The Key Insight

You don't need to understand how an API works. You need to give the AI three things: your key, the docs link, and a description of what you want. The AI reads the documentation (which is written for programmers) and translates it into working code. You just describe the outcome in plain English.

This pattern works for voice AI (ElevenLabs), databases (Supabase), payments (Stripe), text messaging (Twilio), image generation (Replicate), email (Resend), and hundreds of other services.
