import React from "react";
import tailwind from "tailwind-rn";
import { useState, useActions } from "../state";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

interface AnswerItemProps {
  answer: string
}

export default function AnswerItem({ 
  answer
}: AnswerItemProps) {
  const { questions } = useState();
  const { currentQuestion } = questions;
  const { setQuestion } = useActions();

  const unansweredAnswerStyles = "bg-white border border-solid border-gray-100";
  const correctAnswerStyles = "bg-green-100 border border-solid border-green-400";
  const incorrectAnswerStyles = "bg-red-100 border border-solid border-red-400";

  const getAnswerStyles = () => {
    if (!currentQuestion.was_answered) return unansweredAnswerStyles;

    if (currentQuestion.user_answer === answer) {
      if (currentQuestion.correct_answer !== currentQuestion.user_answer) {
        if (currentQuestion.correct_answer === answer) return correctAnswerStyles;
        else return incorrectAnswerStyles;
      }
      else return correctAnswerStyles;
    } else {
      if (currentQuestion.correct_answer === answer) return correctAnswerStyles; 
      return unansweredAnswerStyles;
    }
  };

  console.log("currentQuestion", currentQuestion);

  const handleAnswerQuestion = () => {
    if (currentQuestion.was_answered) return;
    setQuestion({
      id: currentQuestion.id,
      values: {
        user_answer: answer,
        was_answered: true,
      }
    });
  };

  return (
    <TouchableOpacity onPress={handleAnswerQuestion} style={tailwind(`w-full min-w-full mt-3 px-4 py-5 rounded-md ${getAnswerStyles()}`)}>
      <Text style={tailwind("text-base font-semibold text-gray-600")}>
        {answer}
      </Text>
    </TouchableOpacity>
  );
}