import Axios from "../utils/axios/Axios";

/**
 * User login.
 */
const userLogin = (params: { uId: string; password: string }) => {
  return Axios.POST("/api/v1/token", params);
};

/**
 * Change user info.
 */
const updateUserInfo = (params: object) => {
  return Axios.POST("/user/updateUser", params);
};

/**
 * Change password
 */
const updatePassword = (params: {
  id: any;
  oldPassword?: any;
  newPassword?: any;
}) => {
  return Axios.PUT(`/api/v1/user/password/${params.id}`, params);
};

export { userLogin, updateUserInfo, updatePassword };
