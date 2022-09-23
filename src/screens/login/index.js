/**
 * Created by supervons on 2019/08/02.
 * 登录页
 * User login page
 * The password box uses a secure keyboard.
 * After a successful login, Redux stores user information
 */
import React, { useState, useEffect, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { debounce } from "react-native-adaptive-utils";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";
import md5 from "md5";
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

export default function Login(props) {
  const [loginId, setLoginId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [userAvatarUri, setUserAvatarUri] = useState("");
  const [animationFLag, setAnimationFLag] = useState(false);
  const lottieAnimation = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const operationConfig = [
    { key: "ForgetPassword", I18: "Login.ForgetPassword" },
    { key: "Register", I18: "Login.Register" },
  ];

  const { userToken, userInfo } = useSelector(state => ({
    userToken: state.UserReducer.userToken,
    userInfo: state.UserReducer.userInfo,
  }));

  useEffect(() => {
    // 判断 redux-persist 缓存中是否有数据，有则取出直接登录
    if (userToken && userInfo) {
      global.jwtToken = userToken;
      global.userInfo = userInfo;
      props.navigation.replace("APP");
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
      props.navigation.replace("APP");
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
      if (res.data.profile.length !== 0) {
        startAnimation();
        setUserAvatarUri(res.data?.profile[0]?.file_access_path);
      } else {
        lottieAnimation.current.reset();
        setAnimationFLag(false);
        setUserAvatarUri();
      }
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
          value={loginId}
        />
        <TextInput
          keyName={"password"}
          style={styles.userNameStyle}
          keyboardHeader={() => {
            return <Text>{I18n.t("Login.keyboardTitle")}</Text>;
          }}
          secureTextEntry={true}
          random={true}
          valueStyle={{ fontSize: 18, left: 1, marginLeft: 10 }}
          secureTextStyle={{ left: 12, fontSize: 10 }}
          cursorStyle={{ left: 8 }}
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
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <View style={styles.operationView}>
            {operationConfig.map(res => {
              return (
                <TouchableOpacity
                  key={res.key}
                  onPress={() =>
                    res.key === "Register" && navigation.push(res.key)
                  }>
                  <Text style={styles.operationText}>{I18n.t(res.I18)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.push("EmbeddedWebview", {
              titleName: I18n.t("Login.CopyrightTitle"),
              url: "https://github.com/supervons/ExploreRN/blob/master/LICENSE",
            });
          }}>
          <Text style={{ width: 300, marginTop: 5, color: "#3b845a" }}>
            {I18n.t("Login.Copyright")}
          </Text>
        </TouchableOpacity>
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
  operationView: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  operationText: {
    marginTop: 5,
    color: "#4089d6",
    fontWeight: "bold",
  },
});
