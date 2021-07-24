/**
 * Created by supervons on 2019/08/19.
 * 展示加载 loading, 随机 lottie 动画
 * 在需要界面调用 Loading.show() 来进行显示，Loading.hide() 进行隐藏
 * loading component, random lottie animation.
 * In the required interface call Loading.show () to display, Loading.hide () to hide
 */
import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Theme from "../styles/theme";

const { width, height } = Dimensions.get("window");

let _this = null;

class Loading extends Component {
  constructor(props) {
    super(props);
    _this = this;
    _this.refLottie = null;
    this.state = {
      show: false,
      loadingArray: [
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
      ],
    };
  }

  static show = () => {
    _this.setState({ show: true }, () => {
      setTimeout(() => {
        _this.refLottie.play();
      }, 10);
    });
  };

  static hide = () => {
    _this.setState({ show: false });
  };

  render() {
    const randomNum = (Math.random(100) * 10).toFixed(0) % 10;
    if (this.state.show) {
      return (
        <View style={styles.LoadingPage}>
          <View style={styles.ss}>
            <LottieView
              ref={refLottie => {
                _this.refLottie = refLottie;
              }}
              speed={1}
              source={this.state.loadingArray[randomNum]}
            />
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

export default Loading;
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
  ss: {
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
