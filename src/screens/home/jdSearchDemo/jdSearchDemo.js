import React, { useState } from "react";
import { StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
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
          backgroundColor: "#00000000",
          height: 50,
        }}>
        <Text
          style={{
            opacity: 1 - offsetY / 30,
            position: "absolute",
            left: 20,
            top: 20,
          }}>
          京东购物狂欢！！！
        </Text>
        <TouchableOpacity onPress={() => alert("ss")}>
          <Text style={{ position: "absolute", right: 50, top: 20 }}>
            扫一扫
          </Text>
        </TouchableOpacity>
        <Text style={{ position: "absolute", right: 5, top: 20 }}>消息</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {title()}
      <ScrollView
        onScroll={onScroll}
        stickyHeaderIndices={[1]}
        style={{
          zIndex: -1,
          marginTop: -50,
          backgroundColor: "#ffffff",
        }}>
        <View style={{ height: 50, backgroundColor: "red" }} />
        <View style={styles.textInputView}>
          <TextInput
            underlineColor={"transparent"}
            placeholder={"请输入您要咨询的问题"}
            placeholderTextColor={"#9DA3B8"}
            style={[
              styles.textInput,
              {
                zIndex: 99,
                width: width * 0.95 - 3 * offsetY,
              },
            ]}
          />
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
  },
});
