import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
/**
 * @desc AnimatedIcon component
 * @author supervons
 * @date 2021/04/17
 */
export default function AnimatedIcon(props) {
  const { selectTabBar } = useSelector(state => ({
    selectTabBar: state.HookReducer.selectTabBar,
  }));
  useEffect(() => {
    if (props.iconName === selectTabBar) {
      fadeIn();
    }
  }, [selectTabBar]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 288,
      useNativeDriver: true,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 288,
      useNativeDriver: true,
    }).start();
  };

  // mapping to convert a 0-1 range to a 0-360 deg'range
  const exploreAnimated = fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "20deg", "40deg"], //输出值
  });

  const homeAnimated = fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.2], //输出值
  });

  const personAnimated = fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -5, 5], //输出值
  });
  const renderItem = {
    home: (
      <Animated.View
        style={[
          {
            alignItems: "center",
            transform: [{ scale: homeAnimated }],
            ...props.style,
          },
        ]}>
        <Icon size={35} name={"home"} color={"#7B8B6F"} />
      </Animated.View>
    ),
    explore: (
      <Animated.View
        style={[
          {
            alignItems: "center",
            transform: [{ rotateZ: exploreAnimated }],
            ...props.style,
          },
        ]}>
        <Icon size={35} name={"explore"} color={"#7B8B6F"} />
      </Animated.View>
    ),
    person: (
      <Animated.View
        style={[
          {
            alignItems: "center",
            transform: [{ translateX: personAnimated }],
            ...props.style,
          },
        ]}>
        <Icon size={35} name={"person"} color={"#7B8B6F"} />
      </Animated.View>
    ),
  };

  return renderItem[props.iconName];
}
