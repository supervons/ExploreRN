/**
 * Created by supervons on 2019/08/14.
 * 发现页面
 * explore page
 */
import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, StatusBar } from "react-native";
import newsAction from "../../actions/news";
import { useTabBarStatus } from "../../hook/useTabBarStatus";

export default function Explore() {
  useTabBarStatus("explore");
  useEffect(() => {
    const params = { pageNo: 1, itemNo: 2 };
    newsAction.getNewsList(params).then(resp => {
      console.log(JSON.stringify(resp));
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB77",
      }}>
      <View
        style={{
          height: StatusBar.currentHeight,
        }}>
        <Text>{`To be continued...`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
