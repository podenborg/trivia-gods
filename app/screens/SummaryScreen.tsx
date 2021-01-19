import he from "he";
import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../enums";
import { useState, useActions } from "../state";
import { View, Text, FlatList } from "react-native";
import { IQuestion, RootParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";

import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Button from "../components/Button";

export type SummaryScreenProps = StackScreenProps<RootParamList, Screens.SummaryScreen>

interface RenderItemProps {
  item: IQuestion,
  index: number
}

export default function SummaryScreen({ navigation }: SummaryScreenProps) {
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
      <FlatList 
        data={dataList}
        renderItem={renderItem}
        style={tailwind("mt-3 w-full px-4")}
        keyExtractor={item => item.id}
        ListHeaderComponent={<SummaryHeader/>}
        ListFooterComponent={<SummaryFooter navigation={navigation}/>}
      />
    </Layout>
  )
}

function SummaryHeader() {
  const { questions } = useState();
  const { totalCorrect, totalQuestions } = questions;

  return (
    <View style={tailwind("mt-4 flex justify-center")}>
      <Text style={tailwind(`text-center text-lg text-gray-600 font-semibold`)}>
        You got {totalCorrect} out of {totalQuestions} questions correct!
      </Text>
    </View>
  );
}

interface SummaryFooterProps extends Pick<SummaryScreenProps, "navigation"> {}

function SummaryFooter({ navigation }: SummaryFooterProps) {  
  return (
    <View style={tailwind("mt-5 px-4 h-24 flex justify-center border-t-2 border-solid border-gray-200")}>
      <Button onPress={() => navigation.navigate(Screens.HomeScreen)}>
        Continue
      </Button>
    </View>
  );
}