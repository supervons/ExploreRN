import React from "react";
import {
  View,
  Text,
  Animated,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";

/**
 * Created by supervons on 2020/05/22.
 * hooks 方式封装自定义 tabBar 组件，使得选中 tab 字体变大并加粗
 * The hooks method encapsulates the custom tabBar component, making the selected tab font larger and bolder
 */
const width = Dimensions.get("window").width;
export default function TabBarView(props) {
  /**
   * Rendering tabBar
   * @param tab tabBar Name
   * @param i tabBar index
   * @param page current tab page
   * @returns {*}
   */
  const renderItem = (tabName, i, page) => {
    const textStyle = {
      fontSize: 16,
      color: "#F5F5F5",
      marginTop: 15,
    };
    if (i === page) {
      textStyle.marginTop = Platform.OS == "ios" ? 15 : 10;
      textStyle.color = "#FFFFFF";
      textStyle.fontSize = 20;
      textStyle.fontWeight = "bold";
    }
    return (
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <Text style={textStyle} allowFontScaling={false}>
          {tabName}
        </Text>
      </View>
    );
  };

  /**
   * Rendering Indicator
   * @returns {*}
   */
  const renderIndicator = () => {
    const indicatorLength = width / props.tabs.length;
    const translateX = props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width / props.tabs.length],
    });
    return (
      <View
        style={{
          alignSelf: "center",
          height: 3,
          backgroundColor: "#FFFFFF",
          width: indicatorLength,
        }}
      />
    );
  };
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: props.themeColor,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          height: 40,
        }}>
        {props.tabs.map((tabName, i) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={i}
              style={{ height: 40, width: 100 }}
              onPress={() => {
                props.goToPage(i);
              }}>
              {renderItem(tabName, i, props.activeTab)}
            </TouchableOpacity>
          );
        })}
      </View>
      {renderIndicator()}
    </View>
  );
}
