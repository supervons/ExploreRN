import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StatusBar } from "react-native";
import Swiper from "../../components/SwiperComponent";
import { Button } from "react-native-elements";
import { FIRST_INSTALL } from "../../common/redux/action/settingActionTypes";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import commonStyles from "../../styles/commonStyles";

/**
 * Created by supervons on 2019/08/21.
 * 系统功能介绍界面，可以用做第一次进入系统的首屏
 * System function introduction page, Can be used as the first screen to enter the system for the first time
 *
 * Update by supervons on 2021/04/10
 * Hook update
 */
export default function SystemIntroduction(props) {
  const firstInstall = useSelector(state => state.SettingReducer.firstInstall);
  const dispatch = useDispatch();
  const route = new useNavigation();
  const [introductionMap] = useState([
    {
      style: commonStyles.slide1,
      title: "本项目包含了大量的 RN 组件",
      enTitle: "This project contains a large number of RN components",
    },
    {
      style: commonStyles.slide2,
      title: "源码 github 不断更新",
      enTitle: "Source code github often updated",
    },
    {
      style: commonStyles.slide3,
      title: "欢迎你的加入与关注",
      enTitle: "Welcome to join and star",
      component: (
        <Button
          title={"嗯，朕已知晓"}
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

  function renderItem(style, title, enTitle, component) {
    return (
      <View style={[style, { flex: 1 }]}>
        <Animatable.View animation="zoomInUp">
          <View style={{ margin: 30 }}>
            <Text style={[commonStyles.text, { fontSize: 22, marginTop: 25 }]}>
              {title}
            </Text>
            <Text style={commonStyles.text}>{enTitle}</Text>
          </View>
        </Animatable.View>
        {component}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar hidden={true} barStyle={"light-content"} />
      <View style={{ flex: 1 }}>
        <Swiper loop={false} loadMinimal={false}>
          {introductionMap.map((item, i) =>
            renderItem(item.style, item.title, item.enTitle, item.component),
          )}
        </Swiper>
      </View>
    </View>
  );
}
