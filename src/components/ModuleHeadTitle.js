/**
 * Generic module header.
 */
import React from "react";
import { Text, Dimensions, View, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
export default function ModuleHeadTitle(props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.tipIcon,
          { backgroundColor: props.current ? "red" : "#3c3f41" },
        ]}></View>
      <Text
        style={{
          fontSize: 16,
          color: props.current ? "red" : "#3c3f41",
        }}>
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: width / 2 - 20,
    height: 50,
  },
  tipIcon: {
    height: 45,
    width: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
