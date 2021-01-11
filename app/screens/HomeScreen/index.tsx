import React from "react";
import tailwind from "tailwind-rn";
import { Screens } from "../../enums";
import { RootParamList } from "../../types";
import { StatusBar } from "expo-status-bar";
import { StackScreenProps } from "@react-navigation/stack";
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet } from "react-native";
import HomeScreenBackground from "../../assets/bg-home-screen.jpg"

type HomeScreenProps = StackScreenProps<RootParamList, Screens.HomeScreen>

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  return (
    <View style={styles.screenContainer}>
      <ImageBackground 
        source={HomeScreenBackground}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View>
          <Text style={styles.header}>
            Welcome to Trivia Gods!
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate(Screens.PracticeScreen, { questionIndex: 0 })}
            style={tailwind("px-4 py-2 max-w-xs bg-indigo-600 rounded-md")}
          >
            <Text style={tailwind("text-white font-medium")}>
              Practice Mode
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </ImageBackground>      
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});