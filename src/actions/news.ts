import Axios from "../utils/axios/Axios";

/**
 * News list.
 */
const getNewsList = (params: object) => {
  return Axios.POST("/news/queryNewsInfo", params);
};

export { getNewsList };
