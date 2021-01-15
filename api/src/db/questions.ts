import he from "he";
import { Pool } from "pg";
import { nanoid } from "nanoid/non-secure";
import { Question, Answer } from "../types";

const pool = new Pool();

export const query = async (text: string, params: any[]|undefined = undefined) => {
  const res = await pool.query(text, params);  
  return res;
};

export const storeQuestions = async (questions: Question[]) => {
  try {
    let values = "";
    questions.forEach((q, index) => {
      const { id, type, category, difficulty, question, user_answer, correct_answer } = q;
      values += `('${id}', '${type}', '${category}', '${difficulty}', '${he.encode(question)}', ${user_answer === correct_answer}, 0, 0)`;
      if (index < questions.length - 1) values += ", ";
    });

    console.log("VALUES", values);

    const query = `
      INSERT INTO questions (id, type, category, difficulty, question, last_answer_correct, times_answered, times_correct)
      VALUES ${values}
      ON CONFLICT (id) DO NOTHING;      
    `;

    console.log("QUERY", query);
    
    const res = await pool.query(query);    
    return res;
  } catch (error) {
    throw error;
  }
};

export const storeAnswers = async (answers: Answer[]) => {
  try {
    let values = "";
    answers.forEach((ans, index) => {
      const { id, answer, is_correct, question_id } = ans;
      values += `('${id}', '${he.encode(answer)}', ${is_correct}, '${question_id}')`;
      if (index < answers.length - 1) values += ", ";
    });

    let query = `
      INSERT INTO answers (id, answer, is_correct, question_id)
      VALUES ${values}
      ON CONFLICT (id) DO NOTHING;
    `;
  
    const res = await pool.query(query);
    return res;
  } catch (error) {
    throw error;
  }
};

export const extractAnswersFromQuestion = (question: Question) => {
  const rawAnswers = [question.correct_answer, ...question.incorrect_answers];
  const answers: Answer[] = [];

  rawAnswers.forEach((ans, index) => {
    answers.push({
      id: nanoid(10),
      answer: ans,
      is_correct: index === 0,
      question_id: question.id,
    });
  });

  return answers;
};