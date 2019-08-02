import React from 'react';
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import MainPage from '../screens/MainPage';
import Login from '../screens/Login/index';

/**
 * 底部导航栏
 * Bottom navigation bar
 * @type {NavigationContainer}
 */
const Tabs = createMaterialTopTabNavigator({
    MainPage: {
        screen: MainPage,
        navigationOptions: ({navigation}) => ({
            title: '首页',
            tabBarLabel: '主页',
        }),
    },
    News: {
        screen: MainPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '新闻',
        }),
    },
    PersonalCenter: {
        screen: MainPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的',
        }),
    },
}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 是否可以左右滑动切换tab
    lazy: true,
    tabBarOptions: {
        tabStyle: {
            minWidth: 50,
            maxHeight: 50,
        },
        activeTintColor: '#0094ed', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        pressOpacity: 0.8,
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 13,
            marginTop: 3,
            marginBottom: 0,
        },
    },
});

/**
 * 路由表配置，第一个为启动时页面
 * Routing table configuration, the first one is the startup page
 * @type {NavigationContainer}
 */
const Router = createStackNavigator({
        Login: { // 登录界面
            screen: Login,
        },
        MainPage: {
            screen: Tabs,
        },
    },
    { // 定义配置
        initialRouteName: 'Login', //设置初始路由为登录界面
        headerMode: 'screen',
        defaultNavigationOptions:{ //共享头部属性设置
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    },
);

/**
 * 外层包裹，3.x不允许直接导出路由
 * Outer parcel, 3.x does not allow direct export routing
 * @type {NavigationContainer}
 */
const RootStack = createAppContainer(Router);
module.exports = RootStack;