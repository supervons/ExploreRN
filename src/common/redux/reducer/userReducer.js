import { USER_TOKEN, USER_INFO } from "../action/userActionTypes";
import { handleActions } from "redux-actions";

/**
 * Created by supervons on 2019/08/20.
 * Redux Reducer设置，使用 redux-actions 更清爽的写 reducer
 * Redux Reducer settings, use redux-actions to write more reducer
 */
// 初始化数据
const initialState = {
  userToken: "",
  userInfo: {},
};

const handler = {};

handler[USER_TOKEN] = (state, action) => {
  const { userToken } = action;
  return {
    ...state,
    userToken,
  };
};

handler[USER_INFO] = (state, action) => {
  const { userInfo } = action;
  return {
    ...state,
    userInfo,
  };
};

export default handleActions(handler, initialState);
