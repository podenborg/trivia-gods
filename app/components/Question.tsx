import he from "he";
import React from "react";
import { useState } from "../state";
import { IQuestion } from "../types";
import { PracticeScreenRouteProp } from "../types";
import { useRoute } from "@react-navigation/native";
import { Text, FlatList, View } from "react-native";

import AnswerItem from "./AnswerItem"
import tailwind from "tailwind-rn";

interface QuestionProps {
  question: IQuestion
}

export default function Question({ question }: QuestionProps) {
  const renderItem = ({ item }: {item: string}) => (
    <AnswerItem answer={item} />     
  );

  return (
    <View>
      <FlatList
        renderItem={renderItem}
        style={tailwind("w-full")}
        keyExtractor={(_, index) => `answer-${index}`}
        data={[ question.correct_answer, ...question.incorrect_answers]}
        ListHeaderComponent={<QuestionHeader question={question} />}
      />
    </View>
  );
}

interface QuestionHeaderProps {
  question: IQuestion
}

function QuestionHeader({ question }: QuestionHeaderProps) {
  const { questions } = useState();
  const { totalQuestions } = questions;
  const route = useRoute<PracticeScreenRouteProp>();

  return (
    <View>
      <Text style={tailwind("mt-3 text-gray-500 text-base font-medium")}>
        Question {route?.params?.questionIndex + 1}/{totalQuestions}
      </Text>
      <Text style={tailwind("mt-2 text-lg text-gray-800 font-medium")}>
        {he.decode(question.question)}
      </Text>
    </View>
  );
}