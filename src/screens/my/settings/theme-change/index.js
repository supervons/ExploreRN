import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import { CheckBox, Divider, Button } from "react-native-elements";

import { PROFILE_INFO } from "../../../../redux/action/settingActionTypes";
import { updateProfile } from "../../../../actions/profile";
import Theme from "../../../../styles/theme";
import I18n from "../../../../common/languages";

const colorList = [
  {
    key: 0,
    title: `${I18n.t("Theme.classic")}/#f4511E`,
    value: "#f4511E",
  },
  {
    key: 1,
    title: `${I18n.t("Theme.green")}/#00868B`,
    value: "#00868B",
  },
  {
    key: 2,
    title: `${I18n.t("Theme.red")}/#EE0000`,
    value: "#EE0000",
  },
  {
    key: 3,
    title: `${I18n.t("Theme.blue")}/#63B8FF`,
    value: "#63B8FF",
  },
  {
    key: 4,
    title: `${I18n.t("Theme.black")}/#000000`,
    value: "#000000",
  },
];

/**
 * Created by supervons on 2019/08/20.
 * 皮肤更换页面
 * Skin replacement page
 * Update Hook by supervons on 2021/04/10.
 */
export default function ThemeChange(props) {
  const profileInfo = useSelector(state => state.SettingReducer.profileInfo);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      <Divider style={{ backgroundColor: "black", marginTop: 30 }} />
      {colorList.map(item => (
        <CheckBox
          key={item.key}
          textStyle={{ color: "#ffffff" }}
          checkedColor={"#ffffff"}
          containerStyle={{
            backgroundColor: item.value,
          }}
          title={item.title}
          checked={profileInfo.theme === item.value}
          onPress={() => {
            const tempProfileInfo = { ...profileInfo };
            tempProfileInfo.theme = item.value;
            dispatch({
              type: PROFILE_INFO,
              profileInfo: tempProfileInfo,
            });
            // TODO - update user profile.
            // updateProfile(tempProfileInfo).then(res => {
            //   alert(JSON.stringify(res));
            // });
          }}
        />
      ))}
      <Divider style={{ backgroundColor: "black", marginBottom: 30 }} />
      <Button
        icon={{
          name: "done",
          color: "white",
        }}
        buttonStyle={{
          marginTop: 15,
          backgroundColor: profileInfo.theme,
        }}
        title={I18n.t("Button.ok")}
        onPress={() => props.navigation.pop()}
      />
    </View>
  );
}
