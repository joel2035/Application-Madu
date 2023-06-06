import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SecondaryTitle } from "../atoms/StyledText";

import { Button, Spinner } from "native-base";
import axios from "axios";
import global from "../../Global";
import { UnlockReward } from "./UnlockReward";
import Colors from "../../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../hooks/auth";
import { GoBack } from "../atoms/GoBack";

export const UnlockedRewardsList = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  const [unlockedRewardsUids, setUnlockedRewardsUids] = useState(null);
  const [unlockedRewards, setUnlockedRewards] = useState(null);

  const user = useContext(AuthContext);

  useEffect(() => {
    async function fetchUnlockRewardsUids() {
      await axios
        .get(`${global.base_api_url}account/me/`)
        .then((res) => setUnlockedRewardsUids(res.data.unlocked_rewards_uid));
    }

    fetchUnlockRewardsUids();
  }, [null]);

  useEffect(() => {
    if (unlockedRewardsUids) {
      async function fetchUnlockRewards() {
        unlockedRewardsUids.forEach(async (uid) => {
          await axios.get(`${global.base_api_url}reward/${uid}/`).then((res) =>
            setUnlockedRewards((prevState) => [
              ...prevState,
              {
                reward: res.data,
              },
            ])
          );
        });
      }
      fetchUnlockRewards();
    }
  }, [unlockedRewardsUids]);
  if (unlockedRewards) {
    return (
      <View style={styles.container}>
        <GoBack />
        <View>
          <SecondaryTitle
            style={{
              marginLeft: 20,
              marginTop: 30,
            }}
            fontSize={20}
          >
            récompenses débloquées
          </SecondaryTitle>
        </View>
        <View>
          <FlatList
            keyExtractor={(item) => item.reward.uid.toString()}
            data={unlockedRewards.filter((o) => o !== null)}
            renderItem={({ item }) => (
              <UnlockReward
                uid={item.reward.uid}
                title={item.reward.name}
                description={item.reward.description}
                subtitle={item.reward.subtitle}
              />
            )}
          />
        </View>
      </View>
    );
  } else {
    return <Spinner color={Colors.secondary} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 15,
    paddingTop: 30,
  },
});
