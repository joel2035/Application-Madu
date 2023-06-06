import React, { useState, useContext } from "react";
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
import {
  Button,
  Subtitle,
  Form,
  Item,
  Input,
  Content,
  CheckBox,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../hooks/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Global from "../../Global.js";
import axios from "axios";

export default function Login({ route, navigation }) {
  navigation.setOptions({ headerShown: false });
  const { dispatch } = useContext(AuthContext);
  const [infos, setInfos] = useState({
    email: "",
    password: "",
    cache: false,
  });
  const [error, setError] = useState(false);

  const updateField = (field, val) => {
    setError(false);
    setInfos({
      ...infos,
      [field]: val,
    });
  };

  const onSubmitLogin = () => {
    // implement API checkin
    if (infos.email === "" || infos.password === "") {
      setError(true);
    }
    axios
      .post(`${Global.base_api_url}auth/login/`, {
        email: infos.email,
        password: infos.password,
      })
      .then((res) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${res.data.token}`;
        dispatch({
          type: "LOGIN",
          isLoggedIn: true,
          payload: {
            storeData: infos.cache,
            user: res.data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/madu_logo.png")}
          style={styles.image}
        />
      </View>
      <Title style={styles.title} fontSize={17}>
        Se connecter
      </Title>
      <SafeAreaView style={styles.formItem}>
        <LabelInput style={{ marginBottom: 15 }}>Adresse email</LabelInput>
        <Item regular bordered style={styles.input}>
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
        <Item regular bordered style={styles.input}>
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
      {error && (
        <SimpleText color={Colors.orange}>
          Adresse email ou mot de passe erroné
        </SimpleText>
      )}
      <View style={styles.checkbox}>
        <CheckBox
          checked={infos.cache}
          onPress={() => updateField("cache", !infos.cache)}
          color={Colors.secondary}
        />
        <SimpleText style={{ marginLeft: 15, marginTop: 5 }}>
          Rester connecté(e)
        </SimpleText>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={[styles.loginButton, { backgroundColor: Colors.secondary }]}
          onPress={onSubmitLogin}
        >
          <ButtonText style={styles.buttonText} transform>
            Se connecter
          </ButtonText>
        </Button>
        <Button
          style={[styles.loginButton, { backgroundColor: Colors.blue }]}
          onPress={() => navigation.navigate("Signin")}
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
    paddingBottom: 30,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    lineHeight: 29,
    textAlign: "center",
    textTransform: "uppercase",
  },
  formItem: {
    marginBottom: 30,
    color: Colors.lightGrey,
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
  checkbox: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
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
    borderRadius: 4,
  },
  buttonText: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    color: Colors.white,
  },
});
