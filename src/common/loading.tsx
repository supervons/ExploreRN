/**
 * Created by supervons on 2019/08/19.
 * Update on 2023/11/07.
 * 展示加载 loading, 随机 lottie 动画
 * 在需要界面调用 Loading.show() 来进行显示，Loading.hide() 进行隐藏
 * loading component, random lottie animation.
 * In the required interface call Loading.show () to display, Loading.hide () to hide
 */
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Theme from "../styles/theme";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");
let dispatch: any; // Global var for show or hide.
export default function Loading(): JSX.Element {
  const [contentView, setContentView] = useState(<View />);
  dispatch = useDispatch();
  const loadingRef = useRef<LottieView>(null);
  const showLoadingFlag = useSelector(
    (state: RootStateOrAny) => state.InteractionReducer.showLoadingFlag,
  );

  // Loading pool.
  const loadingArray = [
    require("../resource/lottie/loading/loading0.json"),
    require("../resource/lottie/loading/loading1.json"),
    require("../resource/lottie/loading/loading2.json"),
    require("../resource/lottie/loading/loading3.json"),
    require("../resource/lottie/loading/loading4.json"),
    require("../resource/lottie/loading/loading5.json"),
    require("../resource/lottie/loading/loading6.json"),
    require("../resource/lottie/loading/loading7.json"),
    require("../resource/lottie/loading/loading8.json"),
    require("../resource/lottie/loading/loading9.json"),
    require("../resource/lottie/loading/loading10.json"),
    require("../resource/lottie/loading/loading11.json"),
  ];

  useEffect(() => {
    if (showLoadingFlag) {
      const randomNum = Math.round((Math.random() * 11) % 12);
      setContentView(
        <View style={styles.LoadingPage}>
          <View style={styles.contentStyle}>
            <LottieView
              style={{ width: 100, height: 100 }}
              ref={loadingRef}
              speed={1}
              source={loadingArray[randomNum]}
            />
          </View>
        </View>,
      );
      setTimeout(() => {
        loadingRef?.current?.play();
      }, 10);
    } else {
      setContentView(<View />);
    }
  }, [showLoadingFlag]);

  return contentView;
}

Loading.show = function () {
  dispatch({
    type: "SHOW_LOADING_FLAG",
    showLoadingFlag: true,
  });
};
Loading.hide = function () {
  dispatch({
    type: "SHOW_LOADING_FLAG",
    showLoadingFlag: false,
  });
};

const styles = StyleSheet.create({
  LoadingPage: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0)",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  contentStyle: {
    width: 80,
    height: 80,
    backgroundColor: Theme.loadingBackgroundColor,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    zIndex: 999,
  },
});
