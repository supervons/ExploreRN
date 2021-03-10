import { FIRST_INSTALL, THEME_COLOR } from "../action/settingActionTypes";
import { handleActions } from "redux-actions";
import Theme from "../../../styles/theme";
/**
 * Created by supervons on 2019/08/20.
 * 系统相关设置，是否第一次安装启动
 * System related settings, whether to start the first time
 */

// 初始化数据
const initialState = {
  firstInstall: true,
  themeColor: Theme.primary,
};

const handler = {};

handler[FIRST_INSTALL] = (state, action) => {
  const { firstInstall } = action;
  return {
    ...state,
    firstInstall,
  };
};

handler[THEME_COLOR] = (state, action) => {
  const { themeColor } = action;
  return {
    ...state,
    themeColor,
  };
};
export default handleActions(handler, initialState);
