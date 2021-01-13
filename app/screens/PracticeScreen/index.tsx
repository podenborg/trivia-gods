import axios from "axios";
import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../../enums";
import { API_URL } from "../../constants"
import { RootParamList } from "../../types";
import { StatusBar } from "expo-status-bar";
import { useState, useActions} from "../../state";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text, View } from "react-native";

import Question from "../../components/Question"

type PracticeScreenProps = StackScreenProps<RootParamList, Screens.PracticeScreen>

export default function HomeScreen({ navigation, route }: PracticeScreenProps) {
  const { questionIndex } = route.params;
  const { questions, isSession, isLoading, isError, error } = useState();
  const { setQuestions, setSessionToken, setIsSession, setIsLoading, setIsError, setError } = useActions();
  console.log('questions:', questions);
  console.log('current index:', questionIndex);
  const currentQuestion = questions[questionIndex];

  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Calling fetchQuestions");
        setIsLoading(true);
        const res = await axios(`${API_URL}/review-session?amount=15`);
        const { questions, token } = res?.data;
        
        if (token) setSessionToken(token);
        setQuestions(questions);
        setIsSession(true);
        console.log("questions", questions);
        console.log("token", token);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isSession) {
      fetchQuestions();
    }    
  }, []);  

  if (isLoading || !currentQuestion) {
    return <View>
      <ActivityIndicator size="large" />
    </View>
  }
  if (isError) {
    return <Text>Error: {error?.message}</Text>
  }
  
  return (
    <View style={styles.screen}>
      <Text>Question {questionIndex + 1}/15</Text>
      <View>
        <Question question={currentQuestion} />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.PracticeScreen, {
            questionIndex: questionIndex > 0 ? questionIndex - 1 : 0
          })}
        >
          <Text>Previous</Text>          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.PracticeScreen, {
            questionIndex: questionIndex < questions.length - 1 ? questionIndex + 1 : questions.length = 1
          })}
        >
          <Text>Next</Text>          
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",      
  },
  container: {
    backgroundColor: "#fff",
    maxWidth: 300,    
  }
});