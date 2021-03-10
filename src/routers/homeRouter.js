/**
 * @desc The home page route collection
 * @author supervons
 * @date 2021/01/19
 */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import eChartsDemoPage from "../screens/home/eChartsDemo/eChartsDemoPage";

/**
 * 底部导航栏
 * Bottom navigation bar
 * @type {NavigationContainer}
 */
// const Tabs = createMaterialTopTabNavigator(
//   {
//     MainPage: {
//       screen: MainPage,
//       navigationOptions: ({navigation, screenProps}) => ({
//         tabBarLabel: '首页',
//         header: 'none',
//         tabBarIcon: ({focused}) => {
//           return focused ? (
//             <Icon name={'home'} color={screenProps.themeColor} />
//           ) : (
//             <Icon name={'home'} color={Theme.tabUnSelected} />
//           );
//         },
//       }),
//     },
//     News: {
//       screen: Explore,
//       navigationOptions: ({navigation, screenProps}) => ({
//         tabBarLabel: '发现',
//         tabBarIcon: ({focused}) => {
//           return focused ? (
//             <Icon name={'explore'} color={screenProps.themeColor} />
//           ) : (
//             <Icon name={'explore'} color={Theme.tabUnSelected} />
//           );
//         },
//       }),
//     },
//     PersonalCenter: {
//       screen: My,
//       navigationOptions: ({navigation, screenProps}) => ({
//         tabBarLabel: '我的',
//         tabBarIcon: ({focused}) => {
//           return focused ? (
//             <Icon name={'person'} color={screenProps.themeColor} />
//           ) : (
//             <Icon name={'person'} color={Theme.tabUnSelected} />
//           );
//         },
//       }),
//     },
//   },
//   {
//     animationEnabled: false, // 切换页面时是否有动画效果
//     tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
//     swipeEnabled: true, // 是否可以左右滑动切换tab
//     lazy: false,
//     tabBarOptions: {
//       tabStyle: {
//         minWidth: 50,
//         maxHeight: 50,
//       },
//       activeTintColor: '#000000', // 文字和图片选中颜色
//       inactiveTintColor: Theme.tabUnSelected, // 文字和图片未选中颜色
//       pressOpacity: 0.8,
//       showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
//       indicatorStyle: {
//         height: 0, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
//       },
//       style: {
//         backgroundColor: '#fff', // TabBar 背景色
//       },
//       labelStyle: {
//         fontSize: 13,
//         marginTop: 3,
//         marginBottom: 0,
//       },
//     },
//   },
// );

/**
 * @desc The my page route collection
 * @author supervons
 * @date 2021/01/19
 */

import MainPage from "../screens/home/MainPage";
import Explore from "../screens/explore/index";
import My from "../screens/my/index";
import Theme from "../styles/theme";
const HomeStack = createStackNavigator();
/**
 * 底部导航组件配置
 */
const tabBarInfo = [
  {
    name: "MainPage",
    component: MainPage,
    tabBarLabel: "首页",
    selectIcon: <Icon size={30} name={"home"} color={"#7B8B6F"} />,
    defaultIcon: <Icon size={25} name={"home"} color={"#AFB0B2"} />,
  },
  {
    name: "Explore",
    component: Explore,
    tabBarLabel: "发现",
    selectIcon: <Icon size={30} name={"explore"} color={"#7B8B6F"} />,
    defaultIcon: <Icon size={25} name={"explore"} color={"#AFB0B2"} />,
  },
  {
    name: "My",
    component: My,
    tabBarLabel: "我的",
    selectIcon: <Icon size={30} name={"person"} color={"#7B8B6F"} />,
    defaultIcon: <Icon size={25} name={"person"} color={"#AFB0B2"} />,
  },
];
/**
 * 循环渲染tabBar
 */
const Tab = createBottomTabNavigator();
const Main = () => (
  <Tab.Navigator
    initialRouteName={"LoginPage"}
    tabBarOptions={{
      activeTintColor: "#5C8DF6",
    }}>
    {tabBarInfo.map((res) => {
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
    options: { title: "" },
    component: Main,
  },
  {
    name: "Explore",
    options: { title: "探索" },
    component: Explore,
  },
  // {
  //   name: 'My',
  //   options: {title: '门户用搜索'},
  //   component: My,
  // },
  // {
  //   name: 'Theme',
  //   options: {title: '门户用搜索'},
  //   component: Theme,
  // },
  {
    name: "eChartsDemoPage",
    options: { title: "图表示例" },
    component: eChartsDemoPage,
  },
];
const pageViewRouter = [];
routeInfo.map((res) => {
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

exports.default = HomeRouter;
