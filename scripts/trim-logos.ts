/**
 * The supplied logo SVGs are square artboards whose lockup occupies only the
 * middle ~30% of the height. Rendered at a header-appropriate box they fall
 * below the 28px minimum lockup height in BRAND_BUNDLE section 5.
 *
 * This rewrites only the root <svg> viewBox/width/height so the artboard is
 * cropped to the ink plus a small margin. No path, colour or transform is
 * touched, and the originals stay in brand-design-system/logos untouched.
 *
 * Ink extents were measured by rasterizing each file at 1000x1000 and scanning
 * for non-white pixels; the percentages are recorded here so the crop is
 * reproducible rather than hand-tuned.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Spec = {
  file: string;
  canvas: number;
  /** Ink bounds as a fraction of the square artboard. */
  ink: { x: number; y: number; w: number; h: number };
};

const SPECS: Spec[] = [
  {
    file: "linkgurus-wordmark-en.svg",
    canvas: 4167,
    ink: { x: 0.071, y: 0.359, w: 0.852, h: 0.307 },
  },
  {
    file: "linkgurus-wordmark-ar.svg",
    canvas: 1500,
    ink: { x: 0.118, y: 0.372, w: 0.754, h: 0.296 },
  },
  {
    file: "linkgurus-avatar.svg",
    canvas: 4167,
    ink: { x: 0.326, y: 0.354, w: 0.363, h: 0.305 },
  },
];

/** Breathing room inside the asset, as a fraction of ink height. */
const MARGIN = 0.04;

async function main() {
  const dir = path.join(process.cwd(), "public", "logos");

  for (const spec of SPECS) {
    const source = path.join(dir, spec.file);
    const svg = await readFile(source, "utf8");

    const inkH = spec.ink.h * spec.canvas;
    const pad = inkH * MARGIN;
    const x = spec.ink.x * spec.canvas - pad;
    const y = spec.ink.y * spec.canvas - pad;
    const w = spec.ink.w * spec.canvas + pad * 2;
    const h = inkH + pad * 2;

    const round = (n: number) => Math.round(n * 100) / 100;
    const viewBox = `${round(x)} ${round(y)} ${round(w)} ${round(h)}`;

    const rewritten = svg.replace(/<svg\b[^>]*>/, (tag) =>
      tag
        .replace(/\sviewBox="[^"]*"/, "")
        .replace(/\swidth="[^"]*"/, "")
        .replace(/\sheight="[^"]*"/, "")
        .replace(
          /^<svg/,
          `<svg viewBox="${viewBox}" width="${round(w)}" height="${round(h)}"`,
        ),
    );

    const target = path.join(dir, spec.file.replace(/\.svg$/, "-trimmed.svg"));
    await writeFile(target, rewritten, "utf8");
    console.log(`${path.basename(target)}  viewBox="${viewBox}"  ratio ${round(w / h)}:1`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
