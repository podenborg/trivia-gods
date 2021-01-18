import axios from "axios";
import { Question } from "../types";
import { questionsDb } from "../db";

export const fetchQuestions = async (amount: number, token: string) => {
  try {
    if (amount < 1) return [];
    
    const res = await axios(`${process.env.OPEN_TRIVIA_URL}/api.php?amount=${(amount).toString()}&category=20&token=${token}`);   
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