/**
 * @desc The home page route collection
 * @author supervons
 * @date 2021/01/19
 */
import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import MainPage from '../screens/home/MainPage';
import Explore from '../screens/explore/index';
import My from '../screens/my/index';
import Theme from '../styles/theme';
import { Icon } from 'react-native-elements';

/**
 * 底部导航栏
 * Bottom navigation bar
 * @type {NavigationContainer}
 */
const Tabs = createMaterialTopTabNavigator(
  {
    MainPage: {
      screen: MainPage,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarLabel: '首页',
        header: 'none',
        tabBarIcon: ({ focused }) => {
          return focused ? (
            <Icon name={'home'} color={screenProps.themeColor} />
          ) : (
            <Icon name={'home'} color={Theme.tabUnSelected} />
          );
        }
      })
    },
    News: {
      screen: Explore,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarLabel: '发现',
        tabBarIcon: ({ focused }) => {
          return focused ? (
            <Icon name={'explore'} color={screenProps.themeColor} />
          ) : (
            <Icon name={'explore'} color={Theme.tabUnSelected} />
          );
        }
      })
    },
    PersonalCenter: {
      screen: My,
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused }) => {
          return focused ? (
            <Icon name={'person'} color={screenProps.themeColor} />
          ) : (
            <Icon name={'person'} color={Theme.tabUnSelected} />
          );
        }
      })
    }
  },
  {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 是否可以左右滑动切换tab
    lazy: false,
    tabBarOptions: {
      tabStyle: {
        minWidth: 50,
        maxHeight: 50
      },
      activeTintColor: '#000000', // 文字和图片选中颜色
      inactiveTintColor: Theme.tabUnSelected, // 文字和图片未选中颜色
      pressOpacity: 0.8,
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: {
        height: 0 // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      },
      style: {
        backgroundColor: '#fff' // TabBar 背景色
      },
      labelStyle: {
        fontSize: 13,
        marginTop: 3,
        marginBottom: 0
      }
    }
  }
);

export const HomeRouter = {
  MainPage: {
    screen: Tabs
  }
};

exports.default = HomeRouter;
