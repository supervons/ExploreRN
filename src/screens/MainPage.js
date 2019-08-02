/**
 * Created by supervons on 2018/12/20.
 * 用户主界面
 * user main page
 */
import React, {Component} from 'react';
import {View} from 'react-native';

export default class MainPage extends Component {

    static navigationOptions = {
        title: '首页',
        gesturesEnabled: false,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{height:300, width: 300, backgroundColor: "#000000"}}>
            </View>
        );
    }
}
