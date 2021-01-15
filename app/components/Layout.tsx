import React from "react";
import tailwind from "tailwind-rn"
import { View } from "react-native";

console.log(tailwind);

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <View style={tailwind("h-full w-full bg-gray-100 flex items-center")}>
      <View style={tailwind("h-full w-full max-w-sm")}>
        {children}
      </View>      
    </View>
  )
}