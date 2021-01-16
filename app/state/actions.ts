import { IQuestion } from "../types";
import { nanoid } from "nanoid/non-secure";
import { Action, AsyncAction } from "overmind";

export const setSessionToken: Action<string> = ({ state }, value) => {
  state.session.token = value;
};

export const initializeSession: AsyncAction = async ({ state, actions, effects }) => {
  try {    
    let sessionId, sessionToken;
    state.questions.isLoading = true;

    const session = await effects.storage.retrieveData("session");
    console.log("SESSION", session);
    console.log("SESSION TOKEN", sessionToken);
    if (session !== null) {
      sessionId = session.sessionId;
      sessionToken = session.sessionToken;
    }
    
    const { questions, token } = await effects.api.fetchSessionData(sessionToken);    
    actions.setQuestions(questions);
    actions.setSessionToken(token);

    state.session.id = sessionId ? sessionId : nanoid(10);

    await effects.storage.storeData("session", { 
      sessionId: state.session.id, 
      sessionToken: token,
    });
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
    const result = await effects.api.postSessionData(state.session.id, state.questions.dataList);
    console.log("result", result);
  } catch (error) {
    state.session.error = error;
    state.session.isError = true;
  } finally {
    state.session.isLoading = false;
  }
};

export const deleteSession: AsyncAction = async ({ state, effects }) => {
  try {
    // if (!state.session.id && !state.session.token) {
    //   console.log("No session to delete.");
    //   return;
    // }
    const oldSessionId = state.session.id;
    state.session.isLoading = true;
    state.session.id = "";
    state.session.token = "";
    await effects.storage.deleteData("session");
    console.log(`Successfully deleted session ${oldSessionId}.`);
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