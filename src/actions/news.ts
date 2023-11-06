import Axios from "../utils/axios/Axios";

/**
 * News list.
 * @returns {Promise<any | never>}
 */
const getNewsList = (params: object) => {
  return Axios.POST("/news/queryNewsInfo", params);
};

export { getNewsList };
