import axios from "axios";
// import { db } from "../db";

const createSession = async (amount: string) => {
  try {
    const token = await retrieveSessionToken();    
    const questions = await fetchQuestions(amount, token);
    return [questions, token];
  } catch (error) {
    throw error;
  }  
};

const resumeSession = async (amount: string, token: string) => {
  try {
    // const incorrectQuestions = await db.fetchIncorrectQuestions();
    // const questionsToFetch = 15 - incorrectQuestions.length;
    // const questions = await fetchQuestions(questionsToFetch);
    // return [...incorrectQuestions, questions];
    const questions = await fetchQuestions(amount, token);
    return questions;
  } catch (error) {
    throw error;
  }
};

const retrieveSessionToken = async () => {
  try {
    const res = await axios(`${process.env.OPEN_TRIVIA_URL}/api_token.php?command=request`);
    const { token } = res.data;
    return token;
  } catch (error) {
    throw error;
  }
};

const fetchQuestions = async (amount: string, token: string) => {
  try {
    const res = await axios(`${process.env.OPEN_TRIVIA_URL}/api.php?amount=${amount}&category=20&token=${token}`);
    const { results } = res.data;
    return results;
  } catch (error) {
    throw error;
  }
};

export default {
  createSession,
  resumeSession,
}