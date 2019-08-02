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

import React, {Fragment} from 'react';

// 导航路由表
import RootStack from './src/routers/index';
import {StatusBar} from 'react-native';

const App = () => {
    return (
        <RootStack>
            <StatusBar backgroundColor={"#f4511e"} barStyle={"light-content"}/>
        </RootStack>
    );
};

export default App;
