// Generates the PWA PNG icons from public/icons/icon.svg.
// Run with: npm run icons
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const source = await readFile("public/icons/icon.svg");

// Regular icons (rounded corners come from the SVG).
for (const size of [192, 512]) {
  await sharp(source).resize(size, size).png().toFile(`public/icons/icon-${size}.png`);
}

// Apple touch icon (iOS adds its own rounding).
await sharp(source).resize(180, 180).png().toFile("src/app/apple-icon.png");

// Maskable icon: full-bleed background, logo shrunk into the safe zone.
await sharp({
  create: { width: 512, height: 512, channels: 4, background: "#064D31" },
})
  .composite([{ input: await sharp(source).resize(360, 360).png().toBuffer(), gravity: "center" }])
  .png()
  .toFile("public/icons/maskable-512.png");

console.log("Icons generated.");
