import React, { useEffect } from "react";
import { Text, View, StatusBar } from "react-native";
import WebView from "react-native-webview";

export default function EmbeddedWebview(props) {
  useEffect(() => {});
  return (
    <View style={{ flex: 1 }}>
      <WebView
        startInLoadingState={true}
        source={{ uri: props.route.params.url }}></WebView>
    </View>
  );
}
