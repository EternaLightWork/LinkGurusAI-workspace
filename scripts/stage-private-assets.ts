/**
 * Copies downloadable PDFs out of the repository and into private server
 * storage (spec 7.2). They must never be emitted into a public static
 * directory. Run at deploy time: npm run assets:stage
 */
import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { TEMPLATE_FILES } from "../src/lib/template-files";

/**
 * Template sources are kept on the working machine and are not committed
 * (see .gitignore). Override with TEMPLATE_SOURCE_DIR when they live
 * elsewhere, such as on a build server.
 */
const SOURCE_ROOT = path.resolve(
  process.cwd(),
  process.env.TEMPLATE_SOURCE_DIR ?? "LinkGurusAI/linkgurus-new-website/assets/templates",
);
const TARGET_ROOT = path.resolve(
  process.cwd(),
  process.env.PRIVATE_TEMPLATE_DIR ?? "./private-storage/templates",
);

async function main() {
  await mkdir(TARGET_ROOT, { recursive: true });
  const manifest: Record<string, { bytes: number; checksum: string }> = {};

  for (const entry of TEMPLATE_FILES) {
    const from = path.join(SOURCE_ROOT, entry.source);
    const to = path.join(TARGET_ROOT, entry.storageKey);

    try {
      await stat(from);
    } catch {
      console.error(`MISSING source asset: ${entry.source}`);
      process.exitCode = 1;
      continue;
    }

    await mkdir(path.dirname(to), { recursive: true });
    await copyFile(from, to);

    const buffer = await readFile(to);
    const checksum = createHash("sha256").update(buffer).digest("hex");
    manifest[entry.storageKey] = { bytes: buffer.byteLength, checksum };
    console.log(`staged ${entry.storageKey}  ${buffer.byteLength} bytes  ${checksum.slice(0, 12)}…  [${entry.status}]`);
  }

  console.log(`\n${Object.keys(manifest).length} file(s) staged into ${TARGET_ROOT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
