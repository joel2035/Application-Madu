import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { SimpleText } from "./StyledText";

export const FullButton = (props) => (
  <View style={styles.container}>
    <Button
      full
      bordered
      transparent
      dark
      onPress={props.onPress}
      style={{ padding: 10, borderRadius: 5 }}
    >
      <View style={styles.button}>
        <SimpleText lineHeight={40}>{props.title}</SimpleText>
        <Ionicons name="md-arrow-round-forward" size={17} />
      </View>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
