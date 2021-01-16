import axios from "axios";
import { IQuestion } from "../types";
import { API_URL, AMOUNT } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = {  
  fetchSessionData: async (existingToken: string|undefined): Promise<{questions: IQuestion[], token: string}> => {
    try {
      debugger;
      const res = await axios(`${API_URL}/review-session?amount=${AMOUNT}${existingToken ? `&token=${existingToken}` : ""}`);      
      const { questions, token } = res.data;
      return { questions, token };
    } catch (error) {
      throw error;
    }
  },
  postSessionData: async (sessionId: string, questions: IQuestion[]) => {
    try {
      const res = await axios.post(`${API_URL}/review-session`, { sessionId, questions });
      console.log("result:", res);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export const storage = {
  storeData: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  },
  retrieveData: async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  },
  deleteData: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  },
};