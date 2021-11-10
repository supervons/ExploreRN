import React, { useEffect } from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Button } from "react-native-elements";
import I18n from "../../../common/languages";

export default function SuccessView(props) {
  useEffect(() => {});
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 300 }}>
        <LottieView
          source={require("./success.json")}
          speed={1}
          autoPlay
          loop={false}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>{props.route.params?.successTitle || "Success！"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 30,
        }}>
        <Button
          onPress={() => {
            navigation.popToTop();
          }}
          buttonStyle={{ width: 150, backgroundColor: "#b9b9b9" }}
          containerStyle={{ marginTop: 10 }}
          title={"返回"}
        />
        <Button
          buttonStyle={{ width: 150 }}
          containerStyle={{ marginTop: 10 }}
          title={"立即体验"}
        />
      </View>
    </View>
  );
}
