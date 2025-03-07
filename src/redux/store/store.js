/**
 * Created by supervons on 2019/08/20.
 * 对 redux 进行配置，增加 redux-persist 对 whitelist 中的数据作缓存（以 reducer 为单位）
 * Configure redux and add redux-persist to cache data in whitelist (in reducer)
 */
import AsyncStorage from "@react-native-community/async-storage";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "../reducer";
const middleWares = [thunk];

const persistConfig = {
  key: "root", // 对于数据 key 的定义
  storage: AsyncStorage, // 选择的存储引擎
  whitelist: ["UserReducer", "SettingReducer", "WatermarkReducer"], // 白名单，位于数组中的会被缓存
};

// 对 reducers 的封装处理
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* global __DEV__
 * 开发环境加入日志输出，redux 中数据改变即输出
 */
if (__DEV__) {
  middleWares.push(logger);
  console.disableYellowBox = true;
  console.ignoredYellowBox = ["Warning: ..."];
}

export default function configureStore() {
  const enhancers = compose(applyMiddleware(...middleWares));

  const store = createStore(persistedReducer, enhancers);

  if (module.hot) {
    const acceptCallback = () => {
      store.replaceReducer(rootReducer);
    };
    module.hot.accept("reducers/index", acceptCallback);
    module.hot.acceptCallback = acceptCallback;
  }

  // 持久化 store
  let persist = persistStore(store, persistedReducer);
  return { store, persist };
}
