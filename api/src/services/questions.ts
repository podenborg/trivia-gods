import axios from "axios";
import { Question } from "../types";
import { questionsDb } from "../db";

export const fetchQuestions = async (amount: string, token: string) => {
  try {
    if (Number(amount) < 1) return [];
    
    const res = await axios(`${process.env.OPEN_TRIVIA_URL}/api.php?amount=${amount}&category=20&token=${token}`);   
    const { results } = res.data;
    return results;
  } catch (error) {
    throw error;
  }
};

export const saveQuestions = async (questions: Question[]) => {
  try {
    await questionsDb.storeQuestions(questions);
    const answers = questionsDb.extractAnswersFromQuestions(questions);
    await questionsDb.storeAnswers(answers);
  } catch (error) {
    throw error;
  }
};