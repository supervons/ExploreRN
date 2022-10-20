import React from "react";
import { View } from "react-native";
import RNEChartsPro from "react-native-echarts-pro";

export default function MapCharts(props) {
  const mapData = {
    visualMap: {
      show: true,
      left: "right",
      top: "center",
      min: 1,
      max: 3,
      calculable: true,
    },
    geo: [
      {
        type: "map",
        map: "world",
        mapType: "world",
        selectedMode: "single",
        itemStyle: {
          normal: {
            areaStyle: { color: "#B1D0EC" },
            color: "#eeeeee",
            borderColor: "#dadfde",
          },
          emphasis: {
            //mouse hover style
            label: {
              show: true,
              textStyle: {
                color: "#000000",
              },
            },
          },
        },
        roam: true,
      },
    ],
    series: {
      type: "effectScatter",
      coordinateSystem: "geo",
      geoIndex: 0,
      itemStyle: {
        color: "red",
      },
      data: [[116.4551, 40.2539, 10]],
    },
    toolbox: {
      show: true,
      orient: "horizontal",
      x: "left",
      y: "bottom",
      backgroundColor: "#1e90ff60",
      itemGap: 10,
      itemSize: 10,
      color: "#ffffff",
      showTitle: false,
      feature: {
        restore: {
          show: true,
          title: "Reset",
        },
      },
    },
  };

  return (
    <View style={{ height: 288 }}>
      <RNEChartsPro
        height={288}
        option={mapData}
        webViewSettings={{
          nestedScrollEnabled: true,
        }}
        onPress={res => {
          alert(JSON.stringify(res));
        }}
      />
    </View>
  );
}
