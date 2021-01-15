import { Screens } from "../enums";
import { RouteProp } from "@react-navigation/native";

export type RootParamList = {
  [Screens.HomeScreen]: undefined,
  [Screens.PracticeScreen]: { questionIndex: number },
  [Screens.SummaryScreen]: undefined,
};

export type PracticeScreenRouteProp = RouteProp<RootParamList, Screens.PracticeScreen>