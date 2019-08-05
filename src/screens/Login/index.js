/**
 * Created by supervons on 2018/12/20.
 * 登录页
 * user login page
 */
import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import Theme from '../../styles/theme';
import { Button, Input, Avatar, Badge } from 'react-native-elements';

export default class MainPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <StatusBar backgroundColor={Theme.white} barStyle={'light-content'}/>
                <Avatar
                    containerStyle={{marginTop: 100}}
                    rounded
                    size="xlarge"
                    source={require('../../resource/image/avatar/logo.png')}
                />
                <Input
                    placeholder='用户名'
                />
                <Input
                    secureTextEntry={true}
                    placeholder='密码'
                />
                <Button
                    buttonStyle={{width: 300}}
                    containerStyle={{ marginTop: 30}}
                    title="登录"
                    onPress={()=>this.props.navigation.replace('MainPage')}
                />
            </View>
        );
    }
}
