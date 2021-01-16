import axios from "axios";
import { questionsDb } from "../db";

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
    // const incorrectQuestions = await questionsDb.retrieveIncorrectQuestions();  
    // const newAmount: string = (Number(amount) - incorrectQuestions.rowCount).toString();
    // const newQuestions = await fetchQuestions(newAmount, token);
    // const questions = [ ...incorrectQuestions.rows, ...newQuestions ];
    const questions = await fetchQuestions(amount, token);
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

export const fetchQuestions = async (amount: string, token: string) => {
  try {    
    const res = await axios(`${process.env.OPEN_TRIVIA_URL}/api.php?amount=${amount}&category=20&token=${token}`);   
    const { results } = res.data;
    return results;
  } catch (error) {
    throw error;
  }
};