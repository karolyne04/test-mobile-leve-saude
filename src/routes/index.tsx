import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";

import HomeScreen from "../screens/HomeScreen";

import FeedbackFormScreen from "../screens/FeedbackFormScreen";
import SignUpScreen from "../screens/SignUpScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: "Cadastro" }}
      />
      <Stack.Screen name="FeedbackFormScreen" component={FeedbackFormScreen} />
    </Stack.Navigator>
  );
}
