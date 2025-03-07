/**
 * Created by Trae AI on 2023.
 * 水印相关的Redux actions
 * Watermark related Redux actions
 */
import {
  SET_WATERMARK_TEXT,
  SET_WATERMARK_OPACITY,
  SET_WATERMARK_ROTATE,
  SET_WATERMARK_COLORS,
  RESET_WATERMARK
} from './watermarkActionTypes';

/**
 * 设置水印文本
 * @param text 水印文本
 */
export const setWatermarkText = (text: string) => ({
  type: SET_WATERMARK_TEXT,
  text
});

/**
 * 设置水印透明度
 * @param opacity 透明度值 (0-1)
 */
export const setWatermarkOpacity = (opacity: number) => ({
  type: SET_WATERMARK_OPACITY,
  opacity
});

/**
 * 设置水印旋转角度
 * @param rotate 旋转角度 (例如: '-45deg')
 */
export const setWatermarkRotate = (rotate: string) => ({
  type: SET_WATERMARK_ROTATE,
  rotate
});

/**
 * 设置水印颜色
 * @param colors 颜色数组
 */
export const setWatermarkColors = (colors: string[]) => ({
  type: SET_WATERMARK_COLORS,
  colors
});

/**
 * 重置水印设置为默认值
 */
export const resetWatermark = () => ({
  type: RESET_WATERMARK
});