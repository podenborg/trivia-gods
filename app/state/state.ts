import { IQuestion } from "../types"
import { derived } from "overmind";

type QuestionState = {
  isLoading: boolean,
  isError: boolean,
  error: Error|null,
  data: {[id: string]: IQuestion},
  dataList: IQuestion[],
  currentQuestion: IQuestion,
  currentQuestionIndex: number,
  totalQuestions: number,
  totalCorrect: number,
};

type SessionState = {
  id: string,
  token: string,
  isLoading: boolean,
  isError: boolean,
  error: Error|null,
};

type State = {
  questions: QuestionState,
  session: SessionState,
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
    totalQuestions: derived((state: QuestionState) => state.dataList.length),
    totalCorrect: derived((state: QuestionState) => state.dataList.reduce((acc, curr) => {
      if (curr.correct_answer === curr.user_answer) return acc + 1;
      else return acc;
    }, 0)),
  },
  session: {
    id: "",
    token: "",
    isLoading: false,
    isError: false,
    error: null,
  },
};