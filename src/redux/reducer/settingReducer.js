import {
  FIRST_INSTALL,
  INITIAL_PAGE,
  PROFILE_INFO,
} from "../action/settingActionTypes";
import { handleActions } from "redux-actions";
/**
 * Created by supervons on 2019/08/20.
 * 系统相关设置，是否第一次安装启动
 * System related settings, whether to start the first time
 */

// 初始化数据
const initialState = {
  firstInstall: true,
  initialPage: "Login",
  profileInfo: {
    theme: "#00868B",
  },
};

const handler = {};

handler[FIRST_INSTALL] = (state, action) => {
  const { firstInstall } = action;
  return {
    ...state,
    firstInstall,
  };
};

handler[INITIAL_PAGE] = (state, action) => {
  const { initialPage } = action;
  return {
    ...state,
    initialPage,
  };
};

handler[PROFILE_INFO] = (state, action) => {
  const { profileInfo } = action;
  return {
    ...state,
    profileInfo,
  };
};
export default handleActions(handler, initialState);
