import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { Icon } from "react-native-elements";

/**
 * Created by supervons on 2019/10/20.
 * 扫一扫及拍照页面
 * explore page
 */
export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnim: new Animated.Value(0),
      FlashMode: false,
      showCamera: true,
    };
    this.isBarcodeRead = false;
  }

  // 去掉导航条设置，全屏扫描
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.startAnimation();
    // 监听当结果页返回时，重新启动相机监听扫描事件
    this.props.navigation.addListener("didFocus", () =>
      this.setState({ showCamera: true }),
    );
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(-200);
    Animated.timing(this.state.moveAnim, {
      toValue: 0,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true, // 添加这一行
    }).start(() => this.startAnimation());
  };

  // 扫描事件
  onBarCodeRead = result => {
    if (!this.isBarcodeRead) {
      this.isBarcodeRead = true;
      // 卸载扫一扫组件，否则还会持续扫描
      this.setState({ showCamera: false });
      this.props.navigation.navigate("ScannerResult", {
        imageUri: null,
        scannerResult: JSON.stringify(result),
      });
    }
  };

  // 拍照事件
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ showCamera: false });
      this.props.navigation.push("ScannerResult", {
        imageUri: data.uri,
        scannerResult: "",
      });
    }
  };

  // 闪光灯开关
  _changeFlashMode() {
    this.setState({
      FlashMode: !this.state.FlashMode,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showCamera ? (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={this.state.FlashMode ? 1 : 0}
            onBarCodeRead={this.onBarCodeRead}>
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle} />
              <Animated.View
                style={[
                  styles.border,
                  { transform: [{ translateY: this.state.moveAnim }] },
                ]}
              />
              <Text style={styles.rectangleText}>
                将二维码放入框内，即可自动扫描
              </Text>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="keyboard-arrow-left" size={36} color={"green"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                  style={{ marginLeft: 25 }}>
                  <Icon name="camera" size={36} color={"green"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this._changeFlashMode.bind(this)}
                  style={{ marginLeft: 25 }}>
                  <Icon
                    name="highlight"
                    size={36}
                    color={this.state.FlashMode ? "green" : "gray"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </RNCamera>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: "#00FF00",
    backgroundColor: "transparent",
  },
  rectangleText: {
    flex: 0,
    color: "#fff",
    marginTop: 10,
  },
  border: {
    flex: 0,
    width: 195,
    height: 2,
    backgroundColor: "#00FF00",
  },
});
