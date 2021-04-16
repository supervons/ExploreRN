import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import My from "../screens/my";
import Settings from "../screens/my/settings";
import VersionInfo from "../screens/my/settings/version";
import ThemeChange from "../screens/my/settings/theme-change";
import BaseInfo from "../screens/my/baseInfo";
import SystemIntroduction from "../screens/systemIntroduction";
import UpdatePassword from "../screens/my/settings/update-password";
import Scanner from "../screens/scanner/scanner";
import ScannerResult from "../screens/scanner/scannerResult";

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
    options: { title: "设置" },
    component: Settings,
  },
  {
    name: "VersionInfo",
    options: { title: "版本信息" },
    component: VersionInfo,
  },
  {
    name: "ThemeChange",
    options: { title: "换肤" },
    component: ThemeChange,
  },
  {
    name: "BaseInfo",
    options: { title: "基本信息" },
    component: BaseInfo,
  },
  {
    name: "SystemIntroduction",
    options: { title: "欢迎页", header: () => null },
    component: SystemIntroduction,
  },
  {
    name: "UpdatePassword",
    options: { title: "修改密码" },
    component: UpdatePassword,
  },
  {
    name: "Scanner",
    options: { title: "扫一扫" },
    component: Scanner,
  },
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

exports.default = MyRouter;
