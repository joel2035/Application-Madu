import React, { useState, useEffect } from "react";
import axios from "axios";
import global from "../../Global.js";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Ionicons } from "@expo/vector-icons";

import challenge from "../../utils/challenge-api-test.json";
import {
  ButtonText,
  Title,
  SimpleText,
  ThirdlyTitle,
  SecondaryTitle,
} from "../../components/atoms/StyledText";
import Colors from "../../constants/Colors";
import { Button, Spinner } from "native-base";
import { GoBack } from "../../components/atoms/GoBack.js";

export const ContentChallenges = ({ route, navigation }) => {
  navigation.setOptions({ headerShown: false });

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const index = route.params.id;

  useEffect(() => {
    if (index) {
      axios
        .get(`${global.base_api_url}challenge/${index}/`)
        .then((res) => setData(res.data));

      axios
        .get(`${global.base_api_url}account/me/`)
        .then((res) => setUser(res.data));
    }
  }, [index]);

  const onPress = () => {
    axios
      .patch(`${global.base_api_url}user/${user.uid}/`, {
        current_leaves: user.current_leaves + 50,
      })
      .then((res) => {
        console.log(res.data);
      });

    navigation.navigate("Confirmation", {
      id: index,
      type: "challenge",
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <GoBack />
      {data ? (
        <>
          <View>
            <Image
              style={styles.picture}
              source={
                data.image
                  ? { uri: data.image }
                  : require("../../assets/images/Group_323.png")
              }
            />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.remainingDay}>
              <Text style={styles.span}>{data.day_duration} jours </Text>
              restants pour réaliser ce défi
            </Text>
            <SecondaryTitle
              style={{
                lineHeight: 48,
                marginTop: 20,
                marginBottom: 20,
                textAlign: "left",
              }}
            >
              {data.title}
            </SecondaryTitle>
            <Text style={styles.subtitle}>{data.subtitle}</Text>
            <Text style={styles.content}> {data.description}</Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 20,
                  marginRight: 10,
                }}
              >
                <Image
                  source={require("../../assets/images/thumb.png")}
                  style={{
                    width: null,
                    height: null,
                    flex: 1,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text style={styles.subtext}>
                <Text style={styles.span}>10 </Text>
                personnes ont réalisé ce défi, dont 3 chez Hetic.
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Spinner color={Colors.secondary} />
      )}
      <Button style={styles.buttonOk} onPress={() => onPress()}>
        <ButtonText style={styles.buttonText}>C’est bon pour moi !</ButtonText>
      </Button>

      <Button style={styles.buttonMoreTime} onPress={() => navigation.goBack()}>
        <ButtonText style={styles.buttonTextMoreTime}>
          J’ai besoin de plus de temps
        </ButtonText>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingTop: 40,
  },
  contentContainer: {
    justifyContent: "center",
    paddingBottom: 90,
  },
  contentWrapper: {
    padding: 20,
  },
  back: {
    position: "absolute",
    top: 20,
    left: 10,
    width: 55,
    padding: 20,
  },
  picture: {
    flex: 1,
    width: null,
    height: 200,
    resizeMode: "cover",
  },
  remainingDay: {
    marginTop: 15,

    fontFamily: "gotham-book",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 21,

    display: "flex",
    alignItems: "center",

    color: "#828282",
  },
  span: {
    fontFamily: "gotham-bold",
    fontStyle: "normal",
    fontWeight: "bold",
    color: Colors.text,
  },
  title: {
    marginBottom: 20,
    marginTop: 20,

    fontFamily: "gotham-medium",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 20,

    alignItems: "center",
    textTransform: "uppercase",

    color: "#1C1C1C",
  },
  subtitle: {
    marginBottom: 15,

    fontFamily: "gotham-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 26,

    color: "#00DDC0",
  },
  content: {
    marginBottom: 15,

    fontFamily: "gotham-book",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: 17,
    lineHeight: 26,

    color: Colors.black,
  },
  subtext: {
    marginBottom: 15,

    fontFamily: "gotham-book",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 20,

    color: "#828282",
  },
  buttonOk: {
    marginTop: 30,
    width: 219,
    height: 45,
    left: 67,
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
    color: Colors.white,
  },
  buttonMoreTime: {
    marginTop: 30,
    marginBottom: 30,
    width: 277,
    height: 45,
    left: 35,
    justifyContent: "center",
    backgroundColor: Colors.pureWhite, //"#ffffff",

    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 4,
  },
  buttonTextMoreTime: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: "center",
    color: Colors.secondary,
  },
});
