import { IQuestion } from "../types"
import { Action } from "overmind";

export const setIsLoading: Action<boolean> = ({ state }, value) => {
  state.isLoading = value;
};

export const setIsError: Action<boolean> = ({ state }, value) => {
  state.isError = value;
};

export const setError: Action<Error|null> = ({ state }, value) => {
  state.error = value;
};

export const setQuestions: Action<IQuestion[]> = ({ state }, value) => {
  state.questions = value;
};

export const setQuestion: Action<{id: string, values: IQuestion}> = ({ state }, { id, values }) => {
  state.questions = state.questions.map((question) => {
    if (question.id === id) return values;    
    return question;
  })
};

export const setCurrentIndex: Action<number> = ({ state }, value) => {
  state.currentQuestion = state.questions[value];
};

export const setSessionToken: Action<string> = ({ state }, value) => {
  state.sessionToken = value;
};

export const setIsSession: Action<boolean> = ({ state }, value) => {
  state.isSession = value;
};