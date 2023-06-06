import * as React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { ThumbnailTitle } from "../../components/atoms/StyledText";

const imagesTypes = {
  jackpotAndRewards: require("../../assets/images/gifts.png"),
  challenges: require("../../assets/images/defis.png"),
  newAddress: require("../../assets/images/meeting.png"),
  Classement: require("../../assets/images/scale.png"),
};

export const Thumbnail = (props) => {
  return (
    <View
      style={[styles.container, { backgroundColor: props.backgroundColor }]}
    >
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <ThumbnailTitle style={styles.title} {...props} />
        <Image
          source={imagesTypes[props.imageType]}
          style={[
            styles.icon,
            {
              width: props.width || 100,
              height: props.height || 100,
              left: props.left || 190,
              top: props.top || 15,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: 328,
    height: 160,
    marginBottom: 30,
    marginLeft: 16,
    borderRadius: 10,
  },

  button: {
    position: "absolute",
    left: 25,
    top: 0,
  },

  icon: {
    borderRadius: 10,
  },

  title: {
    top: 50, //Si y a un header remettre la valeur a 60
    padding: 10,
  },
});
