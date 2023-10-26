/**
 * Created by supervons on 2019/08/14.
 * 发现页面
 * Explore page
 */
import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useTabBarStatus } from "../../hook/useTabBarStatus";
import I18n from "../../common/languages";

export default function Explore(): JSX.Element {
  useTabBarStatus("explore");
  return (
    <View style={styles.container}>
      <View
        style={{
          height: StatusBar.currentHeight,
        }}>
        <Text>{I18n.t("Explore.tips")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB77",
  },
});
