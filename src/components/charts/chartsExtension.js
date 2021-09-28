/**
 * react-native-echarts-pro
 * Dynamically import third-party CDN or import min.js file
 */
import React from "react";
import { View } from "react-native";
import RNEChartsPro from "react-native-echarts-pro";
import EW from "./echarts-wordcloud.min";
export default function ChartsComponent() {
  const pieOption = {
    title: {
      text: "词云", //标题
      x: "center",
      textStyle: {
        fontSize: 23,
      },
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        name: "热点分析", //数据提示窗标题
        type: "wordCloud",
        sizeRange: [6, 66], //画布范围，如果设置太大会出现少词（溢出屏幕）
        rotationRange: [-45, 90], //数据翻转范围
        shape: "circle",
        textPadding: 0,
        autoSize: {
          enable: true,
          minSize: 6,
        },
        textStyle: {
          normal: {
            color: function () {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(",") +
                ")"
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        data: [
          {
            name: "Data1",
            value: 610,
          },
          {
            name: "Data2",
            value: 580,
          },
          {
            name: "Data3",
            value: 570,
          },
          {
            name: "Data4",
            value: 560,
          },
          {
            name: "Data5",
            value: 550,
          },
          {
            name: "Data6",
            value: 540,
          },
          {
            name: "Data7",
            value: 540,
          },
          {
            name: "Data8",
            value: 520,
          },
        ], //name和value建议用小写，大写有时会出现兼容问题
      },
    ],
  };

  return (
    <View style={{ backgroundColor: "#fff", height: 300, paddingTop: 25 }}>
      <RNEChartsPro
        webViewSettings={{
          startInLoadingState: true,
        }}
        extension={[
          EW,
          "https://cdn.jsdelivr.net/npm/echarts-liquidfill@3.0.0/dist/echarts-liquidfill.min.js",
        ]}
        onPress={res => alert(JSON.stringify(res))}
        legendSelectChanged={res => alert(res)}
        height={250}
        option={pieOption}
      />
    </View>
  );
}
