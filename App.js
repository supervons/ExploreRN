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
import React, { useEffect } from "react";
import { HomeStackScreen } from "./src/routers/index";
import { SafeAreaView, AppState, StatusBar } from "react-native";
import Loading from "./src/common/loading";
import { Provider } from "react-redux";
import configureStore from "./src/common/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

// 引入 redux 及 redux-persist 配置后的变量供使用
const { store, persist } = configureStore();

export default function App() {
  useEffect(() => {
    // 监听app状态：后台挂起，杀死或者活动
    AppState.addEventListener("change", _handleAppStateChange);
  }, []);
  function _handleAppStateChange(nextAppState) {
    if (nextAppState == "inactive") {
      console.log("挂起");
    } else if (nextAppState == "active") {
      console.log("进入");
    } else {
      console.log("app杀死");
    }
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
        <HomeStackScreen />
        <Loading />
      </PersistGate>
    </Provider>
  );
}
