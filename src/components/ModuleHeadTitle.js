/**
 * Generic module header.
 */
import React from "react";
import { Text, View, StyleSheet } from "react-native";
export default function ModuleHeadTitle(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.tipIcon, { height: props.tipIconHeight }]} />
      <Text>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
  },
  tipIcon: {
    height: 15,
    width: 5,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 5,
  },
});
