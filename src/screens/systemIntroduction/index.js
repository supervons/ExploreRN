/**
 * Created by supervons on 2019/08/21.
 * 系统功能介绍界面，可以用做第一次进入系统的首屏
 * System function introduction page, Can be used as the first screen to enter the system for the first time
 * Each page displays an animation
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StatusBar } from "react-native";
import Swiper from "../../components/SwiperComponent";
import {
  FIRST_INSTALL,
  INITIAL_PAGE,
} from "../../redux/action/settingActionTypes";
import * as Animatable from "react-native-animatable";
import commonStyles from "../../styles/commonStyles";
import Button from "../../common/button";
import I18n from "../../common/languages";
import LottieView from "lottie-react-native";

export default function SystemIntroduction(props) {
  const firstInstall = useSelector(state => state.SettingReducer.firstInstall);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const route = new useNavigation();
  const [introductionMap] = useState([
    {
      key: "introduction_1",
      style: commonStyles.slide1,
      title: I18n.t("SystemIntroduction.introduction_1"),
      animation: require("../../resource/lottie/systemIntroduction/react.json"),
    },
    {
      key: "introduction_2",
      style: commonStyles.slide2,
      title: I18n.t("SystemIntroduction.introduction_2"),
      animation: require("../../resource/lottie/systemIntroduction/github.json"),
    },
    {
      key: "introduction_3",
      style: commonStyles.slide3,
      title: I18n.t("SystemIntroduction.introduction_3"),
      animation: require("../../resource/lottie/systemIntroduction/welcome.json"),
      component: (
        <Button
          title={I18n.t("Button.joke")}
          style={{ width: 200 }}
          onPress={() => {
            if (firstInstall) {
              // If the first installation starts, after clicking confirm.
              // Reset the start page to Login and set the first installation status to false
              dispatch({
                type: FIRST_INSTALL,
                firstInstall: false,
              });
              dispatch({
                type: INITIAL_PAGE,
                initialPage: "Login",
              });
              route.replace("Login");
            } else {
              route.pop();
            }
          }}
        />
      ),
    },
  ]);

  function renderItem(style, title, enTitle, animation, component, key, index) {
    return (
      <View key={key} style={[style, { flex: 1 }]}>
        {currentIndex === index && (
          <LottieView
            speed={1}
            autoPlay
            source={animation}
            style={{
              height: 200,
              position: "absolute",
              margin: "auto",
              bottom: "35%",
            }}
          />
        )}
        {currentIndex === index ? (
          <Animatable.View animation="zoomIn">
            <View style={{ margin: 30 }}>
              <Text
                style={[commonStyles.text, { fontSize: 22, marginTop: 25 }]}>
                {title}
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {component}
            </View>
          </Animatable.View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar barStyle={"light-content"} />
      <View style={{ flex: 1 }}>
        <Swiper
          onMomentumScrollEnd={(index, context) => {
            setCurrentIndex(context.index);
          }}
          loop={false}
          loadMinimal={false}>
          {introductionMap.map((item, i) =>
            renderItem(
              item.style,
              item.title,
              item.enTitle,
              item.animation,
              item.component,
              item.key,
              i,
            ),
          )}
        </Swiper>
      </View>
    </View>
  );
}
