/**
 * Created by supervons on 2019/08/13.
 * 导航配置文件
 * router config file
 */
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Login from "../screens/login/index";
import { HomeRouter } from "./homeRouter";
import { MyRouter } from "./myRouter";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HomeStack = createStackNavigator();
export function HomeStackScreen() {
  // Dynamic initial page
  const { initialPage, themeColor } = useSelector(state => ({
    initialPage: state.SettingReducer.initialPage,
    themeColor: state.SettingReducer.themeColor,
  }));

  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName={initialPage}
        screenOptions={{
          headerStyle: {
            backgroundColor: themeColor,
          },
          headerTintColor: "#fff",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <HomeStack.Screen
          name={"Login"}
          options={{ header: () => null }}
          component={Login}
        />
        {HomeRouter}
        {MyRouter}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

exports.default = HomeStackScreen;
