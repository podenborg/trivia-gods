import { db } from "../db";
import { QueryResult } from "pg";
import { Question, Questions } from "../types";

export const find = async (id: string): Promise<Question|undefined> => {
  return;
};

export const findAll = async (): Promise<Questions> => {
  try {
    const res: QueryResult = await db.query(`SELECT * FROM questions;`);
    return res.rows;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};