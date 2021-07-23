import md5 from "md5";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SecurityKeyboardInput } from "react-native-supervons-custom-keyboard";
import LottieView from "lottie-react-native";
import { debounce } from "../../utils/commonFun";
import { getProfile } from "../../actions/profile";
import { USER_TOKEN, USER_INFO } from "../../redux/action/userActionTypes";
import Toast from "../../components/toast";
import userAction from "../../actions/user";
import RotateImage from "../../components/RotateImage";
import I18n from "../../common/languages";
// 用户 token
global.jwtToken = "";
// 用户信息
global.userInfo = {};

/**
 * Created by supervons on 2019/08/02.
 * 登录页
 * User login page
 * The password box uses a secure keyboard.
 * After a successful login, Redux stores user information
 */
export default function Login(props) {
  const [loginId, setLoginId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [userAvatarUri, setUserAvatarUri] = useState("");
  const [animationFLag, setAnimationFLag] = useState(false);
  const lottieAnimation = useRef(null);
  const dispatch = useDispatch();

  const { userToken, userInfo } = useSelector(state => ({
    userToken: state.UserReducer.userToken,
    userInfo: state.UserReducer.userInfo,
  }));

  useEffect(() => {
    // 判断 redux-persist 缓存中是否有数据，有则取出直接登录
    if (userToken && userInfo) {
      global.jwtToken = userToken;
      global.userInfo = userInfo;
      props.navigation.replace("MainPage");
    }
    // Global navigation for not in router pages
    global.navigation = props.navigation;
  }, []);

  useEffect(() => {
    if (loginId) {
      debounce(getUserAvatar, 500);
    }
  }, [loginId]);

  function login() {
    if (!loginId || !passWord) {
      Toast.showToast(I18n.t("Login.loginTips"));
      return;
    }
    const params = {
      uId: loginId,
      password: md5(passWord),
    };
    userAction.userLogin(params).then(resp => {
      const token = `Bearer ${resp.token}`;
      dispatch({
        type: USER_TOKEN,
        userToken: token,
      });
      dispatch({
        type: USER_INFO,
        userInfo: resp.userInfo,
      });
      global.jwtToken = token;
      global.userInfo = resp.userInfo;
      props.navigation.replace("MainPage");
    });
  }

  /**
   * Start animation or pause it.
   */
  function startAnimation() {
    if (animationFLag) {
      lottieAnimation.current.pause();
    } else {
      lottieAnimation.current.play();
    }
    setAnimationFLag(!animationFLag);
  }

  /**
   * Use debounce function optimization profile network request.
   */
  function getUserAvatar() {
    getProfile(loginId).then(res => {
      startAnimation();
      setUserAvatarUri(
        res.data.profile[0] && res.data.profile[0].file_access_path,
      );
    });
  }

  return (
    <KeyboardAwareScrollView
      extraHeight={120}
      enableOnAndroid={true}
      enableResetScrollToCoords={true}>
      <View style={styles.container}>
        <RotateImage
          avatarPress={() => startAnimation()}
          avatarUri={userAvatarUri}
          style={{ marginTop: 100 }}
        />
        <TextInput
          style={styles.userNameStyle}
          placeholder={I18n.t("Login.userName")}
          placeholderTextColor={"#B1B1B2"}
          onChangeText={text => setLoginId(text)}
          vauel={loginId}
        />
        <SecurityKeyboardInput
          keyName={"password"}
          keyboardHeader={() => {
            return <Text>{I18n.t("Login.keyboardTitle")}</Text>;
          }}
          style={styles.passwordStyle}
          secureTextEntry={true}
          random={true}
          valueStyle={{ fontSize: 18, left: 1, marginLeft: 10 }}
          secureTextStyle={{ left: 12, fontSize: 10 }}
          cursorStyle={{ left: 8 }}
          keyboardType={"string"}
          placeholder={I18n.t("Login.password")}
          placeholderTextColor={"#B1B1B2"}
          onChangeText={text => setPassWord(text)}
        />
        <Button
          buttonStyle={{ width: 300 }}
          containerStyle={{ marginTop: 30 }}
          title={I18n.t("Login.loginButton")}
          onPress={() => login()}
        />
        <Text style={{ width: 300, marginTop: 5 }}>
          {`©copyright supervons all right reserved`}
        </Text>
        <LottieView
          ref={lottieAnimation}
          style={{ zIndex: -100, position: "absolute" }}
          source={require("../../resource/lottie/fireworks.json")}
          speed={1}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userNameStyle: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop: 10,
    width: 300,
    marginBottom: 15,
    backgroundColor: "#DCDCDC",
    borderRadius: 15,
    height: 45,
  },
  passwordStyle: {
    width: 300,
    backgroundColor: "#DCDCDC",
    borderRadius: 15,
  },
});
