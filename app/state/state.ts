import { IQuestion } from "../types"
import { derived } from "overmind";

type State = {
  questions: {
    isLoading: boolean,
    isError: boolean,
    error: Error | null,
    data: {[id: string]: IQuestion},
    dataList: IQuestion[],
    currentQuestion: IQuestion,
    currentQuestionIndex: number,
  },
  isSession: boolean,
  sessionToken: string,
};

export const state: State = {
  questions: {
    isLoading: false,
    isError: false,
    error: null,
    data: {},
    dataList: derived((state: State) => Object.values(state.data)),
    currentQuestionIndex: 0,
    get currentQuestion(this) {
      return this.dataList[this.currentQuestionIndex];
    },
  },
  isSession: false,
  sessionToken: "",
};