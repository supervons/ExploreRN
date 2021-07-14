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

module.exports = {
  getProfile,
};
