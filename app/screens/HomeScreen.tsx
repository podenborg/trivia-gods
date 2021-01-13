import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../enums";
import { RootParamList } from "../../types";
import { StatusBar } from "expo-status-bar";
import { StackScreenProps } from "@react-navigation/stack";
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet } from "react-native";

import Layout from "../components/Layout";

type HomeScreenProps = StackScreenProps<RootParamList, Screens.HomeScreen>

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  return (
    <Layout>
      {/* TO DO: remove the py-16 class below */}
      <View style={tailwind("w-full")}>        
        <View style={tailwind("mt-6 py-6 px-6 bg-white rounded-md")}>
          <View>
            <Text style={tailwind("text-gray-600 font-bold text-4xl")}>
              15
            </Text>
            <Text style={tailwind("text-gray-500 font-medium text-xl")}>
              questions to review
            </Text>
          </View>

          <TouchableOpacity 
            style={tailwind("mt-6 px-4 py-2 bg-green-600 flex-row justify-center rounded-md")}
            onPress={() => navigation.navigate(Screens.PracticeScreen, { questionIndex: 0 })}
          >
            <Text style={tailwind("text-white font-medium text-lg")}>
              Practice Mode
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />           
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#374151",
    shadowOpacity: .2,
    shadowOffset: {
      width: 2,
      height: 2
    }
  }
});