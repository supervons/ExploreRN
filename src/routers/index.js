/**
 * Created by supervons on 2019/08/13.
 * 导航配置文件
 * router config file
 */
import React from 'react';
import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import MainPage from '../screens/MainPage';
import Explore from '../screens/Explore/index';
import Login from '../screens/Login/index';
import Settings from '../screens/My/settings/index';
import VersionInfo from '../screens/My/settings/version/index';
import BaseInfo from '../screens/My/baseInfo/index';
import My from '../screens/My/index';
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
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({ focused }) => {
          return focused ? (
            <Icon name={'home'} color={Theme.tabSelected} />
          ) : (
            <Icon name={'home'} color={Theme.tabUnSelected} />
          );
        }
      })
    },
    News: {
      screen: Explore,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '发现',
        tabBarIcon: ({ focused }) => {
          return focused ? (
            <Icon name={'explore'} color={Theme.tabSelected} />
          ) : (
            <Icon name={'explore'} color={Theme.tabUnSelected} />
          );
        }
      })
    },
    PersonalCenter: {
      screen: My,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused }) => {
          return focused ? (
            <Icon name={'person'} color={Theme.tabSelected} />
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
      activeTintColor: Theme.tabSelected, // 文字和图片选中颜色
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
    MainPage: {
      screen: Tabs
    },
    Explore: {
      // 发现页面
      screen: Explore
    },
    My: {
      // 我的页面
      screen: My
    },
    Settings: {
      // 设置页面
      screen: Settings
    },
    VersionInfo: {
      // 版本信息页面
      screen: VersionInfo
    },
    BaseInfo: {
      // 个人基本信息页面
      screen: BaseInfo
    }
  },
  {
    // 定义配置
    initialRouteName: 'Login', //设置初始路由为登录界面
    headerMode: 'screen',
    transitionConfig: sceneProps => ({
      /**
       * 1、从右向左：  forHorizontal；
       * 2、从下向上：  forVertical；
       * 3、安卓那种的从下向上： forFadeFromBottomAndroid；
       * 4、无动画：  forInitial。
       */
      screenInterpolator: TransitionConfiguration(sceneProps)
    }),
    defaultNavigationOptions: {
      //共享头部属性设置
      headerStyle: {
        backgroundColor: Theme.primary
      },
      headerTintColor: Theme.white,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

/**
 * 外层包裹，3.x不允许直接导出路由
 * Outer parcel, 3.x does not allow direct export routing
 * @type {NavigationContainer}
 */
const RootStack = createAppContainer(Router);
module.exports = RootStack;
