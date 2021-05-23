/**
 * Created by supervons on 2019/08/21.
 * 系统功能介绍界面，可以用做第一次进入系统的首屏
 * System function introduction page, Can be used as the first screen to enter the system for the first time
 *
 * Update by supervons on 2021/04/10
 * Hook update
 *
 * Update by supervons on 2021/05/23
 * Update : Each page displays an animation
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StatusBar } from "react-native";
import Swiper from "../../components/SwiperComponent";
import { Button } from "react-native-elements";
import { FIRST_INSTALL } from "../../redux/action/settingActionTypes";
import * as Animatable from "react-native-animatable";
import commonStyles from "../../styles/commonStyles";

export default function SystemIntroduction(props) {
  const firstInstall = useSelector(state => state.SettingReducer.firstInstall);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const route = new useNavigation();
  const [introductionMap] = useState([
    {
      key: "introduction_1",
      style: commonStyles.slide1,
      title: "本项目包含了大量的 RN 组件",
      enTitle: "This project contains a large number of RN components",
    },
    {
      key: "introduction_2",
      style: commonStyles.slide2,
      title: "源码 github 不断更新",
      enTitle: "Source code github often updated",
    },
    {
      key: "introduction_3",
      style: commonStyles.slide3,
      title: "欢迎你的加入与关注",
      enTitle: "Welcome to join and star",
      component: (
        <Button
          title={"嗯，朕已知晓"}
          style={{ width: 200 }}
          onPress={() => {
            if (firstInstall) {
              dispatch({
                type: FIRST_INSTALL,
                firstInstall: false,
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

  function renderItem(style, title, enTitle, component, key, index) {
    return (
      <View key={key} style={[style, { flex: 1 }]}>
        {currentIndex === index ? (
          <Animatable.View animation="zoomIn">
            <View style={{ margin: 30 }}>
              <Text
                style={[commonStyles.text, { fontSize: 22, marginTop: 25 }]}>
                {title}
              </Text>
              <Text style={commonStyles.text}>{enTitle}</Text>
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
      <StatusBar hidden={true} barStyle={"light-content"} />
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
