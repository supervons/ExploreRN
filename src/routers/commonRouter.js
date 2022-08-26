import { createStackNavigator } from "@react-navigation/stack";
import EmbeddedWebview from "../screens/common/EmbeddedWebview";
import React from "react";

const CommonStack = createStackNavigator();

const routeInfo = [
  {
    name: "EmbeddedWebview",
    component: EmbeddedWebview,
  },
];
const pageViewRouter = [];
routeInfo.map(res => {
  pageViewRouter.push(
    <CommonStack.Screen
      key={res.name}
      name={res.name}
      component={res.component}
      options={({ route }) => ({ title: route.params.titleName })}
    />,
  );
});

export const CommonRouter = pageViewRouter;
