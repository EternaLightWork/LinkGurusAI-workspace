/**
 * Applies scripts/schema.sql. Statements are idempotent, so this is safe to
 * re-run on Hostinger where no long-running migration service exists.
 * Run with: npm run db:migrate
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";

async function main() {
  const required = ["DATABASE_HOST", "DATABASE_NAME", "DATABASE_USER", "DATABASE_PASSWORD"];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    console.error(`Missing environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }

  const sql = await readFile(path.join(process.cwd(), "scripts", "schema.sql"), "utf8");

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT ?? 3306),
    database: process.env.DATABASE_NAME!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    multipleStatements: true,
  });

  try {
    await connection.query(sql);
    console.log("Schema applied.");
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
