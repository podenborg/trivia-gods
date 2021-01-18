import { Pool } from "pg";

const pool = new Pool();

export const nestQuerySingle = (query: string): string => {
  return `
    (SELECT row_to_json(row) FROM (${query}) row)
  `;
};

export const nestQuery = (query: string): string => {
  return `
    coalesce(
      (
        SELECT array_to_json(array_agg(row_to_json(row)))
        FROM (${query}) row
      ),
      '[]'
    )
  `;
};

export default pool;
export * as questionsDb from "./questions";