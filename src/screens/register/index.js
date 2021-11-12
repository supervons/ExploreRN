/**
 * Created by supervons on 2021/11/09.
 * Register page.
 * Use email code register.
 */
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";
import I18n from "../../common/languages";
import { SecurityKeyboardInput } from "react-native-supervons-custom-keyboard";
import {
  checkUserById,
  sendEmailCode,
  registerByEmailCode,
} from "../../actions/register";
import Toast from "../../components/toast";

export default function Register(props) {
  // User register info
  const [registerInfo, setRegisterInfo] = useState({
    uId: "",
    password: "",
    userEmail: "",
    code: "",
  });
  const [canUseId, setCanUseId] = useState(false);

  /**
   * uId view, check whether exist.
   * @returns uId view
   */
  function uIdView() {
    return (
      <View style={{ justifyContent: "center" }}>
        <TextInput
          style={styles.userNameStyle}
          placeholder={I18n.t("Register.userName")}
          placeholderTextColor={"#B1B1B2"}
          onChangeText={uId => setRegisterInfo({ ...registerInfo, uId })}
          onBlur={() => {
            if (registerInfo.uId) {
              checkUserById(registerInfo.uId)
                .then(res => {
                  setCanUseId(true);
                })
                .catch(res => {
                  setCanUseId(false);
                });
            } else {
              Toast.showToast(I18n.t("Register.userEmptyToast"));
            }
          }}
        />
        {canUseId && (
          <View style={styles.successLottieStyle}>
            <View style={{ width: 45, height: 45 }}>
              <LottieView
                source={require("./ok.json")}
                speed={2}
                autoPlay
                loop={false}
              />
            </View>
          </View>
        )}
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
            onChangeText={userEmail =>
              setRegisterInfo({ ...registerInfo, userEmail })
            }
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
        <LottieView source={require("./octopus.json")} speed={1} autoPlay />
      </View>
      {uIdView()}
      <SecurityKeyboardInput
        keyName={"registerPassword"}
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
        placeholder={I18n.t("Register.password")}
        placeholderTextColor={"#B1B1B2"}
        onChangeText={password =>
          setRegisterInfo({ ...registerInfo, password })
        }
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
    height: 50,
  },
});
