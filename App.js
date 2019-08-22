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

import React, { Component } from 'react';

// 导航路由表
import RootStack from './src/routers/index';
import { View, DeviceEventEmitter } from 'react-native';
import Loading from './src/common/loading';
import { Provider } from 'react-redux';
import configureStore from './src/common/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

// 引入 redux 及 redux-persist 配置后的变量供使用
const { store, persist } = configureStore();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#f4511E'
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('theme_change', params => {
      this.setState({
        color: params
      });
    });
  }

  render(): * {
    return (
      // 外层需 Provider 包裹， PersistGate 中的 loading 需为一个组件，否则在启动页后会有短暂黑屏
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <View style={{ flex: 1 }}>
            <RootStack
              screenProps={{
                themeColor: this.state.color,
                titleColor: '#ffffff'
              }}
            />
            <Loading />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
