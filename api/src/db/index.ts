import { Pool } from "pg";

const pool = new Pool();

export default pool;
export * as questionsDb from "./questions";