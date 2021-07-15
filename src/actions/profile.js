import Axios from "../utils/axios/Axios";
import Toast from "../components/toast";

/**
 * 获取用户配置信息
 * @param userId 用户ID
 * @returns {Promise<any | never>}
 */
const getProfile = userId => {
  return Axios.GET(`/api/v1/profile/${userId}`, false)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

/**
 * 更新用户配置信息
 * @param params 用户配置信息
 * @returns {Promise<any | never>}
 */
const updateProfile = params => {
  return Axios.POST(`/api/v1/profile`, params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

module.exports = {
  getProfile,
  updateProfile,
};
