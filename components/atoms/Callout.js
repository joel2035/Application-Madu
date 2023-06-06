import * as React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import {
  SecondaryText,
  SecondaryTitle,
  ItalicText,
  TagsText,
} from "../atoms/StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PriceIcon, WheelchairIcon, SuggestionIcon } from "../atoms/CardIcons";
import { Callout } from "react-native-maps";

export const MapCallout = (props) => {
  return (
    <Callout onPress={props.onPress} width={300} tooltip={true}>
      <CardItem cardBody>
        <Text style={{ width: 300 }}>
          <Image
            source={
              props.image
                ? { uri: props.image }
                : require("../../assets/images/abattoirveg.jpg")
            }
            style={{ height: 180, width: 300, resizeMode: "cover" }}
          />
        </Text>
      </CardItem>

      <CardItem>
        <Body>
          <SecondaryTitle>{props.name}</SecondaryTitle>
          <ItalicText>{props.address}</ItalicText>
          <View style={{ flexDirection: "row" }}>
            {props.tags.map((tag, i) => (
              <TagsText key={i} style={{ marginRight: 8 }}>
                #{tag.name}
              </TagsText>
            ))}
          </View>
          <View style={[styles.infosContainer]}>
            <View style={styles.infos}>
              <PriceIcon focused={props.price >= 1} />
              <PriceIcon focused={props.price >= 2} />
              <PriceIcon focused={props.price >= 3} />
            </View>
            <View style={styles.infos}>
              <WheelchairIcon focused={props.accessibility} />
            </View>
            {props.suggestionRate && (
              <View style={styles.infos}>
                <SuggestionIcon suggestionRate={props.suggestionRate} />
              </View>
            )}
          </View>
        </Body>
      </CardItem>
    </Callout>
  );
};

const styles = StyleSheet.create({
  infosContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infos: {
    flexDirection: "row",
    marginRight: 30,
  },
  greenscore: {
    width: 70,
    height: 60,
    position: "absolute",
    zIndex: 2,
    top: -10,
    left: -10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: "center",
  },
});
