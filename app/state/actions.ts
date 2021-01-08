import { Action } from "overmind";

export const increment: Action<number> = ({ state }, incrementBy) => {
  state.counter += incrementBy;
};