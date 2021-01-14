import React from "react";
import tailwind from "tailwind-rn";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

interface ButtonsProps {
  children: React.ReactNode,
  onPress: (event: GestureResponderEvent) => void
}

export default function Button({ children, onPress }: ButtonsProps) {
  return (
    <TouchableOpacity
      style={tailwind("px-4 py-3 bg-green-600 flex-row justify-center rounded-md")}
      onPress={onPress}
    >
      <Text style={tailwind("text-white font-semibold text-lg")}>
        { children }
      </Text>
    </TouchableOpacity>
  )
}
