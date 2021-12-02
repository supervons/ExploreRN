/**
 * Created by supervons on 2021/12/02.
 * 通用 Webview 组件，自带前进返回按钮，并动态判断是否能前进后退
 * General Webview component, with its own forward and back button, and dynamic judgment whether can forward and back
 */
import React, { useState, useRef } from "react";
import { Button, View, SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function EmbeddedWebview(props) {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef(null);

  /**
   * Dynamic button
   * @param iconName
   * @param canTouchable
   * @returns {*}
   */
  function commonButton(iconName, canTouchable) {
    return (
      <AntDesign
        disabled={!canTouchable}
        style={{ marginLeft: iconName === "right" ? 50 : 0 }}
        onPress={() =>
          webViewRef.current[iconName === "right" ? "goForward" : "goBack"]()
        }
        name={iconName}
        size={26}
        color={canTouchable ? "#000000" : "#E3E3E3"}
      />
    );
  }

  function onNavigationStateChange(params) {
    setCanGoBack(params.canGoBack);
    setCanGoForward(params.canGoForward);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        startInLoadingState={true}
        onNavigationStateChange={onNavigationStateChange}
        source={{ uri: props.route.params.url }}
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {commonButton("left", canGoBack)}
        {commonButton("right", canGoForward)}
      </View>
    </SafeAreaView>
  );
}
