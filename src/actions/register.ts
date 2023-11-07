import Axios from "../utils/axios/Axios";

/**
 * Verify uId or userEmail whether exists.
 */
const getUniqueTicket = (userId: string, userEmail = undefined) => {
  return Axios.GET(`/api/v1/unique/${userId}/${userEmail}`);
};

/**
 * Send email to user.
 */
const sendEmailCode = (params: { uId: string; email: string }) => {
  return Axios.POST("/api/v1/email", params);
};

/**
 * User register.
 */
const registerByEmailCode = (params: {
  uId: string;
  password: string;
  userEmail: string;
  code: string;
}) => {
  return Axios.POST("/api/v1/user", params);
};

export { getUniqueTicket, sendEmailCode, registerByEmailCode };
