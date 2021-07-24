import React from "react";
import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

/**
 * @desc Lottie demo page.
 * Usage in https://github.com/lottie-react-native/lottie-react-native.
 * @author supervons
 * @date 2021/07/23
 */
const { width } = Dimensions.get("window");
export default function LottiePage() {
  const lottieAnimations = [
    require("../../../resource/lottie/loading/loading0.json"),
    require("../../../resource/lottie/loading/loading1.json"),
    require("../../../resource/lottie/loading/loading2.json"),
    require("../../../resource/lottie/loading/loading3.json"),
    require("../../../resource/lottie/loading/loading4.json"),
    require("../../../resource/lottie/loading/loading5.json"),
    require("../../../resource/lottie/loading/loading6.json"),
    require("../../../resource/lottie/loading/loading7.json"),
    require("../../../resource/lottie/loading/loading8.json"),
    require("../../../resource/lottie/loading/loading9.json"),
  ];
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {lottieAnimations.map((res, index) => {
          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#999999",
                borderLeftWidth: 0,
                borderTopWidth: 0,
                width: width / 4,
                height: 100,
              }}>
              <LottieView source={res} speed={1} autoPlay loop />
            </View>
          );
        })}
      </View>
      <View style={{ flex: 1 }}>
        <LottieView
          source={require("../../../resource/lottie/fireworks.json")}
          speed={1}
          autoPlay
          loop
        />
      </View>
    </View>
  );
}
