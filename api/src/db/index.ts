import { Pool } from "pg";

const pool = new Pool();

export const db = {
  query: async (text: string, params: any[]|undefined = undefined) => {
    const res = await pool.query(text, params);  
    return res;
  },
};
