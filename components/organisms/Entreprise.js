import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Individuel extends Component {
  render() {
    const entreprise = this.props.ListEntreprise;
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity>
          <View style={styles.contentContainer}>
            <View style={styles.contentIndivue}>
              <Text style={styles.rang}>{entreprise.rang}</Text>
              <Image
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 50,
                  marginLeft: 15,
                }}
                source={{
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                }}
              />
              <Text style={styles.name}>{entreprise.name}</Text>
              <View style={styles.description}>
                <Text style={styles.point}>{entreprise.point}</Text>
                <Image
                  style={styles.icon}
                  source={require("../../assets/images/bio.png")}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    height: 65,
    width: 354,
    borderRadius: 4,
    justifyContent: "center",
    marginTop: 20,
  },
  contentIndivue: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rang: {
    color: "#00DDC0",
    fontSize: 30,
    marginLeft: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 20,
    width: "40%",
  },
  description: {
    width: "30%",
    alignItems: "center",
    flexDirection: "row",
  },
  point: {
    fontSize: 15,
    fontWeight: "500",
  },
  icon: {
    marginBottom: 15,
    width: 30,
    height: 30,
    marginLeft: 2,
  },
});
