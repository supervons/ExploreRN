/**
 * @desc Echarts demo.
 * @author supervons
 * @date 2021/01/20
 */
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import ChartsComponent from "../../../components/charts/charts";
import ChartsLiquidFill from "../../../components/charts/chartsLiquidfill";
import ChartsExtension from "../../../components/charts/chartsExtension";
import MapCharts from "../../../components/charts/mapCharts";
import ModuleHeadTitle from "../../../components/ModuleHeadTitle";
import I18n from "../../../common/languages";

export default function EChartsDemoPage() {
  const demoMaps = {
    ChartsComponent: <ChartsComponent />,
    ChartsLiquidFill: <ChartsLiquidFill />,
    ChartsExtension: <ChartsExtension />,
    MapCharts: <MapCharts />,
  };
  const demoArray = [
    { title: I18n.t("Home.eCharts.chartsDemo"), key: "ChartsComponent" },
    { title: I18n.t("Home.eCharts.mapDemo"), key: "MapCharts" },
    { title: I18n.t("Home.eCharts.extensionDemo"), key: "ChartsExtension" },
    { title: I18n.t("Home.eCharts.liquidDemo"), key: "ChartsLiquidFill" },
  ];
  const [currentDemo, setCurrentDemo] = useState("ChartsComponent");
  useEffect(() => {
    setTimeout(() => {
      // on mount
      captureScreen({
        format: "jpg",
        quality: 0.8,
        result: "base64",
      }).then(
        uri => {
          console.log("Image saved to", uri);
        },
        error => console.error("Oops, snapshot failed", error),
      );
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}>
      <View style={{ height: 350 }}>{demoMaps[currentDemo]}</View>
      <View
        style={{
          flex: 1,
          padding: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
        {demoArray.map(res => {
          return (
            <TouchableOpacity
              key={res.key}
              onPress={() => setCurrentDemo(res.key)}>
              <ModuleHeadTitle
                title={res.title}
                current={currentDemo === res.key}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
