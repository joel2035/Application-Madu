import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Slider,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  SimpleText,
  SecondaryTitle,
  SecondaryText,
  ButtonText,
  HighlightText,
  Subtitle,
} from "../../components/atoms/StyledText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Button } from "native-base";

export default function ConfirmationScreen({ route, navigation }) {
  navigation.setOptions({ headerShown: false });

  const index = route.params.id;

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <HighlightText style={{ paddingTop: 40, paddingBottom: 20 }} transform>
        {route.params.type === "challenge" ? "Bravo ! " : "Merci !"}
      </HighlightText>
      {route.params.type === "challenge" && (
        <SecondaryText>Tu as accompli ta mission du jour !</SecondaryText>
      )}
      {route.params.type !== "challenge" && (
        <Subtitle style={{ marginBottom: 20 }}>
          Nous avons bien pris en compte ta suggestion, elle sera validée
          sous 48h.
        </Subtitle>
      )}
      {route.params.type === "challenge" && (
        <SimpleText style={{ textAlign: "center" }}>
          Tu viens de gagner
          <Subtitle color={Colors.secondary}> 50 leaves</Subtitle>
        </SimpleText>
      )}
      {route.params.type === "feedback" && (
        <SimpleText style={{ textAlign: "center" }}>
          Lorsque ton avis sera validé,
          <Subtitle color={Colors.secondary}> 20 leaves</Subtitle> seront
          ajoutés à ta cagnotte.
        </SimpleText>
      )}
      {route.params.type === "newAddress" && (
        <SimpleText style={{ textAlign: "center" }}>
          Lorsque ton avis sera validé,
          <Subtitle color={Colors.secondary}> 30 leaves</Subtitle> seront
          ajoutés à ta cagnotte.
        </SimpleText>
      )}
      <View
        style={{
          flex: 1,
          width: 300,
          justifyContent: "center",
        }}
      >
        <Image
          source={
            route.params.type === "newAddress"
              ? require("../../assets/images/thanks_man.png")
              : require("../../assets/images/thanks.png")
          }
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "contain",
          }}
        />
      </View>
      {route.params.type === "feedback" && (
        <Button
          style={styles.searchButton}
          onPress={() => navigation.navigate("Shop", { id: index })}
        >
          <ButtonText style={styles.buttonText} transform>
            retourner sur la fiche
          </ButtonText>
        </Button>
      )}
      {route.params.type === "greenscore" && (
        <Button
          style={styles.searchButton}
          onPress={() => navigation.navigate("Map")}
        >
          <ButtonText style={styles.buttonText} transform>
            retourner sur la map
          </ButtonText>
        </Button>
      )}
      {(route.params.type === "challenge" ||
        route.params.type === "newAddress") && (
        <Button
          style={styles.searchButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <ButtonText style={styles.buttonText} transform>
            retourner sur le profil
          </ButtonText>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
    justifyContent: "center",
  },
  contentContainer: {
    justifyContent: "center",
  },
  searchButton: {
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    marginTop: 50,
  },
  buttonText: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    color: Colors.white,
  },
});
