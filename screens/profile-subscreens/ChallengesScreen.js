import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import global from "../../Global.js";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import {
  RectButton,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CardChallenges from "../../components/molecules/CardChallenges";

import {
  Title,
  ItalicText,
  SimpleText,
  SecondaryTitle,
  SecondaryText,
  ButtonText,
} from "../../components/atoms/StyledText";
import Colors from "../../constants/Colors";
import {
  Button,
  Subtitle,
  Textarea,
  Form,
  Content,
  Spinner,
} from "native-base";
import { AuthContext } from "../../hooks/auth.js";
import { GoBack } from "../../components/atoms/GoBack.js";

export default function ChallengesScreen({ navigation }) {
  navigation.setOptions({ headerShown: false });
  const user = useContext(AuthContext);
  const [challenges, setChallenges] = useState(null);
  useEffect(() => {
    axios
      .get(`${global.base_api_url}challenge/`)
      .then((res) => setChallenges(res.data.results));
  }, []);

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <GoBack />
      <Title style={styles.titleChallenges}>
        On relève le défi {user.first_name} ?
      </Title>
      {challenges ? (
        <FlatList
          style={styles.container}
          data={challenges}
          renderItem={({ item }) => <CardChallenges challenge={item} />}
          keyExtractor={(item) => item.uid.toString()}
        ></FlatList>
      ) : (
        <Spinner color={Colors.secondary} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  titleChallenges: {
    marginBottom: 10,
  },
  containerFullCardChallenges: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    display: "none",
  },
  contentContainer: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    paddingTop: 30,
  },
  wrapper: {
    width: Dimensions.get("window").width,
    height: 50,
  },
});
