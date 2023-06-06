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
import { useNavigation } from "@react-navigation/native";

export const MiniCard = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Shop", { id: props.id })}
      style={{ marginBottom: 20, width: 160, marginRight: 10, right: 5 }}
    >
      <Card>
        <CardItem cardBody>
          <Image
            source={
              props.image
                ? { uri: props.image }
                : require("../../assets/images/abattoirveg.jpg")
            }
            style={{ height: 100, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Body>
            <SecondaryTitle>{props.name}</SecondaryTitle>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 10,
              }}
            >
              {props.tags.map((tag, i) => (
                <TagsText key={i} style={{ marginRight: 8 }}>
                  #{tag.name}
                </TagsText>
              ))}
            </View>
            <View style={{ width: 80, flex: 1 }}>
              <View style={styles.infosContainer}>
                <View style={styles.infos}>
                  <View style={{ width: 20, height: 20, flex: 1 }}>
                    <Image
                      source={require("../../assets/images/greenscore-2.png")}
                      style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                  <SecondaryText style={{ textAlign: "center" }}>
                    {props.greenscore}%
                  </SecondaryText>
                </View>
                <View style={styles.rate}>
                  {props.suggestionRate && (
                    <SuggestionIcon
                      noLeft
                      suggestionRate={props.suggestionRate}
                      color={Colors.secondary}
                    />
                  )}
                </View>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  infosContainer: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    maxWidth: 100,
  },
  infos: {
    flexDirection: "row",
  },
});
