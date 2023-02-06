/**
 * @desc Echarts demo.
 * @author supervons
 * @date 2021/01/20
 */
import React, { useState, useEffect } from "react";
import { InteractionManager, ScrollView, View } from "react-native";
import ChartsComponent from "../../../components/charts/charts";
import ChartsLiquidFill from "../../../components/charts/chartsLiquidfill";
import ChartsExtension from "../../../components/charts/chartsExtension";
import MapCharts from "../../../components/charts/mapCharts";
import ModuleHeadTitle from "../../../components/ModuleHeadTitle";
import I18n from "../../../common/languages";

export default function EChartsDemoPage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setShow(true);
    }, []);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {show && (
          <>
            <ModuleHeadTitle title={I18n.t("Home.eCharts.chartsDemo")} />
            <ChartsComponent />
            <ModuleHeadTitle title={I18n.t("Home.eCharts.mapDemo")} />
            <MapCharts />
            <ModuleHeadTitle title={I18n.t("Home.eCharts.extensionDemo")} />
            <ChartsExtension />
            <ModuleHeadTitle title={I18n.t("Home.eCharts.liquidDemo")} />
            <ChartsLiquidFill />
          </>
        )}
      </ScrollView>
    </View>
  );
}
