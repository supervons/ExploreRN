/**
 * Created by supervons 2019/08/02
 *
 * App 入口文件
 * App entry file
 *
 * https://github.com/supervons/ExploreRN
 *
 * @format
 * @flow
 */
import * as Sentry from "@sentry/react-native";
import React, { useEffect } from "react";
import { BackHandler, Platform, StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import I18n from "~/common/languages";
import Loading from "~/common/loading";
import Toast from "~/components/toast";
import Watermark from "~/components/Watermark";
import configureStore from "~/redux/store/store";
import { HomeStackScreen } from "~/routers/index";
Sentry.init({
  dsn: "https://your@your.ingest.us.sentry.io/0000", // replace your sentry DSN.
});
Sentry.setUser({ name: "test_user" });
// 引入 redux 及 redux-persist 配置后的变量供使用

import { accelerometer } from "react-native-sensors";

const subscriber = accelerometer.subscribe(
  ({ x, y, z, timestamp }) => {
    // console.log(timestamp);
  },
  err => {
    // console.log(err);
  },
);
const { store, persist } = configureStore();

const APP = function () {
  let lastBackPressed = 0;
  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onBackAndroid);
    }
  }, []);

  function onBackAndroid() {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      BackHandler.exitApp();
      return;
    }
    lastBackPressed = Date.now();
    Toast.showToast(I18n.t("exitApp"), "SHORT", "BOTTOM");
    return true;
  }

  return (
    // 外层需 Provider 包裹， PersistGate 中的 loading 需为一个组件，否则在启动页后会有短暂黑屏
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <StatusBar
          animated={false}
          backgroundColor={"transparent"}
          translucent={true}
          barStyle={"dark-content"}
        />
        <RootSiblingParent>
          <HomeStackScreen />
        </RootSiblingParent>
        <Watermark />
        <Loading />
      </PersistGate>
    </Provider>
  );
};
export default APP;
