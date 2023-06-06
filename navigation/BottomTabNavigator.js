import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../screens/MapScreen";
import PointsScreen from "../screens/PointsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: false });
  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: "#00DDC0",
        inactiveTintColor: "gray",
      }}
    >
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Sélection",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cagnotte"
        component={PointsScreen}
        options={{
          title: "Cagnotte",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-gift" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Map":
      return "Map";
    case "Liste":
      return "Selection";
    case "Profile":
      return "Profile";
    case "Cagnotte":
      return "Cagnotte";
  }
}
