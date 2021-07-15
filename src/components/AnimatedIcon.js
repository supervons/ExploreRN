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
  const { selectTabBar, profileInfo } = useSelector(state => ({
    selectTabBar: state.HookReducer.selectTabBar,
    profileInfo: state.SettingReducer.profileInfo,
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

  /**
   * Universal Animation Rendering
   * @param outputRange 输出值
   */
  function animatedInterpolate(outputRange) {
    return fadeAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: outputRange,
    });
  }

  /**
   * Universal Animation View
   * @param transformObject 动画对象
   * @param iconName 图标名称
   */
  function commonAnimatedView(transformObject, iconName) {
    return (
      <Animated.View
        style={[
          {
            alignItems: "center",
            transform: [transformObject],
            ...props.style,
          },
        ]}>
        <Icon size={35} name={iconName} color={profileInfo.theme} />
      </Animated.View>
    );
  }

  const renderItem = {
    home: commonAnimatedView(
      { scale: animatedInterpolate([1, 1.1, 1.2]) },
      "home",
    ),
    explore: commonAnimatedView(
      { rotateZ: animatedInterpolate(["0deg", "20deg", "40deg"]) },
      "explore",
    ),
    person: commonAnimatedView(
      { translateX: animatedInterpolate([0, -5, 5]) },
      "person",
    ),
  };

  return renderItem[props.iconName];
}
