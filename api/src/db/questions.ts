import he from "he";
import { nanoid } from "nanoid/non-secure";
import { Question, Answer } from "../types";
// import db, { sql } from "./index";
import pool from "./index";

// const nestQuery = (query: string) => {
//   return sql`
//     coalesce(
//       (
//         SELECT array_to_json(array_agg(row_to_json(x)))
//         FROM (${query}) x
//       ),
//       '[]'
//     )
//   `;
// };

// const nestQuerySingle = (query: string) => {
//   return sql`
//     (SELECT row_to_json(x) FROM (${query}) x)
//   `;
// };

export const storeQuestions = async (questions: Question[]) => {
  try {
    let values = "";
    questions.forEach((q, index) => {
      const { id, type, category, difficulty, question, user_answer, correct_answer, session_id } = q;
      const isCorrect = user_answer === correct_answer;
      values += `('${id}', '${type}', '${category}', '${difficulty}', '${he.encode(question)}', ${isCorrect}, 1, ${isCorrect ? 1 : 0}, '${session_id}')`;
      if (index < questions.length - 1) values += ", ";
    });

    console.log("QUESTIONS VALUES", values);

    const query = `
      INSERT INTO questions (id, type, category, difficulty, question, last_answer_correct, times_answered, times_correct, session_id)
      VALUES ${values}
      ON CONFLICT (id) DO NOTHING;      
    `;

    console.log("QUESTIONS QUERY", query);
    
    const res = await pool.query(query); 
    return res;
  } catch (error) {
    throw error;
  }
};

export const retrieveIncorrectQuestions = async () => {
  try {
    const query = `
      SELECT 
        id,
        type,
        category,
        difficulty,
        question        
      FROM questions
      WHERE last_answer_correct = false
      ORDER BY 
        times_answered - times_correct DESC,
        difficulty = 'easy',
        difficulty = 'medium',
        difficulty = 'hard'
      ;
    `;

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

export const extractAnswersFromQuestions = (questions: Question[]) => {  
  const allAnswers: Answer[] = [];

  questions.forEach((question) => {
    const rawAnswers = [question.correct_answer, ...question.incorrect_answers];

    rawAnswers.forEach((ans, index) => {
      allAnswers.push({
        id: nanoid(10),
        answer: ans,
        is_correct: index === 0,
        question_id: question.id,
      });
    });
  });  

  console.log("ALL ANSWERS", allAnswers);

  return allAnswers;
};