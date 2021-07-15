import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import Theme from "../../../../styles/theme";
import DeviceInfo from "react-native-device-info";
import Toast from "../../../../components/toast";
import Clipboard from "@react-native-community/clipboard";
import I18n from "../../../../common/languages";

/**
 * Created by supervons on 2019/08/12.
 * 版本信息页面
 * Version info page
 */
const list = [
  {
    key: 0,
    title: I18n.t("SystemInfo.appName"),
    rightTitle: DeviceInfo.getApplicationName(),
  },
  {
    key: 1,
    title: I18n.t("SystemInfo.version"),
    rightTitle: DeviceInfo.getVersion(),
  },
  {
    key: 2,
    title: I18n.t("SystemInfo.author"),
    rightTitle: "supervons",
  },
  {
    key: 3,
    title: I18n.t("SystemInfo.email"),
    rightTitle: "supervons@sina.com",
    onPress: text => {
      Toast.showToast(I18n.t("SystemInfo.copySuc"));
      Clipboard.setString(text);
    },
  },
];

export default function VersionInfo() {
  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      {list.map((item, i) => (
        <ListItem
          bottomDivider
          key={i}
          onPress={() =>
            item.onPress ? item.onPress(item.rightTitle) : console.log("")
          }>
          <ListItem.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ListItem.Title>{item.title}</ListItem.Title>
            </View>
            <ListItem.Subtitle>{item.rightTitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
