import os
import sys
from pathlib import Path
from openai import OpenAI

SCRIPT_DIR = Path(__file__).parent
AUDIO_FILES = {
    "dispatch_ai": SCRIPT_DIR / "dispatch_ai.mp3",
    "talktuahbank": SCRIPT_DIR / "talktuahbank.mp3",
}

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

def transcribe_audio(client: OpenAI, audio_path: Path) -> str:
    print(f"Transcribing {audio_path.name}...")
    with open(audio_path, "rb") as f:
        response = client.audio.transcriptions.create(
            model="whisper-1",
            file=f,
            response_format="verbose_json",
            timestamp_granularities=["segment"],
        )
    return response

def main():
    api_key = load_api_key()
    client = OpenAI(api_key=api_key)

    for name, audio_path in AUDIO_FILES.items():
        if not audio_path.exists():
            print(f"Skipping {name}: {audio_path} not found")
            continue

        result = transcribe_audio(client, audio_path)

        txt_path = SCRIPT_DIR / f"{name}_transcript.txt"
        txt_path.write_text(result.text)
        print(f"  Saved transcript: {txt_path.name} ({len(result.text)} chars)")

        segments_path = SCRIPT_DIR / f"{name}_segments.txt"
        lines = []
        for seg in result.segments:
            start_m, start_s = divmod(int(seg.start), 60)
            lines.append(f"[{start_m}:{start_s:02d}] {seg.text.strip()}")
        segments_path.write_text("\n".join(lines))
        print(f"  Saved segments: {segments_path.name}")

    print("\nDone!")

if __name__ == "__main__":
    main()
