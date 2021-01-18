import axios from "axios";
import { questionsDb } from "../db";
import { fetchQuestions } from "./questions";

export const createSession = async (amount: string) => {
  try {
    const token = await retrieveSessionToken();    
    const questions = await fetchQuestions(amount, token);
    return { questions: questions, token: token };
  } catch (error) {
    throw error;
  }  
};

export const resumeSession = async (amount: string, token: string) => {
  try {    
    const incorrectQuestions = await questionsDb.retrieveIncorrectQuestions();
    const newAmount: string = (Number(amount) - incorrectQuestions.length).toString();
    const newQuestions = await fetchQuestions(newAmount, token);
    const questions = [ ...incorrectQuestions, ...newQuestions ];      
    return questions;
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