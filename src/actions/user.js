import Axios from '../utils/axios/Axios';
import Toast from '../components/toast';

const userLogin = params => {
    return Axios.POST('/user/loginAction', params).then(resp => {
        return Promise.resolve(resp.data);
    }).catch(resp =>{
        Toast.showToast(resp);
        return Promise.reject(resp);
    });
};

module.exports = {
    userLogin,
};
