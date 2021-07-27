import React, { useEffect, useState } from "react";
import { InteractionManager, View } from "react-native";
import ChartsComponent from "../../../components/charts";
import ChartsLiquidFill from "../../../components/chartsLiquidfill";

/**
 * @desc 图表示例
 * @author supervons
 * @date 2021/01/20
 */
export default function eChartsDemoPage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setShow(true);
    }, []);
  });
  return (
    show && (
      <View style={{ flex: 1 }}>
        <ChartsComponent />
        <ChartsLiquidFill />
      </View>
    )
  );
}
