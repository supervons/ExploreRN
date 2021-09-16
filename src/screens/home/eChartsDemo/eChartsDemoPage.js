/**
 * @desc Echarts demo.
 * @author supervons
 * @date 2021/01/20
 */
import React, { useEffect, useState } from "react";
import { InteractionManager, View } from "react-native";
import Loading from "../../../common/loading";
import ChartsComponent from "../../../components/charts";
import ChartsLiquidFill from "../../../components/chartsLiquidfill";

export default function eChartsDemoPage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    Loading.show();
    InteractionManager.runAfterInteractions(() => {
      setShow(true);
      Loading.hide();
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
