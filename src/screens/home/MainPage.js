/**
 * Created by supervons on 2019/08/08.
 * 用户主界面
 * user main page
 */
import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from "react-native";
import CarouselComponent from "../../components/carousel";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import { INITIAL_PAGE } from "../../redux/action/settingActionTypes";
import { useTabBarStatus } from "../../hook/useTabBarStatus";
import { trackEvent } from "appcenter-analytics";
import ImagePicker from "react-native-image-crop-picker";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get("window");
export default function MainPage() {
  useTabBarStatus("home");
  const [showItem, setShowItem] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo, userToken } = useSelector(state => ({
    userInfo: state.UserReducer.userInfo,
    userToken: state.UserReducer.userToken,
  }));

  /**
   * Save user info and init route page.
   */
  useEffect(() => {
    global.userInfo = userInfo;
    global.userToken = userToken;
    dispatch({
      type: INITIAL_PAGE,
      initialPage: "MainPage",
    });
    setTimeout(() => {
      setShowItem(true);
    }, 1500);
  }, []);

  const demoList = [
    {
      key: "charts",
      icon: "assessment",
      color: "#7A7281",
      name: "Charts",
      routeName: "eChartsDemoPage",
    },
    {
      key: "scanner",
      icon: "camera",
      color: "#7B8B6F",
      name: "Scanner",
      routeName: "Scanner",
    },
    {
      key: "gallery",
      icon: "image",
      color: "#8696A7",
      name: "Gallery",
      routeName: "gallery",
    },
    {
      key: "jdSearch",
      icon: "search",
      color: "#965454",
      name: "JDSearch",
      routeName: "jdSearchDemo",
    },
    {
      key: "skeleton",
      name: "Skeleton",
      color: "#6b5152",
      image: require("../../resource/image/home/seleton.png"),
      routeName: "skeleton",
    },
    {
      key: "morandi",
      name: "Morandi-Colors",
      color: "#7a7281",
      image: require("../../resource/image/home/colors.png"),
      routeName: "morandi",
    },
  ];
  /**
   * 跳转demo页面
   * @param routeName
   */
  function toDemo(routeName) {
    trackEvent(routeName);
    if (routeName === "gallery") {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
      });
    } else if (routeName === "skeleton") {
      setShowItem(false);
      setTimeout(() => {
        setShowItem(true);
      }, 1500);
    }
    navigation.navigate(routeName);
  }

  /**
   * 渲染示例demo
   * @returns {*}
   */
  function renderFunView() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
        {demoList.map(res => {
          return (
            <TouchableOpacity
              onPress={() => {
                toDemo(res.routeName);
              }}
              key={res.key}>
              <View
                style={[styles.item, { width: width / 4, height: width / 4 }]}>
                {res.image ? (
                  <Image source={res.image} style={{ height: 48, width: 48 }} />
                ) : (
                  <Icon
                    type="ion-icon"
                    size={48}
                    name={res.icon}
                    color={res.color}
                  />
                )}
                <Text style={{ color: res.color }}>{res.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View>
      <ScrollView
        alwaysBounceVertical={false}
        style={{
          backgroundColor: "#ffffff",
        }}>
        <CarouselComponent />
        {showItem ? (
          renderFunView()
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}>
            {demoList.map(res => {
              return (
                <View
                  key={res.key}
                  style={[
                    styles.item,
                    { width: width / 4, height: width / 4 },
                  ]}>
                  <ShimmerPlaceholder
                    shimmerStyle={{ width: 40, height: 40 }}
                    visible={false}
                  />
                  <ShimmerPlaceholder
                    shimmerStyle={{ width: 40, marginTop: 5 }}
                    visible={false}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#939391",
  },
});
