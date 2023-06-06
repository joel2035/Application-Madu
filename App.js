import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import axios from "axios";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import LoginScreen from "./screens/LoginScreen";
import { authReducer, initialState, AuthContext } from "./hooks/auth";

const Stack = createStackNavigator();

export default function App(props) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const isLoadingComplete = useCachedResources();

  axios.defaults.headers.common["Authorization"] =
    "Token 2b55afac7ce42f3eb579b71ff2816e891d8bdfa5";

  if (isLoadingComplete) {
    return (
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              {state.isAuthenticated ? (
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AuthContext.Provider>
    );
  } else return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
