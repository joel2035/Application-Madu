import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Items from "./ListRecompense";

import data from "../../utils/data";

export default function Recompense() {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        data={data}
        renderItem={({ item }) => <Items list={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
