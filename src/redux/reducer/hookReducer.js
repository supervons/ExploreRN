import { SELECT_TAB_BAR } from "../action/hookActionTypes";
import { handleActions } from "redux-actions";

// 初始化数据
const initialState = {
  selectTabBar: "home",
};

const handler = {};

handler[SELECT_TAB_BAR] = (state, action) => {
  const { selectTabBar } = action;
  return {
    ...state,
    selectTabBar,
  };
};

export default handleActions(handler, initialState);
