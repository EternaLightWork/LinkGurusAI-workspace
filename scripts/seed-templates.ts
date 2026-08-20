/**
 * Seeds the template registry and the per-locale file records from the
 * staged private directory. Checksums are computed from the staged file, so
 * a mismatch between repository and server is caught here rather than in a
 * visitor's download. Run after migrate: npm run db:seed
 */
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";
import { ar } from "../src/content/ar";
import { TEMPLATE_FILES } from "../src/lib/template-files";

const PRIVATE_ROOT = path.resolve(
  process.cwd(),
  process.env.PRIVATE_TEMPLATE_DIR ?? "./private-storage/templates",
);

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT ?? 3306),
    database: process.env.DATABASE_NAME!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
  });

  try {
    for (const template of ar.templates) {
      const practice = template.practiceId;
      const tier = template.offerAnchor.includes("lab") || template.offerAnchor === "the-install"
        ? "flagship"
        : "entry";
      const status = template.releaseBlocked ? "release-blocked" : "published";

      await connection.execute(
        `INSERT INTO templates (id, slug, practice, tier, status, version)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE slug = VALUES(slug), practice = VALUES(practice),
           tier = VALUES(tier), status = VALUES(status), version = VALUES(version)`,
        [template.id, template.slug, practice, tier, status, template.version],
      );
    }

    for (const entry of TEMPLATE_FILES) {
      const filePath = path.join(PRIVATE_ROOT, entry.storageKey);
      try {
        await stat(filePath);
      } catch {
        console.error(`SKIP ${entry.storageKey}: not staged. Run npm run assets:stage first.`);
        process.exitCode = 1;
        continue;
      }
      const buffer = await readFile(filePath);
      const checksum = createHash("sha256").update(buffer).digest("hex");

      await connection.execute(
        `INSERT INTO template_files
           (template_id, locale, storage_key, download_name, mime_type, byte_size, checksum, status)
         VALUES (?, ?, ?, ?, 'application/pdf', ?, ?, ?)
         ON DUPLICATE KEY UPDATE storage_key = VALUES(storage_key),
           download_name = VALUES(download_name), byte_size = VALUES(byte_size),
           checksum = VALUES(checksum), status = VALUES(status)`,
        [
          entry.templateId,
          entry.locale,
          entry.storageKey,
          entry.downloadName,
          buffer.byteLength,
          checksum,
          entry.status,
        ],
      );
      console.log(`seeded ${entry.templateId} [${entry.locale}] ${entry.status}`);
    }
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
