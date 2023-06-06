import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SimpleText, Title, Subtitle } from "./StyledText";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const imagesTypes = {
  filters: require("../../assets/images/filters.png"),
  veggie: require("../../assets/images/veggie.png"),
  glutenfree: require("../../assets/images/glutenfree.png"),
  bio: require("../../assets/images/bio.png"),
  vegan: require("../../assets/images/vegan.png"),
  local: require("../../assets/images/local.png"),
  fish: require("../../assets/images/poisson.png"),
};

export const FilterButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.container,
        {
          borderColor: props.focused ? Colors.secondary : "transparent",
          maxWidth: props.filterView ? 130 : "auto",
          height: props.filterView ? 100 : 70,
        },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      {props.imageType && (
        <Image source={imagesTypes[props.imageType]} style={styles.image} />
      )}
      {props.imageType === "filters" ? (
        <Subtitle>{props.title}</Subtitle>
      ) : (
        <SimpleText style={styles.title}>{props.title}</SimpleText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,//4,
    paddingTop: 5,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 3,
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: 80,
  },
  contentContainer: {
    justifyContent: "center",
    paddingTop: 30,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    marginTop: 5,
  },
});
