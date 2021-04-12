/**
 * Created by supervons on 2019/08/02.
 * 登录页
 * user login page
 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StatusBar, DeviceEventEmitter } from "react-native";
import { Button, Input, Avatar } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Theme from "../../styles/theme";
import userAction from "../../actions/user";
import Toast from "../../components/toast";
import {
  USER_TOKEN,
  USER_INFO,
} from "../../common/redux/action/userActionTypes";
import { SecurityKeyboardInput } from "react-native-supervons-custom-keyboard";
// 用户 token
global.jwtToken = "";
// 用户信息
global.userInfo = {};

export default function Login(props) {
  const [loginId, setLoginId] = useState("");
  const [passWord, setPassWord] = useState("");
  const dispatch = useDispatch();
  const { themeColor, userToken, userInfo } = useSelector(state => ({
    themeColor: state.SettingReducer.themeColor,
    userToken: state.UserReducer.userToken,
    userInfo: state.UserReducer.userInfo,
  }));
  useEffect(() => {
    // 判断 redux-persist 缓存中是否有数据，有则取出直接登录
    if (userToken && userInfo) {
      global.jwtToken = props.userToken;
      global.userInfo = props.userInfo;
      props.navigation.replace("MainPage");
    }
    // Give the redux themeColor, emit router theme change
    DeviceEventEmitter.emit("theme_change", themeColor);
    // Global navigation for not in router pages
    global.navigation = props.navigation;
  });

  function login() {
    if (!loginId || !passWord) {
      Toast.showToast("请您先完善登录信息！");
      return;
    }
    const params = {
      loginId: loginId,
      passWord: passWord,
    };
    userAction.userLogin(params).then(resp => {
      dispatch({
        type: USER_TOKEN,
        userToken: resp.auxiliaryData.jwtToken,
      });
      dispatch({
        type: USER_INFO,
        userInfo: resp.data,
      });
      global.jwtToken = resp.auxiliaryData.jwtToken;
      global.userInfo = resp.data;
      props.navigation.replace("MainPage");
    });
  }
  return (
    <KeyboardAwareScrollView
      extraHeight={120}
      enableOnAndroid={true}
      enableResetScrollToCoords={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}>
        <StatusBar backgroundColor={Theme.white} barStyle={"dark-content"} />
        <Avatar
          containerStyle={{ marginTop: 100 }}
          rounded
          size="xlarge"
          source={require("../../resource/image/avatar/logo.png")}
        />
        <Input
          containerStyle={{
            width: 300,
            marginBottom: 15,
            backgroundColor: "#DCDCDC",
            borderRadius: 15,
            height: 45,
          }}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          placeholder="用户名"
          onChangeText={text => setLoginId(text)}
          vauel={loginId}
        />
        <SecurityKeyboardInput
          style={{
            width: 300,
            backgroundColor: "#DCDCDC",
            borderRadius: 15,
          }}
          secureTextEntry={true}
          random={true}
          valueStyle={{ fontSize: 18, left: 1, marginLeft: 10 }}
          secureTextStyle={{ left: 12, fontSize: 10 }}
          cursorStyle={{ left: 8 }}
          keyboardType={"string"}
          placeholder={"密码"}
          placeholderTextColor={"#B1B1B2"}
          onChangeText={text => setPassWord(text)}
        />
        <Button
          buttonStyle={{ width: 300 }}
          containerStyle={{ marginTop: 30 }}
          title="登录"
          onPress={() => login()}
        />
        <Text style={{ width: 300, marginTop: 5 }}>
          ©copyright xxx 版权所有
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
