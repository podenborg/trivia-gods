import he from "he";
import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../enums";
import { IQuestion } from "../types";
import { useState, useActions } from "../state";
import { View, Text, FlatList } from "react-native";

import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Button from "../components/Button";

interface RenderItemProps {
  item: IQuestion,
  index: number
}

export default function SummaryScreen({ navigation }) {
  const { questions, session } = useState();
  const { dataList, totalCorrect, totalQuestions } = questions;
  const { isLoading, isError, error } = session;
  const { saveSessionData } = useActions();

  const renderItem = ({ item: question, index }: RenderItemProps) => (
    <View style={tailwind(`px-4 py-3 rounded-sm ${index % 2 === 0 ? "bg-transparent" : "bg-gray-200"}`)}>
      <Text numberOfLines={1} style={tailwind(`text-base font-medium ${question.correct_answer === question.user_answer ? "text-green-600" : "text-red-600"}`)}>
        {he.decode(question.question)}
      </Text>
    </View>
  );

  React.useEffect(() => {
    const saveSession = async () => {await saveSessionData()};
    saveSession();
  }, []);

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <Text>Error: {error?.message}</Text>
  }

  return (
    <Layout>
      <View style={tailwind("mt-6")}>
        <Text style={tailwind(`text-center text-lg text-gray-600 font-semibold`)}>
          You got {totalCorrect} out of {totalQuestions} questions correct!
        </Text>

        <FlatList 
          data={dataList}
          renderItem={renderItem}
          style={tailwind("mt-3 w-full")}
          keyExtractor={item => item.id}
        />
      </View>      

      <View style={tailwind("mt-5")}>
        <Button onPress={() => navigation.navigate(Screens.HomeScreen)}>
          Continue
        </Button>
      </View>
    </Layout>
  )
}