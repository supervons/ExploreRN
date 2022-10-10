import Axios from "../utils/axios/Axios";

/**
 * 获取用户配置信息
 * @param userId 用户ID
 * @returns {Promise<any | never>}
 */
const getProfile = userId => {
  return Axios.GET(`/api/v1/profile/${userId}`, false);
};

/**
 * 更新用户配置信息
 * @param params 用户配置信息
 * @returns {Promise<any | never>}
 */
const updateProfile = params => {
  return Axios.PUT_FILE(`/api/v1/profile`, params, false);
};

module.exports = {
  getProfile,
  updateProfile,
};
