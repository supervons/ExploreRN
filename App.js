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

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <RootStack />
      <Loading />
    </View>
  );
};

export default App;
