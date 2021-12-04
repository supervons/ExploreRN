/**
 * @desc Header search demo.
 * @author supervons
 * @date 2021/04/16
 */
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import I18n from "../../../common/languages";

const { width } = Dimensions.get("window");
export default function jdSearchDemo(props) {
  const [offsetY, setOffsetY] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    // auto scroll
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 1000);
    setTimeout(() => {
      scrollViewRef.current &&
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
    }, 1500);
  }, []);

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
          marginTop: StatusBar.currentHeight,
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
    <View style={{ flex: 1, backgroundColor: "red" }}>
      {title()}
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}>
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
        <View style={styles.buttonStyle}>
          <Button
            onPress={() => props.navigation.pop()}
            title={I18n.t("Home.search.back")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    zIndex: -1,
    marginTop: -60,
    backgroundColor: "#ffffff",
  },
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
  buttonStyle: {
    height: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
});
