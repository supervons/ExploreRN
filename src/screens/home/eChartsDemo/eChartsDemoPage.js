/**
 * @desc Echarts demo.
 * @author supervons
 * @date 2021/01/20
 */
import React from "react";
import { ScrollView } from "react-native";
import ChartsComponent from "../../../components/charts/charts";
import ChartsLiquidFill from "../../../components/charts/chartsLiquidfill";
import ChartsExtension from "../../../components/charts/chartsExtension";
import ModuleHeadTitle from "../../../components/ModuleHeadTitle";
import I18n from "../../../common/languages";

export default class eChartsDemoPage extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ModuleHeadTitle title={I18n.t("Home.eCharts.chartsDemo")} />
        <ChartsComponent />
        <ModuleHeadTitle title={I18n.t("Home.eCharts.extensionDemo")} />
        <ChartsExtension />
        <ModuleHeadTitle title={I18n.t("Home.eCharts.liquidDemo")} />
        <ChartsLiquidFill />
      </ScrollView>
    );
  }
}
