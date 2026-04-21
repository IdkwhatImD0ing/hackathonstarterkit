import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/beehiiv-thumbnail-1200x630.png");

const W = 1200;
const H = 630;
const BG = "#0a0a0f";
const PURPLE = "#a855f7";
const LIME = "#d4ff00";
const TEXT_PRIMARY = "#ffffff";
const TEXT_MUTED = "#9ca3af";

const STROKE = 38;
const CHEV_LEFT_X = 100;
const CHEV_TOP_Y = 230;
const CHEV_TIP_X = 190;
const CHEV_MID_Y = 320;
const CHEV_BOT_Y = 410;

const UND_X = 210;
const UND_Y = 388;
const UND_W = 100;
const UND_H = 38;

const FONT_STACK =
  "ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <polyline
    points="${CHEV_LEFT_X},${CHEV_TOP_Y} ${CHEV_TIP_X},${CHEV_MID_Y} ${CHEV_LEFT_X},${CHEV_BOT_Y}"
    fill="none"
    stroke="${PURPLE}"
    stroke-width="${STROKE}"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <rect
    x="${UND_X}" y="${UND_Y}"
    width="${UND_W}" height="${UND_H}"
    rx="3" ry="3"
    fill="${LIME}"
  />

  <text
    x="370" y="295"
    font-family="${FONT_STACK}"
    font-size="76"
    font-weight="800"
    fill="${TEXT_PRIMARY}"
    letter-spacing="-2"
  >The Hackathon</text>
  <text
    x="370" y="380"
    font-family="${FONT_STACK}"
    font-size="76"
    font-weight="800"
    fill="${LIME}"
    letter-spacing="-2"
  >Playbook</text>

  <text
    x="370" y="445"
    font-family="${FONT_STACK}"
    font-size="26"
    font-weight="500"
    fill="${TEXT_MUTED}"
    letter-spacing="0"
  >Win hackathons. Battle-tested strategies from 36+ wins.</text>

  <rect x="370" y="475" width="14" height="14" fill="${PURPLE}"/>
  <text
    x="395" y="488"
    font-family="${FONT_STACK}"
    font-size="20"
    font-weight="600"
    fill="${TEXT_PRIMARY}"
    letter-spacing="1"
  >THEHACKATHONPLAYBOOK.DEV</text>
</svg>
`.trim();

mkdirSync(dirname(OUT), { recursive: true });

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT);

writeFileSync(OUT.replace(/\.png$/, ".svg"), svg);

const meta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} (${meta.width}x${meta.height})`);
