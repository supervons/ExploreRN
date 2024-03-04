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
        <View key={res.key} style={styles.lottieItemStyle}>
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
                  key={res.key}
                  source={res.json}
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
            style={{ width: 400, height: 400 }}
            source={require("../../../resource/lottie/fireworks.json")}
            speed={1}
            autoPlay
          />
        )}
      </View>
    </View>
  );
}

const lottieAnimations = [
  {
    json: require("../../../resource/lottie/loading/loading0.json"),
    key: "l0",
  },
  {
    json: require("../../../resource/lottie/loading/loading1.json"),
    key: "l1",
  },
  {
    json: require("../../../resource/lottie/loading/loading2.json"),
    key: "l2",
  },
  {
    json: require("../../../resource/lottie/loading/loading3.json"),
    key: "l3",
  },
  {
    json: require("../../../resource/lottie/loading/loading4.json"),
    key: "l4",
  },
  {
    json: require("../../../resource/lottie/loading/loading5.json"),
    key: "l5",
  },
  {
    json: require("../../../resource/lottie/loading/loading6.json"),
    key: "l6",
  },
  {
    json: require("../../../resource/lottie/loading/loading7.json"),
    key: "l7",
  },
  {
    json: require("../../../resource/lottie/loading/loading8.json"),
    key: "l8",
  },
  {
    json: require("../../../resource/lottie/loading/loading9.json"),
    key: "l9",
  },
  {
    json: require("../../../resource/lottie/loading/loading10.json"),
    key: "l10",
  },
  {
    json: require("../../../resource/lottie/loading/loading11.json"),
    key: "l11",
  },
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
