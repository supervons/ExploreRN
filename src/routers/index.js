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
import Register from "../screens/register/index";
import SuccessView from "../screens/common/success/SuccessView";
import { HomeRouter } from "./homeRouter";
import { MyRouter } from "./myRouter";
import { CommonRouter } from "./commonRouter";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HomeStack = createStackNavigator();
export function HomeStackScreen() {
  // Dynamic initial page
  const { initialPage, profileInfo } = useSelector(state => ({
    initialPage: state.SettingReducer.initialPage,
    profileInfo: state.SettingReducer.profileInfo,
  }));

  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName={initialPage}
        screenOptions={{
          headerStyle: {
            backgroundColor: profileInfo?.theme || "#00868B",
          },
          headerTintColor: "#fff",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <HomeStack.Screen
          name={"Login"}
          options={{ header: () => null }}
          component={Login}
        />
        {/*<HomeStack.Screen name={"Register"} component={Register} />*/}
        {/*<HomeStack.Screen*/}
        {/*  name={"SuccessView"}*/}
        {/*  options={{ header: () => null }}*/}
        {/*  component={SuccessView}*/}
        {/*/>*/}
        {/*{HomeRouter}*/}
        {/*{MyRouter}*/}
        {/*{CommonRouter}*/}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

exports.default = HomeStackScreen;
