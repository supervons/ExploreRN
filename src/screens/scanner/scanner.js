/**
 * Created by supervons on 2019/10/20.
 * 扫一扫及拍照页面
 * Explore page
 */
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
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

export default function Scanner() {
  const [moveAnim] = useState(new Animated.Value(-200));
  const [flashMode, setFlashMode] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [isBarcodeRead, setIsBarcodeRead] = useState(false);
  const route = useNavigation();
  const rncRef = useRef(null);

  useEffect(() => {
    startAnimation();
  }, []);
  /**
   * 监听当结果页返回时，重新启动相机监听扫描事件
   */
  function restartScanner() {
    setShowCamera(true);
  }

  function startAnimation() {
    moveAnim.setValue(-200);
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true, // 添加这一行
    }).start(() => startAnimation());
  }

  // 扫描事件
  function onBarCodeRead() {
    if (!isBarcodeRead) {
      setIsBarcodeRead(true);
      // 卸载扫一扫组件，否则还会持续扫描
      setShowCamera(true);
      route.navigate("ScannerResult", {
        imageUri: null,
        scannerResult: JSON.stringify(result),
      });
    }
  }

  // 拍照事件
  async function takePicture() {
    if (rncRef) {
      const options = { quality: 0.5, base64: true };
      const data = await rncRef.current.takePictureAsync(options);
      setShowCamera(false);
      route.push("ScannerResult", {
        imageUri: data.uri,
        scannerResult: "",
        restartScanner: restartScanner,
      });
    }
  }

  // 闪光灯开关
  function _changeFlashMode() {
    setFlashMode(flashMode => !flashMode);
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <RNCamera
          ref={rncRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={flashMode ? 1 : 0}
          onBarCodeRead={onBarCodeRead}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle} />
            <Animated.View
              style={[styles.border, { transform: [{ translateY: moveAnim }] }]}
            />
            <Text style={styles.rectangleText}>
              将二维码放入框内，即可自动扫描
            </Text>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <TouchableOpacity onPress={() => route.goBack()}>
                <Icon name="keyboard-arrow-left" size={36} color={"green"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePicture}
                style={{ marginLeft: 25 }}>
                <Icon name="camera" size={36} color={"green"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_changeFlashMode}
                style={{ marginLeft: 25 }}>
                <Icon
                  name="highlight"
                  size={36}
                  color={flashMode ? "green" : "gray"}
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
