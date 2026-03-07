import json
import os
import sys
from pathlib import Path
from openai import OpenAI

SCRIPT_DIR = Path(__file__).parent

PITCH_ANALYSIS_SCHEMA = {
    "type": "object",
    "properties": {
        "pitch_duration_seconds": {
            "type": ["number", "null"],
            "description": "Total pitch duration in seconds",
        },
        "opening_hook": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["scenario", "statistic", "question", "personal_story"],
                },
                "quote": {"type": "string"},
                "timestamp": {"type": ["string", "null"]},
                "why_effective": {"type": "string"},
            },
            "required": ["type", "quote", "timestamp", "why_effective"],
            "additionalProperties": False,
        },
        "phases": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "phase_name": {
                        "type": "string",
                        "enum": ["Big Shift", "Stakes", "Demo", "Magic", "Vision"],
                    },
                    "timestamp_start": {"type": ["string", "null"]},
                    "timestamp_end": {"type": ["string", "null"]},
                    "duration_seconds": {"type": ["number", "null"]},
                    "percentage_of_total": {"type": ["number", "null"]},
                    "key_quote": {"type": "string"},
                    "technique_used": {"type": "string"},
                },
                "required": [
                    "phase_name",
                    "timestamp_start",
                    "timestamp_end",
                    "duration_seconds",
                    "percentage_of_total",
                    "key_quote",
                    "technique_used",
                ],
                "additionalProperties": False,
            },
        },
        "frameworks_used": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "framework": {
                        "type": "string",
                        "enum": [
                            "Sinek Start With Why",
                            "Duarte Sparkline",
                            "Aristotle Appeals",
                            "Heath SUCCESs",
                            "Raskin Strategic Narrative",
                        ],
                    },
                    "evidence": {"type": "string"},
                },
                "required": ["framework", "evidence"],
                "additionalProperties": False,
            },
        },
        "sponsor_alignment": {"type": "string"},
        "strongest_moment": {
            "type": "object",
            "properties": {
                "timestamp": {"type": ["string", "null"]},
                "quote": {"type": "string"},
                "why": {"type": "string"},
            },
            "required": ["timestamp", "quote", "why"],
            "additionalProperties": False,
        },
        "why_it_won": {"type": "string"},
        "key_techniques": {
            "type": "array",
            "items": {"type": "string"},
        },
    },
    "required": [
        "pitch_duration_seconds",
        "opening_hook",
        "phases",
        "frameworks_used",
        "sponsor_alignment",
        "strongest_moment",
        "why_it_won",
        "key_techniques",
    ],
    "additionalProperties": False,
}

PROJECTS = {
    "dispatch_ai": {
        "name": "DispatchAI",
        "hackathon": "UC Berkeley AI Hackathon 2024",
        "prize": "Grand Prize ($25K SkyDeck investment + AI For Good + Best Use of Intel AI)",
        "total_value": "$62K+",
        "video_url": "https://www.youtube.com/watch?v=hdpdgxrilQM",
        "devpost_url": "https://devpost.com/software/dispatch-ai",
        "transcript_file": "dispatch_ai_segments.txt",
        "devpost_context": """DispatchAI reimagines emergency response with an empathetic AI-powered system.
82% of emergency call centers are understaffed. Oakland had 1+ minute 911 wait times.
Tech: Next.js, React, TailwindCSS, Shadcn, Framer Motion, Leaflet, Python, Twilio, Hume EVI
for emotion detection, Retell for voice agent, custom fine-tuned Mistral model on proprietary
911 call dataset, Intel Dev Cloud for fine-tuning, Google Maps geocoding.
Human-in-the-loop: dispatchers make final say on all recommended actions.
Open-sourced model on HuggingFace. Published training dataset.
Solo-pitched finalist project to 1000 students and judges.""",
    },
    "talktuahbank": {
        "name": "TalkTuahBank",
        "hackathon": "HackUTD 2024 (Ripple Effect)",
        "prize": "1st Overall + Goldman Sachs Challenge Winner",
        "total_value": "Won largest 24-hour hackathon in the US",
        "video_url": "https://www.youtube.com/watch?v=YsH_z1azXSA",
        "devpost_url": "https://devpost.com/software/talktuahbank",
        "transcript_file": "talktuahbank_segments.txt",
        "devpost_context": """TalkTuahBank: voice-based banking for the 1.7 billion unbanked adults worldwide.
Accessible through simple phone calls, no internet or smartphone needed.
Multi-language support. Voice-activated banking transactions.
Tech: Retell AI for voice, OpenAI Swarm for multi-agent orchestration,
Pinata (IPFS) for decentralized storage, Next.js + Tailwind + ShadCN admin dashboard.
Won Goldman Sachs challenge by addressing financial inclusion.
The pitch video is a demo video that was submitted to devpost, showing the product working.""",
    },
    "adapted": {
        "name": "AdaptEd",
        "hackathon": "LA Hacks 2024",
        "prize": "Google Company Challenge Winner (1st among 142 projects)",
        "total_value": "1st place Google Challenge",
        "video_url": "https://www.youtube.com/watch?v=8o1YJUFBcAw",
        "devpost_url": "https://devpost.com/software/teachme-3p7bw1",
        "transcript_file": None,
        "devpost_context": """AdaptEd: interactive and personalized lectures through conversational voice AI.
Inspired by teammate's experience as K-12 Kumon tutor seeing impact of 1:1 tutoring.
50% of 16M US university students falling behind. Less than 3% have access to quality tutoring.
Instead of students adapting to system, AI lecturer adapts to students.
Features: responsive AI conversation, dynamic slide/whiteboard content, emotion detection.
Tech: Gemini 1.5 Pro for multi-source aggregation (YouTube, podcasts, textbooks),
Fetch.ai agents, Intel Developer Cloud for fine-tuning, Hume for emotion detection,
Google Search for images, MongoDB, Auth0.
Won Google Company Challenge for heavy use of Gemini.""",
    },
}

