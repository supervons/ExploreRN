import React, { Component } from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Theme from "../../../styles/theme";
import { useNavigation } from "@react-navigation/core";

/**
 * Created by supervons on 2019/08/12.
 * 设置页面
 * settings page
 */

export default function Settings() {
  const route = useNavigation();
  const list = [
    {
      key: 1,
      title: "修改密码",
      onPress: () => {
        route.navigate("UpdatePassword");
      },
    },
    {
      key: 2,
      title: "系统信息",
      onPress: () => route.navigate("VersionInfo"),
    },
    {
      key: 3,
      title: "更换皮肤",
      onPress: () => {
        route.navigate("ThemeChange", {
          transitionType: "forFadeToBottomAndroid",
        });
      },
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
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
    </View>
  );
}
