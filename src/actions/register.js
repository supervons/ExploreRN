import Axios from "../utils/axios/Axios";
import Toast from "../components/toast";

/**
 * Verify uId or userEmail whether exists.
 */
const getUniqueTicket = (userId, userEmail = undefined) => {
  return Axios.GET(`/api/v1/unique/${userId}/${userEmail}`);
};

/**
 * Send email to user.
 */
const sendEmailCode = params => {
  return Axios.POST(`/api/v1/email`, params);
};

const registerByEmailCode = params => {
  return Axios.POST(`/api/v1/user`, params);
};

module.exports = {
  getUniqueTicket,
  sendEmailCode,
  registerByEmailCode,
};
