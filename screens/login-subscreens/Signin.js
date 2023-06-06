import React, { useState, useContext } from "react";
import axios from "axios";
import Global from "../../Global.js";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Title,
  ItalicText,
  SimpleText,
  SecondaryTitle,
  SecondaryText,
  ButtonText,
  LabelInput,
} from "../../components/atoms/StyledText";
import { Button, Subtitle, Form, Item, Input, Content } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../hooks/auth";
import { Tag } from "../../components/atoms/Tag";
import { GoBack } from "../../components/atoms/GoBack.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin({ route, navigation }) {
  navigation.setOptions({ headerShown: false });
  const [infos, setInfos] = useState({
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorTxt, setErrorTxt] = useState(
    "Adresse email ou mot de passe erroné"
  );

  const updateField = (field, val) => {
    setInfos({
      ...infos,
      [field]: val,
    });
  };

  const onSubmitSignin = async () => {
    // implement API checkin
    delete axios.defaults.headers.common["Authorization"];
    let companies = [];
    if (
      infos.email === "" ||
      infos.password === "" ||
      infos.confirmationPassword === ""
    ) {
      setError(true);
      setErrorTxt("Adresse email ou mot de passe erroné");
    }
    await axios.get(`${Global.base_api_url}company/`).then((res) => {
      companies = res.data.results;
    });
    let extension = infos.email.split("@")[1];
    let available_extensions = companies.map((comp) => comp.mail_affix);
    if (!available_extensions.includes(extension)) {
      setError(true);
      setErrorTxt("L'adresse email n'appartient à aucune entreprise");
    } else {
      let company = companies.find((comp) => comp.mail_affix === extension);
      axios
        .post(`${Global.base_api_url}auth/register/`, {
          email: infos.email,
          password1: infos.password,
          password2: infos.confirmationPassword,
        })
        .then(async (user) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Token ${user.data.token}`;
          await axios.patch(user.data.url, {
            company_uid: company.uid,
          });
          dispatch({
            type: "LOGIN",
            isLoggedIn: true,
            payload: {
              storeData: false,
              user: user,
            },
          });
        })
        .catch((err) => {
          setError(true);
          setErrorTxt("Adresse email ou mot de passe erroné");
        });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <GoBack />

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/madu_logo.png")}
          style={styles.image}
        />
      </View>
      <Title style={styles.title} fontSize={20}>
        S'inscrire
      </Title>
      <SafeAreaView style={styles.formItem}>
        <LabelInput style={{ marginBottom: 15 }}>
          Adresse email professionnelle
        </LabelInput>
        <Item regular bordered bordered style={styles.input}>
          <Input
            placeholder={"Ex: Marie@hetic.net"}
            value={infos.email}
            onChangeText={(text) => updateField("email", text)}
            style={{ color: Colors.grey }}
          />
        </Item>
      </SafeAreaView>
      <View style={styles.formItem}>
        <LabelInput style={{ marginBottom: 15 }}>Mot de passe</LabelInput>
        <Item regular bordered bordered style={styles.input}>
          <Input
            textContentType={"password"}
            secureTextEntry={true}
            placeholder={"******"}
            rounded
            value={infos.password}
            onChangeText={(text) => updateField("password", text)}
            style={{ color: Colors.grey }}
          />
        </Item>
      </View>
      <View style={styles.formItem}>
        <LabelInput style={{ marginBottom: 15 }}>
          Confirmation de mot de passe
        </LabelInput>
        <Item regular bordered bordered style={styles.input}>
          <Input
            secureTextEntry={true}
            placeholder={"******"}
            rounded
            value={infos.confirmationPassword}
            onChangeText={(text) => updateField("confirmationPassword", text)}
            style={{ color: Colors.grey }}
          />
        </Item>
      </View>
      {error && <SimpleText color={Colors.orange}>{errorTxt}</SimpleText>}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={[styles.loginButton, { backgroundColor: Colors.secondary }]}
          onPress={onSubmitSignin}
        >
          <ButtonText style={styles.buttonText} transform>
            S'inscrire
          </ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 30,
  },
  contentContainer: {
    justifyContent: "center",
    paddingBottom: 60,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    textTransform: "uppercase",
  },
  formItem: {
    marginBottom: 30,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 4,
  },
  loginButton: {
    width: 200,
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    color: Colors.white,
  },
});
