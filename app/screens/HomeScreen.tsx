import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../enums";
import { RootParamList } from "../../types";
import { StatusBar } from "expo-status-bar";
import { StackScreenProps } from "@react-navigation/stack";
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet } from "react-native";

import Layout from "../components/Layout";
import Button from "../components/Button";

type HomeScreenProps = StackScreenProps<RootParamList, Screens.HomeScreen>

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  return (
    <Layout>      
      <View style={tailwind("w-full px-4")}>        
        <View style={tailwind("mt-6 py-6 px-6 bg-white rounded-md")}>
          <View style={tailwind("mb-6")}>
            <Text style={tailwind("text-gray-600 font-bold text-4xl")}>
              15
            </Text>
            <Text style={tailwind("text-gray-500 font-medium text-xl")}>
              questions to review
            </Text>
          </View>

          <Button onPress={() => navigation.navigate(Screens.PracticeScreen, { questionIndex: 0 })}>
            Practice Mode
          </Button>
        </View>

        <StatusBar style="auto" />           
      </View>
    </Layout>
  );
}