import React from "react";
import { View, Dimensions, Button, StyleSheet } from "react-native";
import Draggable from "react-native-draggable";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

/**
 * @desc Draggable and reanimated demo page.
 * Usage in https://github.com/tongyy/react-native-draggable.
 * @author supervons
 * @date 2021/05/29
 */
const { height } = Dimensions.get("window");
export default function DraggablePage() {
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });
  return (
    <View>
      <Draggable
        x={200}
        y={300}
        animatedViewProps={{ height: height }}
        isCircle
        shouldReverse
        onShortPressRelease={() => alert("touched!!")}>
        <Animated.View style={[styles.ballStyle, animatedStyles]} />
      </Draggable>
      <Button
        title={"Move The Ball"}
        onPress={() => {
          offset.value = withSpring(Math.random());
        }}
      />
      <Button
        title={"Reset The Ball"}
        onPress={() => {
          offset.value = withSpring(0);
        }}
      />
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
