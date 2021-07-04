import Axios from "../utils/axios/Axios";
import Toast from "../components/toast";

/**
 * 用户登录
 * @param params {loginId, passWord}
 * @returns {Promise<any | never>}
 */
const userLogin = params => {
  return Axios.POST("/api/v1/token", params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

/**
 * 修改用户信息 目前支持姓名，手机号及地址
 * @param params {loginId, passWord}
 * @returns {Promise<any | never>}
 */
const updateUserInfo = params => {
  return Axios.POST("/user/updateUser", params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

/**
 * 修改密码
 * @param params {loginId, passWord}
 * @returns {Promise<any | never>}
 */
const updatePassword = params => {
  return Axios.PUT(`/api/v1/user/password/${params.id}`, params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      return Promise.reject(resp);
    });
};

module.exports = {
  userLogin,
  updateUserInfo,
  updatePassword,
};
