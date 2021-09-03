import React from "react";
import { View, Dimensions, Button } from "react-native";
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
      <Animated.View style={[animatedStyles]}>
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
      </Animated.View>
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
