import "server-only";
import mysql from "mysql2/promise";
import { env } from "./env";

let pool: mysql.Pool | undefined;

/**
 * A single small pool. Hostinger shared MySQL tolerates few connections, and
 * the site's write volume is form submissions plus a batched email worker.
 */
export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      ...env.db(),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      charset: "utf8mb4_unicode_ci",
      timezone: "Z",
      // Every statement in this codebase is parameterized (spec 8.5).
      namedPlaceholders: false,
    });
  }
  return pool;
}

/** Values accepted by a parameterized statement. */
export type SqlValue = string | number | boolean | Date | Buffer | null;

export async function query<T = mysql.RowDataPacket[]>(
  sql: string,
  values: SqlValue[] = [],
): Promise<T> {
  const [rows] = await getPool().execute(sql, values);
  return rows as T;
}

export async function execute(sql: string, values: SqlValue[] = []) {
  const [result] = await getPool().execute(sql, values);
  return result as mysql.ResultSetHeader;
}

export async function withTransaction<T>(
  fn: (conn: mysql.PoolConnection) => Promise<T>,
): Promise<T> {
  const conn = await getPool().getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
