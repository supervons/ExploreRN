import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";

/**
 * @desc 仿京东头部搜索条
 * @author supervons
 * @date 2021/04/16
 */
const { width } = Dimensions.get("window");
export default function jdSearchDemo() {
  const [offsetY, setOffsetY] = useState(0);

  /**
   * 滑动监听事件，动态监听滚动条高度
   * Slide monitor events, dynamically monitor the height of the scroll bar
   * @param event
   */
  function onScroll(event) {
    let currentOffsetY = event.nativeEvent.contentOffset.y;
    if (currentOffsetY > 30) {
      setOffsetY(30);
    } else if (currentOffsetY < 0) {
      setOffsetY(0);
    } else {
      setOffsetY(currentOffsetY);
    }
  }

  function title() {
    return (
      <View
        pointerEvents="box-none"
        style={{
          height: 50,
        }}>
        <Image
          style={[
            styles.titleImage,
            {
              opacity: 1 - offsetY / 30,
            },
          ]}
          resizeMode={"contain"}
          source={require("../../../resource/image/jdSearch/react.png")}
        />
        {rightIcon(
          "扫一扫",
          50,
          require("../../../resource/image/jdSearch/scanner.png"),
        )}
        {rightIcon(
          "消息",
          10,
          require("../../../resource/image/jdSearch/msg.png"),
        )}
      </View>
    );
  }

  function rightIcon(title, right, imageSource) {
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          position: "absolute",
          right: right,
        }}
        onPress={() => alert("scanner")}>
        <View
          style={{
            alignItems: "center",
          }}>
          <Image
            resizeMode={"contain"}
            style={{ height: 20, width: 20, marginBottom: 5 }}
            source={imageSource}
          />
          <Text style={{ color: "#fff" }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"red"} barStyle={"light-content"} />
      {title()}
      <ScrollView
        onScroll={onScroll}
        stickyHeaderIndices={[1]}
        style={{
          zIndex: -1,
          marginTop: -60,
          backgroundColor: "#ffffff",
        }}>
        <View style={{ height: 50, backgroundColor: "red" }} />
        <View style={styles.textInputView}>
          <View
            style={[
              styles.textInput,
              {
                width: width * 0.95 - 3 * offsetY,
              },
            ]}>
            <Image
              style={{
                height: 20,
                width: 20,
                marginRight: 5,
              }}
              resizeMode={"contain"}
              source={require("../../../resource/image/jdSearch/search.png")}
            />
            <TextInput
              underlineColor={"transparent"}
              placeholder={"请输入您要咨询的问题"}
              placeholderTextColor={"#9DA3B8"}
            />
          </View>
        </View>
        <View
          style={{
            height: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Button onPress={() => alert(1)} title={"Back Home"} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputView: {
    backgroundColor: "red",
    height: 60,
    paddingTop: 10,
    paddingLeft: 10,
  },
  textInput: {
    backgroundColor: "#ffffff",
    height: 40,
    borderRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  titleImage: {
    position: "absolute",
    left: 20,
    height: 40,
    width: 40,
  },
});
