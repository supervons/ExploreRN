/**
 * @desc Main-Page-Data
 * @author supervons
 * @date 2021/04/29
 */
import I18n from "../../common/languages";
export const data = [
  {
    key: "charts",
    image: require("../../resource/image/home/charts.png"),
    color: "#7A7281",
    name: I18n.t("Home.charts"),
    routeName: "eChartsDemoPage",
  },
  // TODO - camera
  {
    key: "scanner",
    icon: "camera",
    color: "#7B8B6F",
    name: I18n.t("Home.scanner"),
    routeName: "Scanner",
  },
  {
    key: "gallery",
    icon: "image",
    color: "#8696A7",
    name: I18n.t("Home.gallery"),
    routeName: "gallery",
  },
  {
    key: "jdSearch",
    icon: "search",
    color: "#965454",
    name: I18n.t("Home.jdsearch"),
    routeName: "JdSearchDemo",
  },
  {
    key: "skeleton",
    name: I18n.t("Home.skeleton"),
    color: "#6b5152",
    image: require("../../resource/image/home/seleton.png"),
    routeName: "skeleton",
  },
  {
    key: "morandi",
    name: I18n.t("Home.morandi"),
    color: "#7a7281",
    image: require("../../resource/image/home/colors.png"),
    routeName: "MorandiPage",
  },
  {
    key: "draggable",
    name: I18n.t("Home.draggable"),
    color: "#7a7281",
    image: require("../../resource/image/home/drag.png"),
    routeName: "DraggablePage",
  },
  {
    key: "lottie",
    name: I18n.t("Home.lottie"),
    color: "#7a7281",
    image: require("../../resource/image/home/lottie.webp"),
    routeName: "LottiePage",
  },
  {
    key: "sensors",
    name: I18n.t("Home.sensors"),
    color: "#7a7281",
    image: require("../../resource/image/home/sensors.png"),
    routeName: "Sensors",
  },
];
