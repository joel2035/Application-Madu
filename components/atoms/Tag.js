import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SimpleText } from "./StyledText";

export const Tag = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.container,
        {
          backgroundColor: "transparent",
        },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: props.focused ? Colors.secondary : "#FFFFFF",
          },
        ]}
      >
        <SimpleText
          color={props.focused ? Colors.white : Colors.secondary}
          fontSize={16}
          style={[styles.title]}
        >
          {props.title}
        </SimpleText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderColor: "transparent",
    borderWidth: 1,
    minWidth: 50,
    height: 30,
    borderRadius: 3,
    paddingRight: 10,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1, //5,
    paddingTop: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    textTransform: "capitalize",
  },
});
