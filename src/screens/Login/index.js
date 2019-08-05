/**
 * Created by supervons on 2019/08/02.
 * 登录页
 * user login page
 */
import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import Theme from '../../styles/theme';
import { Button, Input, Avatar, Badge } from 'react-native-elements';
import Axios from '../../utils/axios/Axios';

export default class MainPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        const params = {loginId: '', passWord: ''};
        Axios.POST('/user/loginAction', params).then(resp => {
            // alert(JSON.stringify(resp));
        }).catch(resp =>{
            // alert(resp)
        });
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
