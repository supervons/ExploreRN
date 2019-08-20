/**
 * Created by supervons on 2019/08/02.
 * 登录页
 * user login page
 */
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Button, Input, Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Theme from '../../styles/theme';
import userAction from '../../actions/user';
import Toast from '../../components/toast';

// 用户 token
global.jwtToken = '';
// 用户信息
global.userInfo = {};
export default class MainPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loginId: '',
      passWord: ''
    };
  }

  componentDidMount(): void {
    // 忽略警告
    console.disableYellowBox = true;
  }

  login() {
    if (!this.state.loginId || !this.state.passWord) {
      Toast.showToast('请您先完善登录信息！');
      return;
    }
    const params = {
      loginId: this.state.loginId,
      passWord: this.state.passWord
    };
    userAction.userLogin(params).then(resp => {
      jwtToken = resp.auxiliaryData.jwtToken;
      userInfo = resp.data;
      this.props.navigation.replace('MainPage');
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        extraHeight={120}
        enableOnAndroid={true}
        enableResetScrollToCoords={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <StatusBar backgroundColor={Theme.white} barStyle={'light-content'} />
          <Avatar
            containerStyle={{ marginTop: 100 }}
            rounded
            size="xlarge"
            source={require('../../resource/image/avatar/logo.png')}
          />
          <Input
            containerStyle={{ marginTop: 35, margin: 15 }}
            placeholder="用户名"
            onChangeText={text => this.setState({ loginId: text })}
            vauel={this.state.loginId}
          />
          <Input
            containerStyle={{ margin: 15 }}
            secureTextEntry={true}
            placeholder="密码"
            onChangeText={text => this.setState({ passWord: text })}
            vauel={this.state.passWord}
          />
          <Button
            buttonStyle={{ width: 300 }}
            containerStyle={{ marginTop: 30 }}
            title="登录"
            onPress={() => this.login()}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
