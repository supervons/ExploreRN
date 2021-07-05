/**
 * Created by supervons on 2019/08/08.
 * 我的页面
 * my page
 * Update by supervons on 2020/05/22.
 * 使用 Hooks 方式重写，压缩代码量
 * Use Hooks to rewrite and compress the amount of code
 */

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Alert, ScrollView, SafeAreaView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Theme from "../../styles/theme";
import { useDispatch } from "react-redux";
import { USER_TOKEN, USER_INFO } from "../../redux/action/userActionTypes";
import RotateImage from "../../components/RotateImage";
import { INITIAL_PAGE } from "../../redux/action/settingActionTypes";
import { useTabBarStatus } from "../../hook/useTabBarStatus";
import I18n from "../../common/languages";

export default function MyPage() {
  useTabBarStatus("person");
  const route = useNavigation();
  const dispatch = useDispatch();

  const [list] = useState([
    {
      key: 1,
      title: I18n.t("MyPage.baseInfo"),
      icon: "person",
      color: "#058bb3",
      onPress: () => route.navigate("BaseInfo"),
    },
    {
      key: 2,
      title: I18n.t("MyPage.favorite"),
      icon: "favorite",
      color: "#ff616f",
      onPress: () => alert("2"),
    },
    {
      key: 3,
      title: I18n.t("MyPage.systemIntroduction"),
      icon: "invert-colors",
      color: "#36fffb",
      onPress: () => route.navigate("SystemIntroduction", { type: true }),
    },
    {
      key: 4,
      title: I18n.t("MyPage.setting"),
      icon: "settings",
      color: "#36648b",
      onPress: () => route.navigate("Settings"),
    },
    {
      key: 6,
      title: I18n.t("MyPage.logout"),
      icon: "arrow-forward",
      color: "#a2b5cd",
      hiddenRightIcon: true,
      onPress: () =>
        Alert.alert("退出登录", "退出后，下次需要重新登录", [
          {
            text: "取消",
            onPress: () => {},
          },
          {
            text: "确定",
            onPress: () => {
              dispatch({ type: USER_TOKEN, value: "" });
              dispatch({ type: USER_INFO, value: {} });
              dispatch({
                type: INITIAL_PAGE,
                initialPage: "Login",
              });
              route.replace("Login");
            },
          },
        ]),
    },
  ]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      <SafeAreaView style={{ backgroundColor: Theme.commonBackColor }} />
      <RotateImage />
      {list.map((item, i) => (
        <ListItem
          containerStyle={{ alignItems: "center" }}
          onPress={() => item.onPress()}
          key={i}
          bottomDivider>
          <ListItem.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name={item.icon} color={item.color} />
              <ListItem.Title
                style={{
                  marginLeft: 5,
                }}>
                {item.title}
              </ListItem.Title>
            </View>
            <ListItem.Subtitle>
              <Icon
                name={"keyboard-arrow-right"}
                color={item.hiddenRightIcon ? "#ffffff" : "#000000"}
              />
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}
