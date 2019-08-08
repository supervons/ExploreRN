/**
 * Created by supervons on 2019/08/02.
 * 登录页
 * user login page
 */
import React, {Component} from 'react';
import {View, StatusBar, YellowBox} from 'react-native';
import Theme from '../../styles/theme';
import { Button, Input, Avatar, Badge } from 'react-native-elements';
import Axios from '../../utils/axios/Axios';
import Toast from '../../components/toast';

export default class MainPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        // 忽略警告
        console.disableYellowBox = true;
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
                    containerStyle={{marginTop:35, margin: 15}}
                    placeholder='用户名'
                />
                <Input
                    containerStyle={{margin: 15}}
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
