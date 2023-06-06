import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { TouchableOpacity, Icon } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import Modal from "react-native-modal";
import { SimpleText, SecondaryTitle } from "../atoms/StyledText";
import { UnlockReward } from "./UnlockReward";
import axios from "axios";
import global from "../../Global";

export const RewardInfos = (props) => {
  const list = props.list;
  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: Colors.secondary,
          width: 120,
          height: 36,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500", color: "#FFF" }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);

  const unlockReward = () => {
    axios
      .patch(`${global.base_api_url}user/${props.user.uid}/`, {
        unlocked_rewards_uid: [...props.unlockedRewards, list.uid],
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setFirstModalVisible(true)}>
        <View style={styles.contentRecompense}>
          <View style={styles.contentView}>
            {isFirstModalVisible && (
              <Modal
                isVisible={isFirstModalVisible}
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ScrollView
                  style={styles.modal}
                  contentContainerStyle={styles.modalContentContainer}
                >
                  <View style={styles.contentImageCadeauxModal}>
                    <Image
                      style={styles.imageCadeauxModal}
                      source={require("../../assets/images/cadeaux_1.png")}
                    />
                    <TouchableOpacity
                      onPress={() => setFirstModalVisible(false)}
                    >
                      <View>
                        <Image
                          style={styles.delete}
                          source={require("../../assets/images/delete.png")}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <SecondaryTitle style={styles.firstModalTitle}>
                    {list.name}
                  </SecondaryTitle>
                  <View style={styles.firstModalDebock}>
                    <Text style={styles.DeblockTitle}>Débloqué !</Text>
                  </View>
                  <Text style={styles.bravo}>Bravo !</Text>
                  <SimpleText style={styles.firstModalTex}>
                    Vous avez débloqué un nouveau tips !
                  </SimpleText>
                  {renderButton("SUIVANT", () => setSecondModalVisible(true))}
                </ScrollView>
                <Modal
                  isVisible={isSecondModalVisible}
                  style={{
                    flex: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ScrollView
                    style={styles.modal}
                    contentContainerStyle={styles.modalContentContainer}
                  >
                    <View style={styles.contentImageCadeauxModalSecond}>
                      <Image
                        style={styles.imageCadeauxModalSecond}
                        source={require("../../assets/images/cadeaux_1.png")}
                      />
                    </View>

                    <SecondaryTitle style={styles.secondModalTitle}>
                      {list.name}
                    </SecondaryTitle>

                    <View style={styles.secondModalContentText}>
                      <Text
                        style={{
                          width: "100%",
                          fontWeight: "bold",
                          lineHeight: 28,
                        }}
                      >
                        {list.subtitle}
                      </Text>
                      <SimpleText style={{ marginTop: 8 }}>
                        {list.description}
                      </SimpleText>
                    </View>

                    {renderButton("FERMER", () => {
                      setFirstModalVisible(false);
                      setSecondModalVisible(false);
                      unlockReward();
                    })}
                  </ScrollView>
                </Modal>
              </Modal>
            )}
            <View style={styles.contentImageCadeaux}>
              <Image
                style={styles.imageCadeaux}
                source={require("../../assets/images/cadeaux_1.png")}
              />
            </View>

            <View style={styles.contentProgress}>
              <Text style={styles.text}>{list.name}</Text>
              <View style={styles.description}>
                <Text>{props.user.current_leaves} </Text>
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.porgressInner,
                      {
                        width: `${
                          (props.user.current_leaves * 100) / list.leaves_amount
                        }%`,
                        maxWidth: "100%",
                      },
                    ]}
                  ></View>
                </View>
                <Text>{list.leaves_amount}</Text>
                <Image
                  source={require("../../assets/images/Vector_1.png")}
                  style={styles.firstIconImage}
                />
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
    marginBottom: 20,
  },
  contentRecompense: {
    backgroundColor: "#FFF",
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
  modal: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },

  modalContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  firstModalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    top: 90,
  },
  firstModalDebock: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    backgroundColor: Colors.secondary,
    width: 166,
    height: 41,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    bottom: 60,
  },
  secondModalTitleTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 30,
  },
  delete: {
    marginLeft: 260,
    marginBottom: 50,
  },
  bravo: {
    color: Colors.secondary,
    fontSize: 25,
    fontWeight: "bold",
    position: "relative",
    bottom: 20,
  },
  firstModalText: {
    fontSize: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  secondModal: {
    backgroundColor: "#FFFFFF",
    width: "110%",
    alignItems: "center",
    justifyContent: "center",
    height: "110%",
    borderRadius: 4,
    position: "absolute",
  },
  secondModalTitle: {
    fontSize: 25,
    fontWeight: "500",
  },

  secondDeblockTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  secondModalContentText: {
    width: "90%",
    marginTop: 10,
  },
  secondIconImage: {
    position: "absolute",
    bottom: 380,
  },
  secondModalText: {
    fontSize: 15,
    marginTop: 20,
  },
  contentImageCadeauxModal: {
    width: 100,
    height: 100,
    justifyContent: "center",
    backgroundColor: "#EDF3FF",
    alignItems: "center",
    borderRadius: 60,
    marginBottom: 100,

    position: "relative",
    bottom: 50,
  },
  contentImageCadeauxModalSecond: {
    width: 100,
    height: 100,
    justifyContent: "center",
    backgroundColor: "#EDF3FF",
    alignItems: "center",
    borderRadius: 60,
    marginBottom: 20,
  },
  imageCadeauxModal: {
    width: 70,
    height: 70,
    position: "relative",
    top: 35,
  },
  DeblockTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
  },
  contentImageCadeaux: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "#EDF3FF",
  },
  imageCadeaux: {
    position: "relative",
    bottom: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    left: 10,
  },
  contentProgress: {
    flex: 1,
    width: "100%",
    shadowOpacity: (0, 0, 0, 0.1),
    flexDirection: "column",
  },
  progressContainer: {
    width: "65%",
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
  },
});
