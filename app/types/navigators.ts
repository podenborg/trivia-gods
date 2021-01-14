import { Screens } from "../enums";
import { RouteProp } from "@react-navigation/native";

export type RootParamList = {
  HomeScreen: undefined,
  PracticeScreen: { questionIndex: number },
};

export type PracticeScreenRouteProp = RouteProp<RootParamList, Screens.PracticeScreen>