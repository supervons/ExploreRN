import React, { Component } from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Theme from "../../../styles/theme";
import { useNavigation } from "@react-navigation/core";
import I18n from "../../../common/languages";

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
      title: I18n.t("Settings.changePassword"),
      onPress: () => {
        route.navigate("UpdatePassword");
      },
    },
    {
      key: 2,
      title: I18n.t("Settings.systemInfo"),
      onPress: () => route.navigate("VersionInfo"),
    },
    {
      key: 3,
      title: I18n.t("Settings.changeTheme"),
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
