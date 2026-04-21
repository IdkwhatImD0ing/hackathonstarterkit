import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/beehiiv-logo-800.png");

const SIZE = 800;
const BG = "#0a0a0f";
const PURPLE = "#a855f7";
const LIME = "#d4ff00";

const STROKE = 96;
const CHEV_LEFT_X = 175;
const CHEV_TOP_Y = 180;
const CHEV_TIP_X = 395;
const CHEV_MID_Y = 410;
const CHEV_BOT_Y = 640;

const UND_X = 440;
const UND_Y = 545;
const UND_W = 250;
const UND_H = 95;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>
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
    rx="6" ry="6"
    fill="${LIME}"
  />
</svg>
`.trim();

mkdirSync(dirname(OUT), { recursive: true });

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT);

writeFileSync(OUT.replace(/\.png$/, ".svg"), svg);

const meta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} (${meta.width}x${meta.height})`);
