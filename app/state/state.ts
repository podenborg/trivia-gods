import { IQuestion } from "../types"
import { derived } from "overmind";

type State = {
  isLoading: boolean,
  isError: boolean,
  error: Error | null,
  questions: IQuestion[],
  currentQuestion: IQuestion | undefined,
  currentIndex: number,
  sessionToken: string,
  isSession: boolean,
};

export const state: State = {
  isLoading: false,
  isError: false,
  error: null,
  questions: [],
  currentQuestion: derived((state: State) => state.questions[state.currentIndex] ),
  currentIndex: 0,
  sessionToken: "",
  isSession: false,
};