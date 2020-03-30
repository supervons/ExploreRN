/**
 * Created by supervons on 2019/08/02.
 * 登录页
 * user login page
 */
import React, { Component } from 'react';
import { View, StatusBar, Dimensions } from 'react-native';
import { Button, Input, Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Theme from '../../styles/theme';
import userAction from '../../actions/user';
import Toast from '../../components/toast';
import { connect } from 'react-redux';
import { USER_TOKEN, USER_INFO } from '../../common/redux/action/userActionTypes';
import RNSVCustomKeyboard from 'react-native-supervons-custom-keyboard';
// 用户 token
global.jwtToken = '';
// 用户信息
global.userInfo = {};

const width = Dimensions.get('window').width;
class Login extends Component {
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
    // 判断 redux-persist 缓存中是否有数据，有则取出直接登录
    if (this.props.userToken && this.props.userInfo) {
      jwtToken = this.props.userToken;
      userInfo = this.props.userInfo;
      this.props.navigation.replace('MainPage');
    }
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
      this.props.setToken(resp.auxiliaryData.jwtToken);
      this.props.setUserInfo(resp.data);
      jwtToken = resp.auxiliaryData.jwtToken;
      userInfo = resp.data;
      this.props.navigation.replace('MainPage');
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView extraHeight={120} enableOnAndroid={true} enableResetScrollToCoords={true}>
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
          <RNSVCustomKeyboard
            style={{ width: width * 0.96, borderBottomColor: '#939DA6', borderBottomWidth: 1 }}
            secureTextEntry={true}
            random={true}
            valueStyle={{ fontSize: 18, left: 1 }}
            keyboardType={'string'}
            placeholder={'密码'}
            placeholderTextColor={'#CACACB'}
            onChangeText={text => this.setState({ passWord: text })}
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

// 取出 store 中的数据
const mapStateToProps = state => {
  return {
    userToken: state.UserReducer.userToken,
    userInfo: state.UserReducer.userInfo
  };
};

// Dispatch 方法
const mapDispatchToProps = dispatch => {
  return {
    setToken: userToken => {
      dispatch({ type: USER_TOKEN, userToken: userToken });
    },
    setUserInfo: userInfo => {
      dispatch({ type: USER_INFO, userInfo: userInfo });
    }
  };
};

export default (Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
