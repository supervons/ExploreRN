import Axios from "../utils/axios/Axios";

/**
 * 用户登录
 * @returns {Promise<any | never>}
 */
const userLogin = params => {
  return Axios.POST("/api/v1/token", params);
};

/**
 * 修改用户信息 目前支持姓名，手机号及地址
 * @returns {Promise<any | never>}
 */
const updateUserInfo = params => {
  return Axios.POST("/user/updateUser", params);
};

/**
 * 修改密码
 * @returns {Promise<any | never>}
 */
const updatePassword = params => {
  return Axios.PUT(`/api/v1/user/password/${params.id}`, params);
};

export { userLogin, updateUserInfo, updatePassword };
