import React, { useReducer } from "react";

/**
 * 自定义 State 对象合并 Hooks
 * @param objInfo
 * @returns {[*,(<A>(value: A) => void)]}
 */
export default function useFormState(objInfo) {
  const [formInfo, dispatch] = useReducer(reducer, objInfo);

  function reducer(state, obj) {
    let addObj = {};
    for (let temp in obj) {
      addObj[temp] = obj[temp];
    }
    return { ...state, ...addObj };
  }

  return [formInfo, dispatch];
}
