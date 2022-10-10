import Axios from "../utils/axios/Axios";

/**
 * 新闻列表接口
 * @returns {Promise<any | never>}
 */
const getNewsList = params => {
  return Axios.POST("/news/queryNewsInfo", params);
};

module.exports = {
  getNewsList,
};
