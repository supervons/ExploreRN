/**
 * Created by supervons on 2019/08/08.
 * 用户主界面
 * user main page
 */
import React, {Component} from 'react';
import {StatusBar, View, Platform} from 'react-native';
import Theme from '../styles/theme';
import Header from '../components/header-component';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: "#ffffff"}}>
                <Header/>
                <StatusBar backgroundColor={Theme.primary} barStyle={'light-content'}/>
            </View>
        );
    }
}
