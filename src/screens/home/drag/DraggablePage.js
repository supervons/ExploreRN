/**
 * @desc Draggable and reanimated demo page.
 * Usage in https://github.com/tongyy/react-native-draggable.
 * @author supervons
 * @date 2021/05/29
 */
import React from "react";
import { View, Dimensions, Button, StyleSheet } from "react-native";
import Draggable from "react-native-draggable";

const { height } = Dimensions.get("window");
export default function DraggablePage() {
  return (
    <View>
      <Draggable
        x={200}
        y={300}
        animatedViewProps={{ height: height }}
        isCircle
        shouldReverse
        onShortPressRelease={() => alert("touched!!")}></Draggable>
    </View>
  );
}

const styles = StyleSheet.create({
  ballStyle: {
    borderRadius: 28,
    height: 56,
    width: 56,
    backgroundColor: "black",
  },
});
