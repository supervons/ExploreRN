import Axios from "../utils/axios/Axios";

/**
 * Get user config by userId.
 * @param userId 用户ID
 * @returns {Promise<any | never>}
 */
const getProfile = (userId: string) => {
  return Axios.GET(`/api/v1/profile/${userId}`, false);
};

/**
 * Update user config.
 * @param params 用户配置信息
 * @returns {Promise<any | never>}
 */
const updateProfile = (params: FormData) => {
  return Axios.PUT_FILE("/api/v1/profile", params, false);
};

export { getProfile, updateProfile };
