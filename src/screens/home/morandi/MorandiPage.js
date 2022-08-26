import React from "react";
import {
  ScrollView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Toast from "../../../components/toast";
import Clipboard from "@react-native-community/clipboard";
const { height, width } = Dimensions.get("window");
/**
 * Morandica color scale
 * @author supervons
 * @date 2021/05/05
 */
export default function MorandiPage() {
  function selectColor(res) {
    Toast.showToast(`copied successfully, please paste to use! ${res}`);
    Clipboard.setString(res);
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {colors.map(res => {
          return (
            <TouchableOpacity onPress={() => selectColor(res)} key={res}>
              <View style={styles.container}>
                <View
                  style={{
                    backgroundColor: res,
                    height: height / 8 - 30,
                    width: width / 6,
                  }}
                />
                <Text>{res}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height / 8,
    width: width / 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

const colors = [
  "#c1cbd7",
  "#afb0b2",
  "#939391",
  "#bfbfbf",
  "#e0e5df",
  "#b5c4b1",
  "#8696a7",
  "#9ca8b8",
  "#ececea",
  "#fffaf4",
  "#96a48b",
  "#7b8b6f",
  "#dfd7d7",
  "#656565",
  "#d8caaf",
  "#c5b8a5",
  "#fdf9ee",
  "#f0ebe5",
  "#d3d4cc",
  "#e0cdcf",
  "#b7b1a5",
  "#a29988",
  "#dadad8",
  "#f8ebd8",
  "#965454",
  "#6b5152",
  "#cac3bb",
  "#a6a6a8",
  "#7a7281",
  "#a27e7e",
  "#ead0d1",
  "#faead3",
  "#c7b8a1",
  "#c9c0d3",
  "#eee5f8",
];