INSTRUCTIONS = """You are an expert hackathon pitch analyst with deep knowledge of presentation
frameworks (Sinek, Duarte, Aristotle, Heath Brothers, Andy Raskin). You analyze hackathon pitch
transcripts and identify the structural phases, storytelling techniques, and persuasion strategies
that made them winners. Be precise with timestamps. Use exact quotes from the transcript.
Be specific about WHY things work, not just what they are. Think deeply about the pitch strategy."""


def build_input(project: dict, transcript: str | None) -> str:
    base = f"""Analyze this hackathon pitch:

PROJECT: {project['name']}
HACKATHON: {project['hackathon']}
PRIZE: {project['prize']}

ADDITIONAL CONTEXT FROM DEVPOST:
{project['devpost_context']}
"""
    if transcript:
        base += f"""
PITCH TRANSCRIPT (with timestamps):
{transcript}

Analyze the actual transcript above. Map each section to the 5-phase framework
(Big Shift, Stakes, Demo, Magic, Vision). Use exact quotes and timestamps."""
    else:
        base += """
NOTE: The pitch video is unavailable. Reconstruct the likely pitch strategy
from the Devpost content. Use the Inspiration section for the hook. Set all
timestamps to null. Focus on what made the Devpost writeup compelling and
what the likely pitch structure would have been."""

    return base


def load_api_key():
    key = os.environ.get("OPENAI_API_KEY")
    if key:
        return key
    env_path = SCRIPT_DIR.parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("OPENAI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    print("ERROR: OPENAI_API_KEY not found", file=sys.stderr)
    sys.exit(1)


def analyze_pitch(client: OpenAI, project: dict) -> dict:
    name = project["name"]
    print(f"\nAnalyzing {name} with gpt-5-mini (reasoning on)...")

    transcript = None
    transcript_file = project.get("transcript_file")
    if transcript_file:
        transcript_path = SCRIPT_DIR / transcript_file
        if transcript_path.exists():
            transcript = transcript_path.read_text()

    user_input = build_input(project, transcript)

    response = client.responses.create(
        model="gpt-5-mini",
        reasoning={"effort": "high"},
        instructions=INSTRUCTIONS,
        input=user_input,
        text={
            "format": {
                "type": "json_schema",
                "name": "pitch_analysis",
                "strict": True,
                "schema": PITCH_ANALYSIS_SCHEMA,
            }
        },
    )

    analysis = json.loads(response.output_text)
    analysis["meta"] = {
        "project_name": name,
        "hackathon": project["hackathon"],
        "prize": project["prize"],
        "total_value": project["total_value"],
        "video_url": project["video_url"],
        "devpost_url": project["devpost_url"],
        "had_transcript": transcript is not None,
    }

    return analysis


def main():
    api_key = load_api_key()
    client = OpenAI(api_key=api_key)

    all_analyses = {}
    for key, project in PROJECTS.items():
        analysis = analyze_pitch(client, project)
        all_analyses[key] = analysis

        out_path = SCRIPT_DIR / f"{key}_analysis.json"
        out_path.write_text(json.dumps(analysis, indent=2))
        print(f"  Saved: {out_path.name}")

    combined_path = SCRIPT_DIR / "all_analyses.json"
    combined_path.write_text(json.dumps(all_analyses, indent=2))
    print(f"\nCombined analysis saved: {combined_path.name}")
    print("Done!")


if __name__ == "__main__":
    main()
