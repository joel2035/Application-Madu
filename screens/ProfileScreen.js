import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import Sliding from "../components/organisms/Sliding";
import { Thumbnail } from "../components/molecules/ProfileThumbnail";
import { ContentChallenges } from "./profile-subscreens/ContentChallengesScreen";
import { NewAddress } from "./profile-subscreens/NewAddressScreen";
import ConfirmationScreen from "./shops-subscreens/ConfirmationScreen";
import ChallengesScreen from "./profile-subscreens/ChallengesScreen";
import { LeavesCount } from "../components/atoms/LeavesCount";
import { useNavigation } from "@react-navigation/native";

// PROFILE SCREEN

const PointsStack = createStackNavigator();

export const Ranking = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  return <Sliding />;
};

export const Profile = ({ navigation }) => {
  navigation.setOptions({ headerShown: false });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.profileOption}>
          <Thumbnail
            backgroundColor={"#FDE6E6"}
            imageType="challenges"
            width={207}
            height={129}
            left={96}
            top={-10} //Si y a un header remettre la valeur a 10
            onPress={() => navigation.navigate("Challenges")}
          >
            Mes défis
          </Thumbnail>
          <Thumbnail
            backgroundColor={"#E9F7FF"}
            imageType="jackpotAndRewards"
            width={176}
            height={130}
            left={125}
            top={-32}
            onPress={() => navigation.navigate("Cagnotte")}
          >
            Cagnotte et récompenses
          </Thumbnail>

          <Thumbnail
            backgroundColor={"#E3E8FF"}
            imageType="newAddress"
            width={114}
            height={115}
            left={166}
            top={-17} //Si y a un header remettre la valeur a 3
            onPress={() => navigation.navigate("NewAddress")}
          >
            Proposer une nouvelle adresse
          </Thumbnail>

          <Thumbnail
            backgroundColor={"#CCF8F2"}
            imageType="Classement"
            width={207}
            height={129}
            left={96}
            top={-10} //Si y a un header remettre la valeur a 10
            onPress={() => navigation.navigate("Ranking")}
          >
            Classement
          </Thumbnail>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default function ProfileScreen() {
  return (
    <PointsStack.Navigator>
      <PointsStack.Screen name="Profile" component={Profile} />
      <PointsStack.Screen
        name="ContentChallenges"
        component={ContentChallenges}
      />
      {/* <PointsStack.Screen name="jackpotAndRewardsName" component={jackpotAndRewardsPageName} /> */}
      <PointsStack.Screen name="Challenges" component={ChallengesScreen} />
      <PointsStack.Screen name="NewAddress" component={NewAddress} />
      <PointsStack.Screen name="Ranking" component={Ranking} />
      <PointsStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </PointsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },

  contentContainer: {
    justifyContent: "center",
    paddingTop: 30,
    flex: 1,
  },

  /* Cards */
  profileOption: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Dimensions.get("window").width,

    /* heigh & top when there is the header */
    //height: 959,
    //top: 201,

    /* heigh & top when there is not the header */
    height: 780,
    top: 20,
  },
});
