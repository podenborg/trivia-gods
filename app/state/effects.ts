import axios from "axios";
import { IQuestion } from "../types";
import { API_URL, AMOUNT } from "../constants";

export const api = {  
  fetchSessionData: async (
    existingToken: string = ""
  ): Promise<{questions: IQuestion[], token?: string}> => {
    try {
      const res = await axios(`${API_URL}/review-session?amount=${AMOUNT}${existingToken ? `?token=${existingToken}` : ""}`);
      const { questions, token } = res?.data;
      return { questions, token };
    } catch (error) {
      throw error;
    }
  },
  postSessionData: async (questions: IQuestion[]) => {
    try {
      const res = await axios.post(`${API_URL}/questions`, { questions });
      console.log("result:", res);
      return res;
    } catch (error) {
      throw error;
    }
  },
};