/**
 * @desc The home page route collection
 * @author supervons
 * @date 2021/03/10
 */
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, View, Alert, Image } from "react-native";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EChartsDemoPage from "../screens/home/eChartsDemo/EChartsDemoPage";
import JdSearchDemo from "../screens/home/jdSearchDemo/JdSearchDemo";
import MorandiPage from "../screens/home/morandi/MorandiPage";
import DraggablePage from "../screens/home/drag/DraggablePage";
import LottiePage from "../screens/home/Lottie/index";
import I18n from "../common/languages";

/**
 * @desc The my page route collection
 * @author supervons
 * @date 2021/01/19
 */

import MainPage from "../screens/home/MainPage";
import Explore from "../screens/explore/index";
import My from "../screens/my/index";
import AnimatedLottieIcon from "../components/AnimatedLottieIcon";
const HomeStack = createStackNavigator();
/**
 * 底部导航组件配置
 */
const tabBarInfo = [
  {
    name: "MainPage",
    component: MainPage,
    tabBarLabel: I18n.t("Route.home"),
    selectIcon: <AnimatedLottieIcon iconName={"home"} />,
    defaultIcon: (
      <Image
        style={{ width: 23 }}
        resizeMode={"contain"}
        source={require("../resource/image/tab/home.png")}
      />
    ),
  },
  {
    name: "Explore",
    component: Explore,
    tabBarLabel: I18n.t("Route.explore"),
    selectIcon: <AnimatedLottieIcon iconName={"explore"} />,
    defaultIcon: (
      <Image
        style={{ width: 23 }}
        resizeMode={"contain"}
        source={require("../resource/image/tab/explore.png")}
      />
    ),
  },
  {
    name: "My",
    component: My,
    tabBarLabel: I18n.t("Route.my"),
    selectIcon: <AnimatedLottieIcon iconName={"person"} />,
    defaultIcon: (
      <Image
        style={{ width: 23 }}
        resizeMode={"contain"}
        source={require("../resource/image/tab/my.png")}
      />
    ),
  },
];
/**
 * 循环渲染tabBar
 */
const Tab = createBottomTabNavigator();
const APP = () => (
  <Tab.Navigator
    lazy={false}
    screenOptions={{
      tabBarActiveTintColor: "#333333",
      tabBarStyle: [
        {
          display: "flex",
        },
        null,
      ],
    }}>
    {tabBarInfo.map(res => {
      return (
        <Tab.Screen
          key={res.name}
          name={res.name}
          component={res.component}
          options={{
            header: () => (
              <SafeAreaView style={{ backgroundColor: "#9DD6EB77" }} />
            ),
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

const tips = `"Morandi Colors" is named after the Italian painter George Morandi, a famous Italian oil painter. He has never been married in his life, and people call him a monk painter. (Morandi's color system is sometimes called sexually cold color, and it seems that there is a reason.) His creative style is also very clear, mostly in bottles and cans, and the color system is also very simple.

The simplest understanding of "Morandi color series" is: adding a certain proportion of gray to the color, which is the so-called high-grade gray. High-grade gray is relatively not so individual and can be versatile in many places, so it is widely used.

The color of this color series looks unassuming, not bright, but it has a sense of high-level. This is why everyone calls gray high-grade gray. The Morandi color system seems to have a gray tone, but it is In the whole picture, each other restricts and offsets each other, so that the vision reaches a perfect balance. It gives people a sense of peace, self-sustaining, soothing and elegant, and sometimes a little calm. In short, the more you look at it, the more you like it.`;

/**
 * 总体导航配置
 * 其中，Home为带tabBar的主页面
 */
const routeInfo = [
  {
    name: "APP",
    options: {
      title: "",
      header: () => <SafeAreaView style={{ backgroundColor: "#9DD6EB77" }} />,
    },
    component: APP,
  },
  {
    name: "eChartsDemoPage",
    options: { title: I18n.t("Route.echartsDemo") },
    component: EChartsDemoPage,
  },
  {
    name: "JdSearchDemo",
    options: {
      title: I18n.t("Route.echartsDemo"),
      header: () => <SafeAreaView style={{ backgroundColor: "red" }} />,
    },
    component: JdSearchDemo,
  },
  {
    name: "MorandiPage",
    options: {
      title: I18n.t("Route.morandi"),
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Icon
            name="question"
            type="evilicon"
            color="#ffffff"
            size={35}
            onPress={() =>
              Alert.alert("Morandi Colors", tips, [
                { text: "ok, i know and i like it!" },
              ])
            }
          />
        </View>
      ),
    },
    component: MorandiPage,
  },
  {
    name: "DraggablePage",
    options: {
      title: I18n.t("Route.draggable"),
    },
    component: DraggablePage,
  },
  // TODO-Multiple-Crash-iOS
  {
    name: "LottiePage",
    options: {
      title: I18n.t("Route.lottie"),
    },
    component: LottiePage,
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
