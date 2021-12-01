import React, { useEffect } from "react";
import { Button, View, SafeAreaView } from "react-native";
import WebView from "react-native-webview";

export default function EmbeddedWebview(props) {
  useEffect(() => {});
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        startInLoadingState={true}
        source={{ uri: props.route.params.url }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Button style={{ width: 100 }} title={"<"} onPress={() => {}} />
        <Button style={{ width: 100 }} title={">"} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}
