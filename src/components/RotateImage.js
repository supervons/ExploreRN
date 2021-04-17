import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { Avatar } from "react-native-elements";
/**
 * @desc RotateImage component
 * @author supervons
 * @date 2021/04/16
 */
export default function RotateImage(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 888,
      useNativeDriver: true,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 888,
      useNativeDriver: true,
    }).start();
  };

  // mapping to convert a 0-1 range to a 0-360 deg'range
  const degNum = fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "180deg", "360deg"], //输出值
  });

  return (
    <Animated.View
      style={[
        {
          alignItems: "center",
          transform: [{ rotateZ: degNum }],
          ...props.style,
        },
      ]}>
      <Avatar
        onPress={fadeIn}
        containerStyle={{ marginTop: 25, marginBottom: 15 }}
        rounded
        size="xlarge"
        source={require("../resource/image/avatar/logo.png")}
      />
    </Animated.View>
  );
}
