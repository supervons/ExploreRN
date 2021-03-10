import Axios from "../utils/axios/Axios";
import Toast from "../components/toast";

/**
 * 用户登录
 * @param params {loginId, passWord}
 * @returns {Promise<any | never>}
 */
const userLogin = (params) => {
  return Axios.POST("/user/loginAction", params)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((resp) => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

/**
 * 修改用户信息 目前支持姓名，手机号及地址
 * @param params {loginId, passWord}
 * @returns {Promise<any | never>}
 */
const updateUserInfo = (params) => {
  return Axios.POST("/user/updateUser", params)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((resp) => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

/**
 * 修改密码
 * @param params {loginId, passWord}
 * @returns {Promise<any | never>}
 */
const updatePassword = (params) => {
  return Axios.POST("/user/updatePassword", params)
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((resp) => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

module.exports = {
  userLogin,
  updateUserInfo,
  updatePassword,
};
