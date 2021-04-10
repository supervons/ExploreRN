import React, { Component } from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Theme from "../../../styles/theme";

/**
 * Created by supervons on 2019/08/12.
 * 设置页面
 * settings page
 */
const list = [
  {
    key: 1,
    title: "修改密码",
    onPress: (navigation) => {
      navigation.push("UpdatePassword");
    },
  },
  {
    key: 2,
    title: "系统信息",
    onPress: (navigation) => navigation.push("VersionInfo"),
  },
  {
    key: 3,
    title: "更换皮肤",
    onPress: (navigation) => {
      navigation.push("ThemeChange", {
        transitionType: "forFadeToBottomAndroid",
      });
    },
  },
];

export default function Settings() {
  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      {list.map((item, i) => (
        <ListItem
          containerStyle={{ alignItems: "center" }}
          onPress={() => item.onPress(this.props.navigation)}
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
