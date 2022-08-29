/**
 * Created by supervons on 2021/11/09.
 * Register page.
 * Use email code register.
 */
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";
import md5 from "md5";
import I18n from "../../common/languages";
// TODO- keyboard upgrade
// import { SecurityKeyboardInput } from "react-native-supervons-custom-keyboard";
import {
  getUniqueTicket,
  sendEmailCode,
  registerByEmailCode,
} from "../../actions/register";
import Toast from "../../components/toast";
import { validEmail } from "../../utils/commonValidFun";

export default function Register() {
  // User register info
  const [registerInfo, setRegisterInfo] = useState({
    uId: "",
    password: "",
    userEmail: "",
    code: "",
  });
  const [canUseId, setCanUseId] = useState("");
  const useNameInputRef = new useRef(null);
  /**
   * uId view, check whether exist.
   * @returns uId view
   */
  function uIdView() {
    return (
      <View style={{ justifyContent: "center" }}>
        <TextInput
          ref={useNameInputRef}
          style={styles.userNameStyle}
          placeholder={I18n.t("Register.userName")}
          placeholderTextColor={"#B1B1B2"}
          onChangeText={uId => setRegisterInfo({ ...registerInfo, uId })}
          onBlur={() => {
            if (registerInfo.uId) {
              getUniqueTicket(registerInfo.uId)
                .then(res => {
                  if (res.code === 0) {
                    setCanUseId(true);
                  }
                })
                .catch(res => {
                  setCanUseId(false);
                });
            } else {
              Toast.showToast(I18n.t("Register.userEmptyToast"));
            }
          }}
        />
        {canUseId !== "" ? (
          <View
            style={[styles.successLottieStyle, { height: canUseId ? 50 : 40 }]}>
            <View
              style={{ width: canUseId ? 45 : 35, height: canUseId ? 45 : 35 }}>
              <LottieView
                source={
                  canUseId
                    ? require("../../resource/lottie/register/ok.json")
                    : require("../../resource/lottie/register/error.json")
                }
                speed={1}
                autoPlay
                loop={false}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  function emailView() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: 300,
          justifyContent: "space-between",
        }}>
        <View>
          <TextInput
            style={styles.emailStyle}
            placeholder={I18n.t("Register.email")}
            placeholderTextColor={"#B1B1B2"}
            onChangeText={userEmail => {
              if (validEmail(userEmail)) {
                setRegisterInfo({ ...registerInfo, userEmail });
              } else {
                setRegisterInfo({ ...registerInfo, userEmail: "" });
              }
            }}
            onBlur={() => {
              if (!validEmail(registerInfo.userEmail)) {
                Toast.showToast("Email check failed!");
              }
            }}
          />
          <TextInput
            style={styles.emailStyle}
            placeholder={I18n.t("Register.emailCode")}
            placeholderTextColor={"#B1B1B2"}
            onChangeText={code => setRegisterInfo({ ...registerInfo, code })}
          />
        </View>
        <Button
          onPress={() => sendEmail()}
          disabled={
            !registerInfo.uId ||
            !registerInfo.password ||
            !registerInfo.userEmail
          }
          buttonStyle={{ width: 80, height: 95 }}
          containerStyle={{ marginTop: 10 }}
          title={I18n.t("Register.send")}
        />
      </View>
    );
  }

  function sendEmail() {
    sendEmailCode({
      uId: registerInfo.uId,
      email: registerInfo.userEmail,
    }).then(res => {
      Toast.showToast("Send success!");
    });
  }

  function register() {
    registerByEmailCode(registerInfo).then(res => {
      navigation.push("SuccessView");
    });
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ height: 100, width: 300, zIndex: 99, marginBottom: -14 }}>
        <LottieView
          source={require("../../resource/lottie/register/octopus.json")}
          speed={1}
          autoPlay
        />
      </View>
      {uIdView()}
      <TextInput
        onFocus={() => useNameInputRef.current.blur()}
        keyName={"registerPassword"}
        keyboardHeader={() => {
          return <Text>{I18n.t("Login.keyboardTitle")}</Text>;
        }}
        // style={styles.passwordStyle}
        style={styles.userNameStyle}
        secureTextEntry={true}
        random={true}
        valueStyle={{ fontSize: 18, left: 1, marginLeft: 10 }}
        secureTextStyle={{ left: 12, fontSize: 10 }}
        cursorStyle={{ left: 8 }}
        // keyboardType={"string"}
        placeholder={I18n.t("Register.password")}
        placeholderTextColor={"#B1B1B2"}
        onChangeText={password => {
          setRegisterInfo({ ...registerInfo, password: md5(password) });
        }}
      />
      {emailView()}
      <Button
        onPress={() => register()}
        disabled={
          !registerInfo.uId ||
          !registerInfo.password ||
          !registerInfo.userEmail ||
          !registerInfo.code
        }
        buttonStyle={{ width: 300 }}
        containerStyle={{ marginTop: 10 }}
        title={I18n.t("Register.registerButton")}
      />
    </View>
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
  emailStyle: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop: 10,
    width: 200,
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
  successLottieStyle: {
    position: "absolute",
    right: 0,
    width: 50,
  },
});
