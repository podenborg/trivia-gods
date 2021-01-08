import React from "react";
import { config } from "./state"
import { Screens } from "./enums";
import { RootParamList } from "./types";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/* TO DO: INTRODUCE TS MODULE RESOLUTIONS FOR NON-RELATIVE PATHS */

import HomeScreen from "./screens/HomeScreen"
import PracticeScreen from "./screens/PracticeScreen"

const Root = createStackNavigator<RootParamList>();
const overmind = createOvermind(config, { devtools: true });

export default function App() {
  return (
    <Provider value={overmind}>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen name={Screens.HomeScreen} component={HomeScreen} />
          <Root.Screen name={Screens.PracticeScreen} component={PracticeScreen} />
        </Root.Navigator>
      </NavigationContainer>
    </Provider>    
  );
}