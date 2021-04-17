/**
 * @desc The home page route collection
 * @author supervons
 * @date 2021/03/10
 */
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import eChartsDemoPage from "../screens/home/eChartsDemo/eChartsDemoPage";
import jdSearchDemo from "../screens/home/jdSearchDemo/jdSearchDemo";

/**
 * @desc The my page route collection
 * @author supervons
 * @date 2021/01/19
 */

import MainPage from "../screens/home/MainPage";
import Explore from "../screens/explore/index";
import My from "../screens/my/index";
import AnimatedIcon from "../components/AnimatedIcon";
const HomeStack = createStackNavigator();
/**
 * 底部导航组件配置
 */
const tabBarInfo = [
  {
    name: "MainPage",
    component: MainPage,
    tabBarLabel: "首页",
    selectIcon: <AnimatedIcon iconName={"home"} />,
    defaultIcon: <Icon size={25} name={"home"} color={"#AFB0B2"} />,
  },
  {
    name: "Explore",
    component: Explore,
    tabBarLabel: "发现",
    selectIcon: <AnimatedIcon iconName={"explore"} />,
    defaultIcon: <Icon size={25} name={"explore"} color={"#AFB0B2"} />,
  },
  {
    name: "My",
    component: My,
    tabBarLabel: "我的",
    selectIcon: <AnimatedIcon iconName={"person"} />,
    defaultIcon: <Icon size={25} name={"person"} color={"#AFB0B2"} />,
  },
];
/**
 * 循环渲染tabBar
 */
const Tab = createBottomTabNavigator();
const Main = () => (
  <Tab.Navigator
    lazy={false}
    tabBarOptions={{
      activeTintColor: "#7B8B6F",
    }}>
    {tabBarInfo.map(res => {
      return (
        <Tab.Screen
          key={res.name}
          name={res.name}
          component={res.component}
          options={{
            tabBarLabel: res.tabBarLabel,
            tabBarIcon: ({ focused }) => {
              return focused ? res.selectIcon : res.defaultIcon;
            },
          }}
        />
      );
    })}
  </Tab.Navigator>
);

/**
 * 总体导航配置
 * 其中，Main为带tabBar的主页面
 */
const routeInfo = [
  {
    name: "MainPage",
    options: {
      title: "",
      header: () => <SafeAreaView style={{ backgroundColor: "#9DD6EB77" }} />,
    },
    component: Main,
  },
  {
    name: "eChartsDemoPage",
    options: { title: "图表示例" },
    component: eChartsDemoPage,
  },
  {
    name: "jdSearchDemo",
    options: {
      title: "仿京东头部搜索",
      header: () => <SafeAreaView style={{ backgroundColor: "red" }} />,
    },
    component: jdSearchDemo,
  },
];
const pageViewRouter = [];
routeInfo.map(res => {
  pageViewRouter.push(
    <HomeStack.Screen
      key={res.name}
      name={res.name}
      component={res.component}
      options={{ ...res.options }}
    />,
  );
});
export const HomeRouter = pageViewRouter;
