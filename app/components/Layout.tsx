import React from "react";
import tailwind from "tailwind-rn"
import { View, SafeAreaView } from "react-native";

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SafeAreaView style={tailwind("h-full w-full bg-gray-100 flex items-center")}>
      <View style={tailwind("h-full w-full max-w-sm")}>
        {children}
      </View>      
    </SafeAreaView>
  )
}