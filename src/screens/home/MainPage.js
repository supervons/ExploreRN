/**
 * Created by supervons on 2019/08/08.
 * User main page
 */
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { trackEvent } from "appcenter-analytics";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import CarouselComponent from "~/components/carousel";
import { INITIAL_PAGE } from "~/redux/action/settingActionTypes";
import { useTabBarStatus } from "~/hook/useTabBarStatus";
import { data } from "./MainPageData";
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
    global.jwtToken = userToken;
    dispatch({
      type: INITIAL_PAGE,
      initialPage: "APP",
    });
    setTimeout(() => {
      setShowItem(true);
    }, 1500);
  }, []);

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
    } else {
      navigation.navigate(routeName);
    }
  }

  /**
   * item render
   * @returns {*}
   */
  function renderFunView() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
        {data.map(res => {
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
                  <Image source={res.image} style={{ height: 48, width: 48 }} />
                  // <Icon
                  //   type="ion-icon"
                  //   size={48}
                  //   name={res.icon}
                  //   color={res.color}
                  // />
                )}
                <Text style={{ color: res.color }}>{res.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  /**
   * Skeleton render
   */
  function renderSkeletonView() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
        {data.map(res => {
          return (
            <View
              key={res.key}
              style={[styles.item, { width: width / 4, height: width / 4 }]}>
              <ShimmerPlaceholder
                shimmerStyle={{ borderRadius: 5, width: 40, height: 40 }}
                visible={false}
              />
              <ShimmerPlaceholder
                shimmerStyle={{ borderRadius: 3, width: 40, marginTop: 5 }}
                visible={false}
              />
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CarouselComponent />
      <ScrollView
        alwaysBounceVertical={false}
        style={{
          backgroundColor: "#ffffff",
        }}>
        {showItem ? renderFunView() : renderSkeletonView()}
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
