import { Question } from "../types";
import { questionsDb } from "../db";

export const saveQuestions = async (questions: Question[]) => {
  try {
    await questionsDb.storeQuestions(questions);
    const answers = questionsDb.extractAnswersFromQuestions(questions);
    await questionsDb.storeAnswers(answers);
  } catch (error) {
    throw error;
  }
};