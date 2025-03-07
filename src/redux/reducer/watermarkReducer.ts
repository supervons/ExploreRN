/**
 * Created by Trae AI on 2023.
 * 水印相关的Redux reducer
 * Watermark related Redux reducer
 */
import { handleActions } from "redux-actions";
import {
  RESET_WATERMARK,
  SET_WATERMARK_COLORS,
  SET_WATERMARK_OPACITY,
  SET_WATERMARK_ROTATE,
  SET_WATERMARK_TEXT,
} from "../action/watermarkActionTypes";

// 初始化水印状态
// Initialize watermark state
const initialState = {
  text: "探索 RN",
  opacity: 0.2,
  rotate: "-45deg",
  colors: [],
};

const handler = {};

handler[SET_WATERMARK_TEXT] = (state, action) => {
  const { text } = action;
  return {
    ...state,
    text,
  };
};

handler[SET_WATERMARK_OPACITY] = (state, action) => {
  const { opacity } = action;
  return {
    ...state,
    opacity,
  };
};

handler[SET_WATERMARK_ROTATE] = (state, action) => {
  const { rotate } = action;
  return {
    ...state,
    rotate,
  };
};

handler[SET_WATERMARK_COLORS] = (state, action) => {
  const { colors } = action;
  return {
    ...state,
    colors,
  };
};

handler[RESET_WATERMARK] = () => {
  return {
    ...initialState,
  };
};

export default handleActions(handler, initialState);
