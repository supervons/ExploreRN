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

import React, { Fragment } from 'react';

// 导航路由表
import RootStack from './src/routers/index';
import { View } from 'react-native';
import Loading from './src/common/loading';
import { Provider } from 'react-redux';
import configureStore from './src/common/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

// 引入 redux 及 redux-persist 配置后的变量供使用
const { store, persist } = configureStore();
const App = () => {
  return (
    // 外层需 Provider 包裹， PersistGate 中的 loading 需为一个组件，否则在启动页后会有短暂黑屏
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <View style={{ flex: 1 }}>
          <RootStack />
          <Loading />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
