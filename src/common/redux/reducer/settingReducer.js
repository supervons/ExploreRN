/**
 * Created by supervons on 2019/08/20.
 * 系统相关设置，是否第一次安装启动
 * System related settings, whether to start the first time
 */
import { FIRST_INSTALL } from '../action/settingActionTypes';
import { handleActions } from 'redux-actions';

// 初始化数据
const initialState = {
  firstInstall: true
};

const handler = {};

handler[FIRST_INSTALL] = (state, action) => {
  const { firstInstall } = action;
  return {
    ...state,
    firstInstall
  };
};

export default handleActions(handler, initialState);
