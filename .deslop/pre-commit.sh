#!/bin/sh
# de-slop pre-commit guard
#
# A regex tripwire for AI-writing tells in staged site content. It is not the
# rubric: it catches vocabulary and em-dash density, not generic advice or
# hollow paragraphs. See .deslop/ and run the de-slop skill for the real pass.
#
# Adapted to this repo from the de-slop skill's reference hook:
#   - Site copy lives in .ts/.tsx sources and in content/generated/md/*.md,
#     so both are scanned. docs/, skills/, .deslop/, .claude/ and the
#     agent-skill mirror are skipped (internal or agent-facing text).
#   - It reads the STAGED version of each file, so it checks what you commit.
#   - It counts only mid-sentence em dashes (a lowercase letter or comma on
#     one side, a lowercase letter on the other). CLAUDE.md allows em dashes in
#     titles, headings and "— Author, Work, Year" attributions, and those
#     don't match.
#
# Test without committing: sh .git/hooks/pre-commit path/to/file ...
# (reads the working-tree files you name instead of the staged set).

PHRASES='delve|tapestry|it.s worth noting|in today.s|fast-paced world|navigate the|deep dive|circle back|leverage|utilize|game-changer|testament to|pivotal moment|studies show|experts agree|research shows|in conclusion|let that sink in|full stop|here.s the thing|it turns out|not just .* but'
# Owner's personal banned list, from .deslop/voice-profile.md.
PHRASES="$PHRASES|bastion|luster|pretense|amalgamation|intoxicating|double-edged sword"
BODY_DASH='([a-z,] ?— ?[a-z])'

content_filter() {
  grep -E '^(content/generated/md/.*\.md|app/.*\.tsx|lib/blog/posts/.*\.ts|lib/(cheat-sheet|playbook|non-coder-sections|non-coder-skills)\.ts)$' |
    grep -vE '^(docs/|skills/|\.deslop/|\.claude/|\.agents/|content/generated/agent-skills/|node_modules/)'
}

if [ "$#" -gt 0 ]; then
  MODE=disk
  FILES=$(printf '%s\n' "$@")
else
  MODE=staged
  FILES=$(git diff --cached --name-only --diff-filter=ACM | content_filter)
fi
[ -z "$FILES" ] && exit 0

read_file() {
  if [ "$MODE" = staged ]; then git show ":$1" 2>/dev/null; else cat "$1"; fi
}

FAIL=0
# One path per line: split on newlines only and never glob, so paths with
# spaces or brackets (app/blog/[slug]/page.tsx) reach read_file intact.
set -f
IFS='
'
for f in $FILES; do
  BODY=$(read_file "$f") || { echo "de-slop guard: could not read $f"; FAIL=1; continue; }
  HITS=$(printf '%s\n' "$BODY" | grep -icE "$PHRASES")
  DASHES=$(printf '%s\n' "$BODY" | grep -oE "$BODY_DASH" | wc -l | tr -d ' ')
  if [ "$HITS" -gt 2 ] || [ "$DASHES" -gt 5 ]; then
    echo "SLOP: $f ($HITS banned-phrase lines, $DASHES mid-sentence em dashes)"
    printf '%s\n' "$BODY" | grep -inE "$PHRASES" | head -5
    FAIL=1
  fi
done

if [ "$FAIL" = 1 ]; then
  echo ""
  echo "Run the de-slop skill on these files, or commit with --no-verify."
  exit 1
fi
exit 0
