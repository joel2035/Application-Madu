import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image } from "react-native";
import { SimpleText } from "./StyledText";

export const GoBack = () => {
  const navigation = useNavigation();
  return (
    <Button onPress={() => navigation.goBack()} title="Back" light transparent>
      <View style={styles.back}>
        <View style={{ width: 30, height: 30, marginRight: 10 }}>
          <Image
            source={require("../../assets/images/back.png")}
            style={{
              width: null,
              height: null,
              resizeMode: "contain",
              flex: 1,
            }}
          />
        </View>
        <SimpleText style={{ marginTop: 10 }}>Retour</SimpleText>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  back: {
    width: 130,
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
