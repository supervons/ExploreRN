import React from "react";
import { View } from "react-native";
import ChartsComponent from "../../../components/charts";
import ChartsLiquidFill from "../../../components/chartsLiquidfill";

/**
 * @desc 图表示例
 * @author supervons
 * @date 2021/01/20
 */
export default function eChartsDemoPage() {
  return (
    <View style={{ flex: 1 }}>
      <ChartsComponent />
      <ChartsLiquidFill />
    </View>
  );
}
