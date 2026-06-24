---
name: youtube-writer
description: "Write the YouTube title, description, tags, and chapter timestamps for a hackathon project's demo video, tuned for recruiters and search. Use this whenever the user is uploading or has uploaded a demo video and needs the video title, description copy, tags or keywords, a pinned comment, or chapter markers."
---

# YouTube Writer

The demo video is the highest-signal thing you can share, and it keeps working long after the hackathon: recruiters find these videos on YouTube months later. This writes the title, description, tags, and chapters so the video is findable and the description does the selling while you are not in the room.

## Gather the facts

Detect first, ask second. Read the repo and any existing README or Devpost copy, then ask for what is missing:

- Project name and a one-line description of what it does.
- The demo video: its length, and the rough beats with start times (needed for chapters). If the user does not have timestamps, ask them to scrub the video for section starts, or offer to derive beats from a demo script.
- The primary topic or keyword someone would search for.
- Links: Devpost, GitHub, live URL, portfolio site.
- Hackathon name and any awards (real ones only).
- Team names and their socials.

Never invent an award or statistic, and never fabricate a timestamp. If the beats are unknown, ask rather than guess.

## Write the title

- Front-load the project name and what it does. The first roughly 60 characters show on desktop search and about 50 on mobile, so keep the project name and core value inside the first 50 characters.
- Add the hackathon or award only if it is real (for example "... | Grand Prize, Cal Hacks 2024").
- Stay under the 100-character hard cap, and aim for about 70 or fewer where practical, specific, and free of clickbait. The algorithm reads all 100 characters for keywords even when not all of them display.
- Offer two or three title options.

## Write the description

Structure it so the important parts survive the fold. Only about the first 150 characters show on desktop (roughly two lines) and as few as 100 on mobile before "Show more," so put the hook inside the first 100 characters:

- **The hook**: open with what it is and why it matters, including the project name, inside the first 100 characters.
- **What it does**: two to four sentences in plain, user-side language.
- **Built with**: the stack.
- **Links**: Devpost, GitHub, live site, portfolio, one per line.
- **Chapters**: the timestamp list (see below).
- **Team**: names and socials.
- **Hackathon**: the event and any real awards.
- **Hashtags**: three to five relevant ones (for example `#hackathon` `#AI`).

## Chapters

YouTube turns timestamps in the description into clickable chapters, but only when every rule is met. If any one rule fails, chapters silently do not appear at all:

- The timestamps must live in the video Description, not a comment or the title.
- The first timestamp must be exactly `0:00` (the start of the video).
- There must be at least three timestamps, listed in ascending order.
- Every chapter must be at least 10 seconds long. One gap shorter than 10 seconds disables chapters for the whole video, not just that segment, so check the tightest gap.
- Format each line as the timestamp, a space, then a short label, one per line, using colons (`mm:ss`, or `h:mm:ss` past an hour): for example `0:00 Intro`, `0:25 The problem`, `1:10 Live demo`.

Map the video's real beats to chapters and label them in plain language.

## Tags and pinned comment

- **Tags**: about 8 to 12 focused tags within the 500-character limit (the project name, the category, the key technologies, "hackathon", and the event name). Tags are only a minor ranking factor now, so do not stuff them; the title, description, thumbnail, and watch time drive discovery.
- **Pinned comment**: suggest one carrying the key links (Devpost, GitHub, live), since viewers often miss links in the description body.

## Verify

- The title front-loads keywords inside the first 50 characters and claims no award that was not actually won.
- The description hook works on its own inside the first 100 characters.
- The chapters obey every rule: in the description, first is exactly `0:00`, at least three, ascending, and every gap is at least 10 seconds (one short gap disables them all).
- Every link resolves, every stat or award is real, and the video is set to Public or Unlisted (not Private) so the link works for recruiters.

## Final output

Return:

1. **Title options**: two or three.
2. **Description**: the full copy-paste block.
3. **Chapters**: the timestamp list.
4. **Tags**: the keyword list.
5. **Pinned comment**: the links comment.
6. **Next step**: add a clean custom thumbnail with the project name, since thumbnail and title drive click-through more than any metadata, then share the video in a LinkedIn post and link it from the README and Devpost.

## Boundaries

- Never invent awards or statistics.
- Chapters must match the real video. If the beats are unknown, ask rather than fabricate timestamps.
- Keep the copy honest and specific.
