/**
 * @desc Lottie demo page.
 * Usage in https://github.com/lottie-react-native/lottie-react-native.
 * @author supervons
 * @date 2021/07/23
 */
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import LottieItemView from "./LottieItemView";
import I18n from "../../../common/languages";
const { width } = Dimensions.get("window");
export default function LottiePage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 850);
  }, []);

  /**
   * Skeleton loading view.
   */
  function loadingView() {
    return lottieAnimations.map(res => {
      return (
        <View style={styles.lottieItemStyle}>
          <ShimmerPlaceholder shimmerStyle={{ width: 70, height: 70 }} />
        </View>
      );
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {show
          ? lottieAnimations.map(res => {
              return (
                <LottieItemView
                  source={res}
                  lottieItemStyle={styles.lottieItemStyle}
                />
              );
            })
          : loadingView()}
        {show ? (
          <View style={styles.tipsTextStyle}>
            <Text>{I18n.t("Lottie.tips")}</Text>
          </View>
        ) : null}
      </View>
      <View style={{ flex: 1 }}>
        {show && (
          <LottieView
            source={require("../../../resource/lottie/fireworks.json")}
            speed={1}
            autoPlay
            loop
          />
        )}
      </View>
    </View>
  );
}

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
  require("../../../resource/lottie/loading/loading10.json"),
  require("../../../resource/lottie/loading/loading11.json"),
];

const styles = StyleSheet.create({
  lottieItemStyle: {
    borderWidth: 1,
    borderColor: "#999999",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    width: width / 4,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  tipsTextStyle: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
