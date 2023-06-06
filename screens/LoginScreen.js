import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login-subscreens/Login";
import Signin from "./login-subscreens/Signin";

// LOGIN AND SIGN-IN SCREENS

export default function LoginScreen({ navigation }) {
  navigation.setOptions({ headerShown: false });
  const PointsStack = createStackNavigator();
  return (
    <PointsStack.Navigator>
      <PointsStack.Screen name="Login" component={Login} />
      <PointsStack.Screen name="Signin" component={Signin} />
    </PointsStack.Navigator>
  );
}
