import React from "react";
import tailwind from "tailwind-rn";
import { View, ActivityIndicator } from "react-native";

import Layout from "./Layout";

export default function Loader() {
  return (
    <Layout>
      <View style={tailwind("h-full w-full flex justify-center items-center")}>
        <ActivityIndicator size="large" />
      </View>
    </Layout>    
  )
}
