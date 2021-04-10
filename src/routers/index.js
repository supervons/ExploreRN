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

const HomeStack = createStackNavigator();
export function HomeStackScreen() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <HomeStack.Screen
          name={"登录"}
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
