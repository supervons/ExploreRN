/**
 * @desc Echarts demo.
 * @author supervons
 * @date 2021/01/20
 */
import React, { useEffect, useState } from "react";
import { InteractionManager, ScrollView, Text, View } from "react-native";
import Loading from "../../../common/loading";
import ChartsComponent from "../../../components/charts/charts";
import ChartsLiquidFill from "../../../components/charts/chartsLiquidfill";
import ChartsExtension from "../../../components/charts/chartsExtension";
import ModuleHeadTitle from "../../../components/ModuleHeadTitle";
import I18n from "../../../common/languages";

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
      <ScrollView style={{ flex: 1 }}>
        <ModuleHeadTitle title={I18n.t("Home.eCharts.chartsDemo")} />
        <ChartsComponent />
        <ModuleHeadTitle title={I18n.t("Home.eCharts.liquidDemo")} />
        <ChartsLiquidFill />
        <ModuleHeadTitle title={I18n.t("Home.eCharts.extensionDemo")} />
        <ChartsExtension />
      </ScrollView>
    )
  );
}
