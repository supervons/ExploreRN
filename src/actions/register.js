import Axios from "../utils/axios/Axios";
import Toast from "../components/toast";

/**
 * Verify uId or userEmail whether exists.
 */
const getUniqueTicket = (userId, userEmail = undefined) => {
  return Axios.GET(`/api/v1/unique/${userId}/${userEmail}`)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

/**
 * Send email to user.
 */
const sendEmailCode = params => {
  return Axios.POST(`/api/v1/email`, params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};

const registerByEmailCode = params => {
  return Axios.POST(`/api/v1/user`, params)
    .then(resp => {
      return Promise.resolve(resp);
    })
    .catch(resp => {
      Toast.showToast(resp);
      return Promise.reject(resp);
    });
};
module.exports = {
  getUniqueTicket,
  sendEmailCode,
  registerByEmailCode,
};
