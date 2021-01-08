import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../../enums";
import { RootParamList } from "../../types";
import { StatusBar } from "expo-status-bar";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import data from "../../data/questions.json"

import Question from "../../components/Question"

type PracticeScreenProps = StackScreenProps<RootParamList, Screens.PracticeScreen>

export default function HomeScreen({ navigation, route }: PracticeScreenProps) {
  const { questions } = data;
  const question = questions[0];
  console.log("question:", question);

  return (
    <View style={styles.screen}>
      <View>
        <Question question={question} />
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