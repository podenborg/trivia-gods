
import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../enums";
import { RootParamList } from "../types";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useActions } from "../state";
import { StackScreenProps } from "@react-navigation/stack";

import Layout from "../components/Layout";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Question from "../components/Question";

export type PracticeScreenProps = StackScreenProps<RootParamList, Screens.PracticeScreen>

export default function HomeScreen({ navigation, route }: PracticeScreenProps) {
  const { questions } = useState();
  const { questionIndex } = route.params;  
  const { isLoading, isError, error, dataList, currentQuestion } = questions;
  const { initializeSession, setCurrentQuestionIndex } = useActions();

  const handleNavigate = () => {
    return questionIndex < dataList.length - 1
      ? navigation.navigate(Screens.PracticeScreen, { questionIndex: questionIndex + 1 })
      : navigation.navigate(Screens.SummaryScreen);
  };

  React.useEffect(() => {
      const initialize = async () => await initializeSession();
      initialize();
  }, []);
  
  React.useEffect(() => {
      setCurrentQuestionIndex(questionIndex);
  }, [questionIndex]);

  if (isLoading || !currentQuestion) {
    return <Loader />
  }
  if (isError) {
    return <Text>Error: {error?.message}</Text>
  }
  
  return (
    <Layout>
      <View style={tailwind("h-full flex justify-between")}>
        <View style={tailwind("px-4")}>
          <Question question={currentQuestion} />                        
        </View>

        {currentQuestion.was_answered && 
          <View style={tailwind("mt-3 pb-8 h-40 w-full px-4 bg-white flex justify-center border-t-2 border-solid border-gray-200")}>
            <Text style={tailwind("mt-4 mb-3 text-lg text-gray-700 font-semibold")}>
              {currentQuestion.correct_answer === currentQuestion.user_answer
                ? "You got it right! 🎉"
                : "Better luck next time 😕"
              }
            </Text>

            <Button onPress={handleNavigate}>
              Next
            </Button>          
          </View>
        }
      </View>      

      <StatusBar style="auto" />
    </Layout> 
  );
}