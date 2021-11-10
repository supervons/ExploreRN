import Axios from "../utils/axios/Axios";
import Toast from "../components/toast";

/**
 * Verify user name whether exists.
 */
const checkUserById = userId => {
  return Axios.GET(`/api/v1/uid/${userId}`)
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
  checkUserById,
  sendEmailCode,
  registerByEmailCode,
};
