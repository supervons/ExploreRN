import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
/**
 * @desc AnimatedIcon component
 * @author supervons
 * @date 2021/04/17
 */
export default function AnimatedIcon(props) {
  const animationRef = useRef(null);
  const { selectTabBar, profileInfo } = useSelector(state => ({
    selectTabBar: state?.HookReducer.selectTabBar,
    profileInfo: state?.SettingReducer.profileInfo,
  }));

  const LottieIcons = {
    home: require("../resource/lottie/tab/home.json"),
    explore: require("../resource/lottie/tab/explore.json"),
    person: require("../resource/lottie/tab/my.json"),
  };

  useEffect(() => {
    if (props.iconName === selectTabBar) {
      animationRef.current?.reset();
      animationRef.current?.play();
    }
  }, [selectTabBar]);

  /**
   * Universal Animation View
   * @param transformObject 动画对象
   * @param iconName 图标名称
   */
  function commonAnimatedView(iconName) {
    return (
      <LottieView
        style={{ width: 235, height: 35 }}
        ref={animationRef}
        source={LottieIcons[iconName]}
        loop={false}
      />
    );
  }

  const renderItem = {
    home: commonAnimatedView("home"),
    explore: commonAnimatedView("explore"),
    person: commonAnimatedView("person"),
  };

  return renderItem[props.iconName];
}
