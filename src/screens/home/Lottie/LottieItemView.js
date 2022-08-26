/**
 * LottieItemView, use useRef to play or pause.
 */
import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

export default function LottieItemView(props) {
  const [lottieFlag, setLottieFlag] = useState(false);
  const lottieRef = useRef(null);
  useEffect(() => {
    // Simple usage, call pause() or play()
    lottieRef.current[lottieFlag ? `pause` : `play`]();
  }, [lottieFlag]);
  return (
    <TouchableOpacity
      onPress={() => {
        setLottieFlag(tempLottieFlag => !tempLottieFlag);
      }}
      style={props.lottieItemStyle}>
      <LottieView
        ref={lottieRef}
        source={props.source}
        speed={1}
        autoPlay
        loop
      />
    </TouchableOpacity>
  );
}
