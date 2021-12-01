import React, { useEffect, useRef } from "react";
import { Button, View, SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function EmbeddedWebview(props) {
  useEffect(() => {});
  const webViewRef = useRef(null);
  function commonButton(iconName) {
    return (
      <AntDesign
        style={{ marginLeft: iconName === "right" ? 50 : 0 }}
        onPress={() =>
          webViewRef.current[iconName === "right" ? "goForward" : "goBack"]()
        }
        name={iconName}
        size={26}
        color={"#ccc"}
      />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        startInLoadingState={true}
        source={{ uri: props.route.params.url }}
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {commonButton("left")}
        {commonButton("right")}
      </View>
    </SafeAreaView>
  );
}
