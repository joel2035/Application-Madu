import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity, Icon } from "react-native-gesture-handler";
import SimpleText from "../atoms/StyledText";
import Colors from "../../constants/Colors";

export const RewardItem = (props) => {
  const list = props.list;

  const isUnlock = () => true;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View
          style={[
            styles.contentRecompense,
            {
              opacity: isUnlock() ? 0.5 : 1,
              backgroundColor: isUnlock() ? "#8F9298" : "#FFF",
            },
          ]}
        >
          <View style={[styles.contentView, { opacity: isUnlock() ? 0.5 : 1 }]}>
            <View
              style={[
                styles.contentImageCadeaux,
                { backgroundColor: isUnlock() ? "#545B62" : "#EDF3FF" },
              ]}
            >
              <Image
                style={[styles.imageCadeaux, { opacity: isUnlock() ? 0.4 : 1 }]}
                source={
                  list.image
                    ? { uri: list.image }
                    : require("../../assets/images/cadeaux_1.png")
                }
              />
            </View>
            <View style={styles.contentProgress}>
              <Text style={styles.text}>{list.name}</Text>
              <View style={styles.description}>
                <Text>{props.userScore} </Text>
                <View
                  style={[
                    styles.progressContainer,
                    {
                      backgroundColor: isUnlock() ? "#545B62" : Colors.white,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.progressInner,
                      {
                        width: isUnlock()
                          ? `${(props.userScore * 100) / list.leaves_amount}%`
                          : "100%",
                        maxWidth: "100%",
                        backgroundColor: isUnlock()
                          ? Colors.white
                          : Colors.secondary,
                      },
                    ]}
                  ></View>
                </View>
                <Text style={{ marginLeft: 4 }}>{list.leaves_amount}</Text>
                <View style={{ width: 20, height: 20, marginRight: 10 }}>
                  <Image
                    source={require("../../assets/images/greenscore-2.png")}
                    style={styles.firstIconImage}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  contentRecompense: {
    height: 70,
    borderRadius: 4,

    shadowOpacity: 0.1,
    marginHorizontal: 20,
  },
  contentView: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },

  delete: {
    marginLeft: 260,
    marginBottom: 50,
  },

  contentImageCadeauxModal: {
    width: 100,
    height: 100,
    justifyContent: "center",
    backgroundColor: "#EDF3FF",
    alignItems: "center",
    borderRadius: 60,
  },

  DeblockTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  contentImageCadeaux: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: "center",
    marginTop: 5,
  },
  imageCadeaux: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    left: 10,
  },
  contentProgress: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
  progressContainer: {
    width: "65%",
    height: 10,
    justifyContent: "center",
    borderRadius: 20,
  },

  progressInner: {
    height: 10,
    borderRadius: 15,
  },
  description: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    width: "100%",
    marginLeft: 25,
    marginTop: 10,
  },
  firstIconImage: {
    marginLeft: 3,
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain",
  },
});
