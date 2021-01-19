/**
 * Created by supervons on 2019/08/13.
 * 导航配置文件
 * router config file
 */
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import Explore from '../screens/explore/index';
import Login from '../screens/login/index';
import SystemIntroduction from '../screens/systemIntroduction/index';
import { HomeRouter } from './homeRouter';
import { MyRouter } from './myRouter';

/**
 * 自定义动画参数，通过在跳转页面中增加 transitionType: '类型' 来进行动画设置，默认 forHorizontal（从右往左）
 * @param sceneProps
 * @returns {*}
 * @constructor
 */
function TransitionConfiguration(sceneProps) {
  const { scene } = sceneProps;
  const { route } = scene;
  const params = route.params || {};
  const transitionType = params.transitionType;
  if (transitionType && transitionType !== '') {
    return StackViewStyleInterpolator[transitionType];
  } else {
    return StackViewStyleInterpolator.forHorizontal;
  }
}

/**
 * 路由表配置，第一个为启动时页面
 * Routing table configuration, the first one is the startup page
 * @type {NavigationContainer}
 */
const Router = createStackNavigator(
  {
    Login: {
      // 登录界面
      screen: Login
    },
    Explore: {
      // 发现页面
      screen: Explore
    },
    ...HomeRouter,
    ...MyRouter
  },
  {
    // 定义配置
    initialRouteName: 'SystemIntroduction', //设置初始路由为登录界面
    headerMode: 'none',
    transitionConfig: sceneProps => ({
      /**
       * 1、从右向左：  forHorizontal；
       * 2、从下向上：  forVertical；
       * 3、安卓那种的从下向上： forFadeFromBottomAndroid；
       * 4、无动画：  forInitial。
       */
      screenInterpolator: TransitionConfiguration(sceneProps)
    }),
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      // 共享头部属性设置
      headerStyle: {
        backgroundColor: screenProps.themeColor
      },
      headerTintColor: screenProps.titleColor,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    })
  }
);

/**
 * 外层包裹，3.x不允许直接导出路由
 * Outer parcel, 3.x does not allow direct export routing
 * @type {NavigationContainer}
 */
const RootStack = createAppContainer(Router);
module.exports = RootStack;
