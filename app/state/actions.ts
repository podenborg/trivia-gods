import { IQuestion } from "../types";
import { nanoid } from "nanoid/non-secure";
import { Action, AsyncAction } from "overmind";

export const setSessionToken: Action<string> = ({ state }, value) => {
  state.session.token = value;
};

export const initializeSession: AsyncAction = async ({ state, actions, effects }) => {
  try {
    state.questions.isLoading = true;
    const { questions, token } = await effects.api.fetchSessionData();
    actions.setQuestions(questions);
    if (token) actions.setSessionToken(token);
  } catch (error) {
    state.questions.error = error;
    state.questions.isError = true;
  } finally {
    state.questions.isLoading = false;
  }
};

export const saveSessionData: AsyncAction = async ({ state, effects }) => {
  try {
    state.session.isLoading = true;
    const result = await effects.api.postSessionData(state.questions.dataList);
    console.log("result", result);
  } catch (error) {
    state.session.error = error;
    state.session.isError = true;
  } finally {
    state.session.isLoading = false;
  }
};

export const setQuestions: Action<IQuestion[]> = ({ state }, values) => {
  const questionsDict: {[id: string]: IQuestion} = {};
  values.forEach((question) => {
    if (!question.id) question.id = nanoid(10);
    if (!question.user_answer) question.user_answer = undefined;
    if (!question.was_answered) question.was_answered = false;
    questionsDict[question.id] = { ...question };
  });
  state.questions.data = questionsDict;
};

export const setQuestion: Action<{id: string, values: Partial<IQuestion>}> = ({ state }, { id, values }) => {
  state.questions.data = {
    ...state.questions.data,
    [id]: {
      ...state.questions.data[id],
      ...values
    }
  };
};

export const setCurrentQuestionIndex: Action<number> = ({ state }, value) => {
  state.questions.currentQuestionIndex = value;
};