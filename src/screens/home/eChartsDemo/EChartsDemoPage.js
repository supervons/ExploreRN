/**
 * @desc Echarts demo.
 * @author supervons
 * @date 2021/01/20
 */
import React, { useState, useEffect, useRef } from "react";
import { InteractionManager, Platform, ScrollView, View } from "react-native";
import ChartsComponent from "../../../components/charts/charts";
import ChartsLiquidFill from "../../../components/charts/chartsLiquidfill";
import ChartsExtension from "../../../components/charts/chartsExtension";
import MapCharts from "../../../components/charts/mapCharts";
import ModuleHeadTitle from "../../../components/ModuleHeadTitle";
import I18n from "../../../common/languages";

export default function EChartsDemoPage() {
  const [show, setShow] = useState(false);
  const scrRef = useRef(null);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setShow(true);
    }, []);
  }, []);

  /**
   * Improved map sliding
   * @param state
   */
  const handleStop = state => {
    if (Platform.OS === "android") {
      scrRef.current.setNativeProps({ scrollEnabled: state });
    }
  };
  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponderCapture={() => {
        handleStop(true);
      }}>
      <ScrollView style={{ flex: 1 }} ref={scrRef}>
        {show && (
          <>
            <ModuleHeadTitle title={I18n.t("Home.eCharts.chartsDemo")} />
            <ChartsComponent />
            <ModuleHeadTitle title={I18n.t("Home.eCharts.mapDemo")} />
            <MapCharts handleStop={handleStop} />
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
