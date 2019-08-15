import Axios from '../utils/axios/Axios';
import Toast from '../components/toast';

/**
 * 新闻列表接口
 * @param params {pageNo, itemNo}
 * @returns {Promise<any | never>}
 */
const getNewsList = params => {
    return Axios.POST('/news/queryNewsInfo', params).then(resp => {
        return Promise.resolve(resp);
    }).catch(resp =>{
        Toast.showToast(resp);
        return Promise.reject(resp);
    });
};

module.exports = {
    getNewsList,
};
