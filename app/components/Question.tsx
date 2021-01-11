import React from "react";
import { IQuestion } from "../types"
import { Text, StyleSheet, View } from "react-native";

import AnswerItem from "./AnswerItem"

interface QuestionProps {
  question: IQuestion
}

export default function Question({ question }: QuestionProps) {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionPrompt}>
        {question.question}
      </Text>

      <View style={styles.answerItemGrid}>
        {Array.from([question.correct_answer, ...question.incorrect_answers]).map((answer: string, index: number) => {
          return (
            <AnswerItem index={index} key={`question-${index}`}>
              {answer}
            </AnswerItem>
          );          
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({  
  questionPrompt: {
    color: "#222",
    fontSize: 24,
  },
  answerItemGrid: {       
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",    
    marginTop: 48,
  }, 
});