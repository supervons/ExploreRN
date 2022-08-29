import { Button as RNEButton } from "react-native-elements";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Unified button base on react-native-elements button.
 * Unify colors and styles.
 */
export default function Button(props) {
  const profileInfo = useSelector(state => state.SettingReducer.profileInfo);
  return (
    <RNEButton
      {...props}
      icon={{
        //TODO -icon
        // name: "done",
        color: "white",
        ...props.icon,
      }}
      buttonStyle={{
        backgroundColor: profileInfo?.theme || "#00868B",
        marginHorizontal: 15,
        ...props.buttonStyle,
      }}
    />
  );
}
