import React, { useRef } from "react";
import { View, Button } from "react-native";
import RNEChartsPro from "react-native-echarts-pro";
import FontCSS from "./TEST";
import FontCSS2 from "./TEST2";
interface RNEChartsPro {
  setNewOption: Function;
}

export default function ChartsComponent(): JSX.Element {
  const echartsRef = useRef<RNEChartsPro>(null);
  const pieOption = {
    textStyle: {
      fontFamily: "TEST",
      fontSize: 15,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      type: "scroll", // 设置图例翻页
      orient: "horizontal", // 图例横
      data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        formatter: "{value} kg",
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: `function (value) {
              return value +"kg";
          }`,
      },
    },
    series: [
      {
        name: "邮件营销",
        type: "line",
        stack: "总量",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "联盟广告",
        type: "line",
        stack: "总量",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "视频广告",
        type: "line",
        stack: "总量",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "直接访问",
        type: "line",
        stack: "总量",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "搜索引擎",
        type: "line",
        stack: "总量",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  function change() {
    echartsRef?.current?.setNewOption(
      {
        textStyle: {
          fontFamily: "JY",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          type: "scroll", // 设置图例翻页
          orient: "horizontal", // 图例横
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: `function (value) {
              return value +"kg";
            }`,
          },
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      },
      { notMerge: true },
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: 350,
        paddingTop: 25,
      }}>
      <RNEChartsPro
        renderMode={"svg"}
        eventActions={{
          finished: () => {
            console.log(1);
          },
        }}
        enableParseStringFunction
        fontFamilies={[
          { fontName: "TEST", fontFile: FontCSS },
          { fontName: "TEST2", fontFile: FontCSS2 },
        ]}
        ref={echartsRef}
        webViewSettings={{
          startInLoadingState: true,
          scrollEnabled: true,
          onLoadEnd: () => {
            console.log("onLoadEnd...");
          },
          style: {
            backgroundColor: "#fff",
          },
        }}
        onPress={res => alert(JSON.stringify(res))}
        legendSelectChanged={res => alert(res)}
        height={250}
        option={pieOption}
      />
      <Button title="Update" onPress={change} />
    </View>
  );
}
