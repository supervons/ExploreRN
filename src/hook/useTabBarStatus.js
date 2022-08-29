/**
 * @desc 自定义 useTabBarStatus hook，用于切面MainPage中的三个页面点击事件，注意变换时需要清除（否则历史快照版本会依次触发？）
 * Custom UseTabBarStatus hook for the three page click events in the section mainPage.
 * Note that it needs to be cleared when changing
 * (otherwise the historical snapshot version will be triggered in turn?).
 * @author supervons
 * @date 2021/04/17
 */
import { useEffect } from "react";
import { SELECT_TAB_BAR } from "~/redux/action/hookActionTypes";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

export function useTabBarStatus(selectTabBar) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("tabPress", e => {
      dispatch({ type: SELECT_TAB_BAR, selectTabBar: selectTabBar });
    });
  }, [navigation]);
}
