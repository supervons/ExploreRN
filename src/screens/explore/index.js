/**
 * Created by supervons on 2019/08/14.
 * 发现页面
 * explore page
 */
import React, { useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
  StatusBar,
} from "react-native";
import newsAction from "../../actions/news";
import ScrollableTabView from "../../components/SwiperComponent";
import TabBarView from "./component/TabBarView";

export default function Explore() {
  useEffect(() => {
    const params = { pageNo: 1, itemNo: 2 };
    newsAction.getNewsList(params).then(resp => {
      console.log(JSON.stringify(resp));
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          height: StatusBar.currentHeight,
        }}
      />
      <ScrollableTabView
        tabBarActiveTextColor={"#ffffff"}
        tabBarInactiveTextColor={"#D3D3D3"}
        prerenderingSiblingsNumber={1}
        tabBarUnderlineStyle={{
          backgroundColor: "#ffffff",
        }}
        renderTabBar={res => <TabBarView />}>
        <ScrollView
          alwaysBounceVertical={false}
          key={"news"}
          style={{
            backgroundColor: "#9DD6EB",
          }}
          tabLabel="新闻">
          <Text style={styles.text}>新闻</Text>
        </ScrollView>
        <ScrollView
          style={{
            backgroundColor: "#9DD6EB",
          }}
          tabLabel="比赛">
          <Text style={styles.text}>比赛</Text>
        </ScrollView>
        <ScrollView
          style={{
            backgroundColor: "#9DD6EB",
          }}
          tabLabel="活动">
          <Text style={styles.text}>活动</Text>
        </ScrollView>
        <ScrollView
          style={{
            backgroundColor: "#9DD6EB",
          }}
          tabLabel="其他">
          <Text style={styles.text}>其他</Text>
        </ScrollView>
      </ScrollableTabView>
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
