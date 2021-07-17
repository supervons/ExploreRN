import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  DeviceEventEmitter,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { USER_TOKEN, USER_INFO } from "../../redux/action/userActionTypes";
import { PROFILE_INFO } from "../../redux/action/settingActionTypes";
import { INITIAL_PAGE } from "../../redux/action/settingActionTypes";
import { useTabBarStatus } from "../../hook/useTabBarStatus";
import { getProfile } from "../../actions/profile";
import I18n from "../../common/languages";
import Theme from "../../styles/theme";
import RotateImage from "../../components/RotateImage";

/**
 * My Page
 * 使用 Hooks 方式重写，压缩代码量
 * 需注意在此页面获取用户头像、签名及主题色信息并存入redux.
 * 因为底部导航不是懒加载，故可以在此页面监听token是否过期监听.
 * Use Hooks to rewrite and compress the amount of code
 * Because the bottom navigation is not lazy to load, you can listen on this page
 */
export default function MyPage() {
  useTabBarStatus("person");
  const route = useNavigation();
  const dispatch = useDispatch();
  const [userAvatarUri, setUserAvatarUri] = useState("");
  const userInfo = useSelector(state => state.UserReducer.userInfo);

  const [list] = useState([
    {
      key: 1,
      title: I18n.t("MyPage.baseInfo"),
      icon: "person",
      color: "#058bb3",
      onPress: () => route.navigate("BaseInfo"),
    },
    {
      key: 2,
      title: I18n.t("MyPage.favorite"),
      icon: "favorite",
      color: "#ff616f",
      onPress: () => alert("2"),
    },
    {
      key: 3,
      title: I18n.t("MyPage.systemIntroduction"),
      icon: "invert-colors",
      color: "#36fffb",
      onPress: () => route.navigate("SystemIntroduction", { type: true }),
    },
    {
      key: 4,
      title: I18n.t("MyPage.setting"),
      icon: "settings",
      color: "#36648b",
      onPress: () => route.navigate("Settings"),
    },
    {
      key: 6,
      title: I18n.t("MyPage.logout"),
      icon: "arrow-forward",
      color: "#a2b5cd",
      hiddenRightIcon: true,
      onPress: () =>
        Alert.alert("退出登录", "退出后，下次需要重新登录", [
          {
            text: "取消",
            onPress: () => {},
          },
          {
            text: "确定",
            onPress: () => {
              logout();
            },
          },
        ]),
    },
  ]);

  useEffect(() => {
    getProfile(userInfo.uId).then(res => {
      const { profile } = res.data;
      dispatch({
        type: PROFILE_INFO,
        profileInfo: profile && profile[0],
      });
      setUserAvatarUri(profile[0] && profile[0].file_access_path);
    });
    // Add listener to monitor whether tokens are expired
    const subscribeLogout = DeviceEventEmitter.addListener(
      "LOGOUT_ACTION",
      () => {
        logout();
      },
    );
    return function cleanup() {
      subscribeLogout.remove();
    };
  }, []);

  function logout() {
    dispatch({ type: USER_TOKEN, value: "" });
    dispatch({ type: USER_INFO, value: {} });
    dispatch({
      type: INITIAL_PAGE,
      initialPage: "Login",
    });
    route.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
      <SafeAreaView style={{ backgroundColor: Theme.commonBackColor }} />
      <RotateImage avatarUri={userAvatarUri} />
      {list.map((item, i) => (
        <ListItem
          containerStyle={{ alignItems: "center" }}
          onPress={() => item.onPress()}
          key={i}
          bottomDivider>
          <ListItem.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name={item.icon} color={item.color} />
              <ListItem.Title
                style={{
                  marginLeft: 5,
                }}>
                {item.title}
              </ListItem.Title>
            </View>
            <ListItem.Subtitle>
              <Icon
                name={"keyboard-arrow-right"}
                color={item.hiddenRightIcon ? "#ffffff" : "#000000"}
              />
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}
