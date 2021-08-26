import React from "react";
import { View, Dimensions } from "react-native";
import Draggable from "react-native-draggable";

/**
 * @desc Draggable demo page.
 * Usage in https://github.com/tongyy/react-native-draggable.
 * @author supervons
 * @date 2021/05/29
 */
const { height } = Dimensions.get("window");
export default function DraggablePage() {
  return (
    <View>
      <Draggable
        x={200}
        y={300}
        animatedViewProps={{ height: height }}
        renderSize={56}
        renderColor="black"
        renderText="A"
        isCircle
        shouldReverse
        onShortPressRelease={() => alert("touched!!")}
      />
    </View>
  );
}
