/**
 * Created by supervons on 2018/12/20.
 * 登录页
 * user login page
 */
import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import Theme from '../../styles/theme';
import { Button, Input } from 'react-native-elements';

export default class MainPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar backgroundColor={Theme.white} barStyle={'light-content'}/>
                <Input
                    placeholder='用户名'
                />
                <Button
                    title="登录"
                    onPress={()=>this.props.navigation.replace('MainPage')}
                />
            </View>
        );
    }
}
