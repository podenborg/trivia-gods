import he from "he";
import { nanoid } from "nanoid/non-secure";
import { Question, Answer } from "../types";
import pool, { nestQuery } from "./index";

export const storeQuestions = async (questions: Question[]) => {
  try {
    let values = "";
    questions.forEach((q, index) => {
      const { id, type, category, difficulty, question, user_answer, correct_answer, session_id } = q;
      const isCorrect = user_answer === correct_answer;
      values += `('${id}', '${type}', '${category}', '${difficulty}', '${question}', ${isCorrect}, 1, ${isCorrect ? 1 : 0}, '${session_id}')`;
      if (index < questions.length - 1) values += ", ";
    });

    const query = `
      INSERT INTO questions (id, type, category, difficulty, question, last_answer_correct, times_answered, times_correct, session_id)
      VALUES ${values}
      ON CONFLICT (id) 
      DO UPDATE 
      SET        
        last_answer_correct = EXCLUDED.last_answer_correct,
        times_answered = questions.times_answered + 1,
        times_correct = 
          CASE 
            WHEN (EXCLUDED.last_answer_correct = true) THEN (questions.times_correct + 1)
            ELSE (questions.times_correct)
          END
      ;
    `;
    
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
        question,
        (
          SELECT answer 
          FROM answers 
          WHERE is_correct = true AND question_id = questions.id
          LIMIT 1
        ) AS correct_answer,
        (
          coalesce(
            (
              SELECT array_to_json(array_agg(row_to_json(row))) FROM (
                SELECT answer 
                FROM answers
                WHERE question_id = questions.id
                  AND is_correct IS false
              ) row
            ),            
            '[]'
          )
        ) AS incorrect_answers
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
    if (res.rowCount === 0) return [];

    const questions = res.rows.map(q => ({
      ...q,
      incorrect_answers: [ ...q.incorrect_answers.map((ia: { answer: string }) => ia.answer) ]
    }));
    return questions;
  } catch (error) {
    throw error;
  }
};

export const retrieveCorrectQuestions = async (amount: number|undefined) => {
  try {
    const query = `
      SELECT 
        id,
        type,
        category,
        difficulty,
        question,
        (
          SELECT answer 
          FROM answers 
          WHERE is_correct = true AND question_id = questions.id
          LIMIT 1
        ) AS correct_answer,
        (
          coalesce(
            (
              SELECT array_to_json(array_agg(row_to_json(row))) FROM (
                SELECT answer 
                FROM answers
                WHERE question_id = questions.id
                  AND is_correct IS false
              ) row
            ),            
            '[]'
          )
        ) AS incorrect_answers
      FROM questions
      WHERE last_answer_correct = true
      ORDER BY 
        times_correct DESC,
        difficulty = 'easy',
        difficulty = 'medium',
        difficulty = 'hard'
      ${amount && `LIMIT ${amount}`}
      ;
    `;

    const res = await pool.query(query);
    if (res.rowCount === 0) return [];

    const questions = res.rows.map(q => ({
      ...q,
      incorrect_answers: [ ...q.incorrect_answers.map((ia: { answer: string }) => ia.answer) ]
    }));
    return questions;
  } catch (error) {
    throw error;
  }
};

export const retrieveQuestionsCount = async (sessionId: string) => {
  try {
    let query = `
      SELECT * FROM questions
      WHERE session_id = '${sessionId}';
    `;
  
    const res = await pool.query(query);
    return res.rowCount;
  } catch (error) {
    throw error;
  }
};

export const storeAnswers = async (answers: Answer[]) => {
  try {
    let values = "";
    answers.forEach((ans, index) => {
      const { id, answer, is_correct, question_id } = ans;
      values += `('${id}', '${answer}', ${is_correct}, '${question_id}')`;
      if (index < answers.length - 1) values += ", ";
    });

    let query = `
      INSERT INTO answers (id, answer, is_correct, question_id)
      VALUES ${values}
      ON CONFLICT ON CONSTRAINT unique_answer DO NOTHING;
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

  return allAnswers;
};