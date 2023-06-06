import * as React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "native-base";
import { SimpleText } from "./StyledText";

export const LeavesCount = (props) => {
  const [value, setValue] = React.useState(0);
  const computeLeaves = (rate) => {
    switch (true) {
      case rate <= 20:
        setValue(1);
        break;
      case rate >= 20 && rate <= 40:
        setValue(2);
        break;
      case rate >= 40 && rate <= 60:
        setValue(3);
        break;
      case rate >= 60 && rate <= 80:
        setValue(4);
        break;
      case rate >= 80 && rate <= 100:
        setValue(5);
        break;

      default:
        break;
    }
  };

  React.useEffect(() => {
    computeLeaves(props.rate);
  }, [props.rate]);
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {[1, 2, 3, 4, 5].map((leaf, i) => (
        <Image
          key={i}
          source={
            i >= value
              ? require("../../assets/images/grey_leaf.png")
              : require("../../assets/images/greenscore-2.png")
          }
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "contain",
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: 120,
  },
  contentContainer: {
    justifyContent: "center",
  },
});
