/**
 * Created by supervons on 2019/08/12.
 * Settings page
 */
import React from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import Theme from "../../../styles/theme";
import I18n from "../../../common/languages";

export default function Settings() {
  const route = useNavigation();
  const list = [
    {
      key: 1,
      title: I18n.t("Settings.changePassword"),
      routeName: "UpdatePassword",
    },
    {
      key: 2,
      title: I18n.t("Settings.systemInfo"),
      routeName: "VersionInfo",
    },
    {
      key: 3,
      title: I18n.t("Settings.changeTheme"),
      routeName: "ThemeChange",
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      {list.map((item, i) => (
        <ListItem
          containerStyle={{ alignItems: "center" }}
          onPress={() => route.navigate(item.routeName)}
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
