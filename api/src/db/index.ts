// import createConnectionPool, { sql } from '@databases/pg';
// const db = createConnectionPool({
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   user: process.env.PGUSER,
//   port: Number(process.env.PGPORT),
// });
// export { sql };
// export default db;
import { Pool } from "pg";

const pool = new Pool();

export default pool;
export * as questionsDb from "./questions";