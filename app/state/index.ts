import { IConfig } from "overmind";
import { createActionsHook, createStateHook } from "overmind-react";

import { state } from "./state";
import * as actions from './actions';

export const config = {
  state, 
  actions
};

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}

export const useState = createStateHook<typeof config>();
export const useActions = createActionsHook<typeof config>();