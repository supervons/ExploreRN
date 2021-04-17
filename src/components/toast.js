import Toaster from "react-native-root-toast";

/**
 * Created by supervons on 2019/08/05.
 * Toast 组件
 * Toast components
 */
export default class Toast {
  /**
   * 显示Toast
   * @param message 显示内容
   * @param duration LONG SHORT
   */
  static showToast(
    message,
    duration = "SHORT",
    position = "CENTER",
    shadow = false,
  ) {
    Toaster.show(message, {
      duration: Toaster.durations[duration],
      position: Toaster.positions[position],
      shadow: shadow,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }
}
