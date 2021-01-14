import axios from "axios";
import { IQuestion } from "../types";
import { API_URL } from "../constants";

export const api = {  
  fetchSessionData: async (): Promise<{questions: IQuestion[], token?: string}> => {
    try {
      const res = await axios(`${API_URL}/review-session?amount=15`);
      const { questions, token } = res?.data;
      return { questions, token };
    } catch (error) {
      throw error;
    }
  },
};