import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Title,
  SimpleText,
  SecondaryTitle,
  Subtitle,
} from "../components/atoms/StyledText";
import {
  RectButton,
  ScrollView,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import RewardsList from "../components/organisms/RewardsList";
import Colors from "../constants/Colors";
import { Button, Spinner } from "native-base";
import axios from "axios";
import global from "../Global";
import { UnlockedRewardsList } from "../components/organisms/UnlockedRewardsList";
import { RewardInfos } from "../components/organisms/RewardInfos";

// CAGNOTTE SCREEN

const PointsStack = createStackNavigator();

export const Infos = ({ navigation }) => {
  navigation.setOptions({ headerShown: false });
  const [currentScore, setCurrentScore] = useState(70);
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [unlockedRewards, setUnlockedRewards] = useState(null);
  const [nextReward, setNextReward] = useState(null);

  const sortByLeaves = (a, b) => {
    if (a.leaves_amount > b.leaves_amount) return 1;
    if (b.leaves_amount > a.leaves_amount) return -1;

    return 0;
  };

  useEffect(() => {
    async function fetchUserData() {
      await axios
        .get(`${global.base_api_url}account/me/`)
        .then((res) => setUser(res.data));
    }
    fetchUserData();
  }, [null]);

  useEffect(() => {
    if (user) {
      async function fetchRewards() {
        await axios
          .get(`${global.base_api_url}reward/`)
          .then((res) =>
            setRewards(
              res.data.results
                .filter(
                  (reward) => !user.unlocked_rewards_uid.includes(reward.uid)
                )
                .sort(sortByLeaves)
            )
          );
      }

      fetchRewards();
    }
  }, [user]);

  useEffect(() => {
    if (rewards) {
      setUnlockedRewards(
        rewards.filter((reward) =>
          user.unlocked_rewards_uid.includes(reward.uid)
        )
      );

      setNextReward(rewards[0]);
    }
  }, [rewards]);

  useEffect(() => {
    if (nextReward) {
      setCurrentScore((user.current_leaves * 100) / nextReward.leaves_amount);
    }
  }, [nextReward]);

  const InnercurrentScore = ({ width }) => (
    <View
      style={{
        width: `${width}%`,
        maxWidth: "110%",
        height: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 15,
      }}
    ></View>
  );
  const ShowReward = () => {
    if (currentScore >= 100 && nextReward) {
      return (
        <FlatList
          keyExtractor={(item) => item.uid.toString()}
          data={[nextReward]}
          renderItem={({ item }) => (
            <RewardInfos
              list={nextReward}
              user={user}
              unlockedRewards={unlockedRewards}
            />
          )}
        />
      );
    } else {
      return null;
    }
  };

  const Description = () => {
    if (currentScore >= 100) {
      return (
        <SimpleText style={styles.description} lineHeight={20}>
          Vous pouvez dès à présent débloquer une récompense.
        </SimpleText>
      );
    } else {
      return (
        <SimpleText style={styles.description}>
          <Text style={{ color: Colors.secondary, fontWeight: "bold" }}>
            {nextReward ? nextReward.leaves_amount - user.current_leaves : 100}{" "}
            leaves
          </Text>{" "}
          à accumuler avant de pouvoir débloquer la prochaine récompense.
        </SimpleText>
      );
    }
  };
  if (rewards && unlockedRewards && nextReward && user) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.contentHearder}>
          <View style={styles.contentView}>
            <Text style={styles.number}>{user.current_leaves}</Text>
            <View style={{ width: 30, height: 30 }}>
              <Image
                source={require("../assets/images/greenscore-2.png")}
                style={styles.iconImage}
              />
            </View>
            <SecondaryTitle fontSize={20} style={styles.leave}>
              leaves
            </SecondaryTitle>
          </View>
          <View
            style={{
              position: "absolute",
              top: 60,
              width: "80%",
              textAlign: "center",
            }}
          >
            <Description />
          </View>
          <View style={styles.contentcurrentScore}>
            <View style={styles.progressContainer}>
              <InnercurrentScore width={currentScore} />
            </View>

            <View style={styles.imageContent}>
              <Image
                source={require("../assets/images/cadeaux_1.png")}
                style={styles.firstIconImage}
              />
            </View>
          </View>
          <View style={styles.contenTitle}>
            <SecondaryTitle fontSize={20} style={styles.title}>
              récompenses à débloquer
            </SecondaryTitle>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ShowReward")}>
            <View style={styles.contentRecompense}>
              <SecondaryTitle fontSize={14} style={styles.text} lineHeight={22}>
                Voir les récompenses {"\n"} déjà débloquées
              </SecondaryTitle>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ShowReward />
          <RewardsList rewards={rewards} userScore={user.current_leaves} />
        </View>
      </View>
    );
  } else {
    return <Spinner color={Colors.secondary} />;
  }
};

export default function PointsScreen() {
  return (
    <PointsStack.Navigator>
      <PointsStack.Screen name="Infos" component={Infos} />
      <PointsStack.Screen name="ShowReward" component={UnlockedRewardsList} />
    </PointsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingTop: 40,
  },
  contentContainer: {
    justifyContent: "center",
  },
  contentHearder: {
    position: "relative",
  },
  subtitle: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  contentView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "58%",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    marginBottom: 20,
  },
  contenTitle: {
    position: "absolute",
    top: 10,
  },
  contentcurrentScore: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 120,
  },
  number: {
    fontWeight: "600",
    fontSize: 50,
    color: Colors.secondary,
    marginLeft: 50,
  },
  iconImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain",
  },
  leave: {
    marginLeft: 20,
    top: 11,
    right: 15,
  },
  description: {
    width: Dimensions.get("window").width - 20,
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  progressContainer: {
    width: "80%",
    height: 10,
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
  },
  porgressInner: {
    height: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 15,
  },
  imageContent: {
    width: 50,
    borderRadius: 30,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.1,
  },
  firstIconImage: {
    width: 30,
    height: 30,
  },
  title: {
    top: 180,
    marginLeft: 20,
  },
  contentRecompense: {
    backgroundColor: Colors.secondary,
    height: 70,
    borderRadius: 4,
    shadowOpacity: 0.1,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 230,
    marginBottom: 20,
    paddingTop: 10,
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
  buttonStyle: {
    height: 60,
    paddingLeft: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 14,
    borderRadius: 4,
    marginBottom: 45,
  },
  "buttonStyle:last-child": {
    marginBottom: 0,
    backgroundColor: "#FAAAFF",
  },
  buttonImage: {
    position: "absolute",
    height: 75,
    width: 75,
    left: 15,
    bottom: 0,
  },
  buttonTitleStyle: {
    textAlign: "left",
  },
  buttonSubtitleStyle: {
    textAlign: "left",
  },
  titleStyle: {
    marginBottom: 30,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    backgroundColor: "rgba(53, 64, 82, 0.41)",
  },
  modalView: {
    position: "relative",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop: 103,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    position: "absolute",
    height: 136,
    width: 136,
    top: -68,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
