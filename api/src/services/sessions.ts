import axios from "axios";
import { questionsDb } from "../db";
import { fetchQuestions } from "./questions";
import { sortByDifficultyAsc } from "../utils";

export const createSession = async (amount: number) => {
  try {
    const token = await retrieveSessionToken();    
    const questions = await fetchQuestions(amount, token);
    return { questions: questions.sort(sortByDifficultyAsc), token: token };
  } catch (error) {
    throw error;
  }  
};

export const resumeSession = async (amountDue: number, token: string, sessionId: string) => {
  try {
    const incorrectQuestions = await questionsDb.retrieveIncorrectQuestions();
    if (incorrectQuestions.length >= amountDue) {
      return incorrectQuestions.slice(0, amountDue);
    }

    const amountNewQuestions: number = amountDue - incorrectQuestions.length;
    const newQuestionsRemaining: number = await getNewQuestionsRemaining(sessionId);

    if (newQuestionsRemaining < amountNewQuestions) {
      const newQuestions = await fetchQuestions(newQuestionsRemaining, token);
      const correctQuestions = await questionsDb.retrieveCorrectQuestions(amountNewQuestions - newQuestionsRemaining);
      const questions = [ ...incorrectQuestions, ...newQuestions.sort(sortByDifficultyAsc), ...correctQuestions ];  
      return questions;
    } else {
      const newQuestions = await fetchQuestions(amountNewQuestions, token);
      const questions = [ ...incorrectQuestions, ...newQuestions.sort(sortByDifficultyAsc) ];  
      return questions;
    }    
  } catch (error) {
    throw error;
  }
};

export const retrieveSessionToken = async () => {
  try {
    const res = await axios(`${process.env.OPEN_TRIVIA_URL}/api_token.php?command=request`);
    const { token } = res.data;
    return token;
  } catch (error) {
    throw error;
  }
};

export const getNewQuestionsRemaining = async (sessionId: string): Promise<number> => {
  interface ResponseData {
    category_question_count: {
      total_question_count: number
    }
  }
  try {
    const res = await axios.get<ResponseData>(`${process.env.OPEN_TRIVIA_URL}/api_count.php?category=20`);
    const totalQuestionCount = res.data.category_question_count?.total_question_count;
    const questionsSavedCount = await questionsDb.retrieveQuestionsCount(sessionId);
    return Math.max(totalQuestionCount - questionsSavedCount, 0);
  } catch (error) {
    throw error;
  }
};