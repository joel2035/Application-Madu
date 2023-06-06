import * as React from "react";
import { View, Image } from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "native-base";
import { SimpleText } from "./StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const PriceIcon = (props) => {
  return (
    <Ionicons
      name="logo-euro"
      size={props.size ? props.size : 20}
      style={{ marginRight: 5 }}
      color={props.focused ? Colors.secondary : Colors.grey}
    />
  );
};

export const WheelchairIcon = (props) => {
  if (props.focused) {
    return (
      <View style={{ width: 25, height: 25 }}>
        <Image
          source={require("../../assets/images/wheelchair.png")}
          style={{ width: null, height: null, resizeMode: "contain", flex: 1 }}
        />
      </View>
    );
  } else return null;
};

export const SuggestionIcon = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="md-thumbs-up"
        size={props.size ? props.size : 30}
        style={{ marginBottom: -3 }}
        color={props.color ? props.color : Colors.secondary}
      />

      <SimpleText style={{ marginLeft: 5, marginTop: 15 }}>
        {props.suggestionRate ? props.suggestionRate : 89}%
      </SimpleText>
    </View>
  );
};
