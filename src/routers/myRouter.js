import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import My from "../screens/my";
import Settings from "../screens/my/settings";
import VersionInfo from "../screens/my/settings/version";
import ThemeChange from "../screens/my/settings/theme-change";
import BaseInfo from "../screens/my/baseInfo";
import SystemIntroduction from "../screens/systemIntroduction";
import UpdatePassword from "../screens/my/settings/update-password";
import ScannerResult from "../screens/scanner/scannerResult";
import I18n from "../common/languages";

/**
 * @desc The my page route collection
 * @author supervons
 * @date 2021/01/19
 */

const MyStack = createStackNavigator();

/**
 * 总体导航配置
 * 其中，Main为带tabBar的主页面
 */
const routeInfo = [
  {
    name: "My",
    options: { title: "我的页面" },
    component: My,
  },
  {
    name: "Settings",
    options: { title: I18n.t("Route.settings") },
    component: Settings,
  },
  {
    name: "VersionInfo",
    options: { title: I18n.t("Route.systemInfo") },
    component: VersionInfo,
  },
  {
    name: "ThemeChange",
    options: { title: I18n.t("Route.theme") },
    component: ThemeChange,
  },
  {
    name: "BaseInfo",
    options: { title: I18n.t("Route.baseInfo") },
    component: BaseInfo,
  },
  {
    name: "SystemIntroduction",
    options: {
      title: I18n.t("Route.welcome"),
      header: () => (
        // Bug fix: android remain the style of the previous page.
        <View style={{ height: 0.1, backgroundColor: "transparent" }} />
      ),
    },
    component: SystemIntroduction,
  },
  {
    name: "UpdatePassword",
    options: { title: I18n.t("Route.changePassword") },
    component: UpdatePassword,
  },
  // TODO-redesign
  // {
  //   name: "Scanner",
  //   options: { title: I18n.t("Route.scanner"), header: () => null },
  //   component: Scanner,
  // },
  {
    name: "ScannerResult",
    options: { title: "扫描结果" },
    component: ScannerResult,
  },
];
const pageViewRouter = [];
routeInfo.map(res => {
  pageViewRouter.push(
    <MyStack.Screen
      key={res.name}
      name={res.name}
      component={res.component}
      options={{ ...res.options }}
    />,
  );
});

export const MyRouter = pageViewRouter;
