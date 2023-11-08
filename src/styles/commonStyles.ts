import { StyleSheet } from "react-native";

/**
 * Created by supervons on 2019/08/08.
 * 样式统一配置文件
 * Styles uniform profile
 */
/**
 * ListItem padding 统一上下为 10
 * ListItem padding top and bottom uniform set 10
 */
const commonStyles = StyleSheet.create({
  itemPadding: { paddingTop: 10, paddingBottom: 10 },
  slide1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    color: "red",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    fontSize: 30,
  },
});

export default commonStyles;
