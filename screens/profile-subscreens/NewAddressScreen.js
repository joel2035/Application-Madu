import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Switch, Button, Item } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import global from "../../Global";
import {
  ButtonText,
  ItalicText,
  LabelInput,
} from "../../components/atoms/StyledText";
import Colors from "../../constants/Colors";
import { GoBack } from "../../components/atoms/GoBack";

import { SafeAreaView } from "react-native-safe-area-context";

/* test switch button */
//import { ButtonSwitch } from "../../components/molecules/Switch";
//import SwitchButton from 'switch-button-react-native';

export const NewAddress = ({ navigation }) => {
  navigation.setOptions({ headerShown: false });
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${global.base_api_url}account/me/`)
      .then((res) => setUser(res.data));
  }, []);

  const [infos, setInfos] = useState({
    name: "",
    address: "",
    zipcode: "",
    city: "",
  });

  const updateField = (field, val) => {
    setInfos({
      ...infos,
      [field]: val,
    });
  };

  const createProposition = () => {
    let data = infos;
    data.related_user_uid = "9faa1753-e7fb-4928-9a5c-6bffb3a370db";
    data.is_eco = true;
    axios
      .post(`${global.base_api_url}new-address/`, data)
      .then((response) => {
        //TODO: notify succes to user
      })
      .catch((error) => {
        //TODO: notify failure to user
      });

    axios
      .patch(`${global.base_api_url}user/${user.uid}/`, {
        current_leaves: user.current_leaves + 30,
      })
      .then((res) => {
        console.log(res.data);
      });

    navigation.navigate("Confirmation", { type: "newAddress" });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScrollView>
        <GoBack />

        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Proposer une nouvelle adresse</Text>
        </View>

        <ItalicText style={(styles.italicText, { marginBottom: 10 })}>
          Un commerce éco-responsable vous a plu ? N’hésitez pas à le faire
          partager avec nous en proposant cette adresse dans les champs
          ci-dessous !
        </ItalicText>

        <SafeAreaView>
          <View style={{ marginBottom: 30 }}>
            <LabelInput style={{ marginBottom: 15 }}>
              Nom du commerce
            </LabelInput>
            <Item regular bordered style={styles.input}>
              <Input
                placeholder="Ex: Le Lilas"
                value={infos.name}
                onChangeText={(text) => updateField("name", text)}
              />
            </Item>
          </View>

          <View style={{ marginBottom: 30 }}>
            <LabelInput style={{ marginBottom: 15 }}>Adresse</LabelInput>
            <Item regular bordered style={styles.input}>
              <Input
                placeholder="Ex: 21 rue des flandres"
                value={infos.address}
                onChangeText={(text) => updateField("address", text)}
              />
            </Item>
          </View>

          <View style={{ marginBottom: 30 }}>
            <LabelInput style={{ marginBottom: 15 }}>Code postal</LabelInput>
            <Item regular bordered style={styles.input}>
              <Input
                placeholder="Ex: 75008"
                value={infos.zipcode}
                onChangeText={(text) => updateField("zipcode", text)}
              />
            </Item>
          </View>

          <View style={{ marginBottom: 30 }}>
            <LabelInput style={{ marginBottom: 15 }}>Ville</LabelInput>
            <Item regular bordered style={styles.input}>
              <Input
                placeholder="Ex: Paris"
                value={infos.city}
                onChangeText={(text) => updateField("city", text)}
              />
            </Item>
          </View>
        </SafeAreaView>

        <Button style={styles.addButton} onPress={() => createProposition()}>
          <ButtonText style={styles.buttonText} transform>
            Ajouter
          </ButtonText>
        </Button>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 10,
  },
  contentContainer: {
    justifyContent: "center",
    paddingTop: 30,
    flex: 1,
  },
  goBackText: {
    left: -240,
    fontFamily: "gotham-medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 20,

    color: Colors.black,
    textTransform: "capitalize",

    textAlign: "center",
  },
  title: {
    marginBottom: 20,

    fontFamily: "gotham-medium",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 30,
    textTransform: "uppercase",

    color: Colors.black,
  },
  subText: {
    fontFamily: "gotham-medium",
    fontSize: 17,
    lineHeight: 25,

    color: "#787878",
  },
  label: {
    marginBottom: 13,

    fontFamily: "gotham-medium",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 20,

    textTransform: "uppercase",

    color: Colors.black,
  },
  input: {
    /* input border */
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 4,

    /* input float */
    fontStyle: "normal",
    fontFamily: "gotham-medium",
    fontWeight: "normal",
    fontSize: 15,
    lineHeight: 14,

    color: Colors.lightGrey,
  },
  addButton: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 24,
    width: 125,
    height: 45,
    left: 110,

    borderRadius: 4,

    backgroundColor: Colors.secondary,
  },
  buttonText: {
    paddingTop: 10,
    paddingBottom: 10,

    fontStyle: "normal",
    fontFamily: "gotham-medium",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 21,

    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",

    color: Colors.white,
  },
});
