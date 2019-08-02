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
import {StatusBar, SafeAreaView} from 'react-native';
import Theme from './src/styles/theme';

const App = () => {
    return (
        <RootStack>
            <SafeAreaView>
                <StatusBar backgroundColor={Theme.primary} barStyle={'light-content'}/>
            </SafeAreaView>
        </RootStack>
    );
};

export default App;
