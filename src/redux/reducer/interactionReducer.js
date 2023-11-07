import { SHOW_LOADING_FLAG } from "../action/interactionTypes";
import { handleActions } from "redux-actions";

// 初始化数据
const initialState = {
  showLoadingFlag: false,
};

const handler = {};

handler[SHOW_LOADING_FLAG] = (state, action) => {
  const { showLoadingFlag } = action;
  return {
    ...state,
    showLoadingFlag,
  };
};

export default handleActions(handler, initialState);
