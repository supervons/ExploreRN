import axios from "axios";
import Constants from "../../common/constants";
import Loading from "../../common/loading";
import Toast from "../../components/toast";

/**
 * Created by supervons on 2019/08/05.
 * 基于 axios 的网络请求组件
 * Axios-based network request component
 */
let defaultConfig = {
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
};
let instance = axios;
// 请求地址 host
const commonHosts = Constants.serverUrl;
// const commonHosts = 'http://www.superfys.top:8080/commonProject';

class Axios {
  constructor(props) {
    if (props && typeof props == "object") {
      instance = axios.create(props);
    } else {
      instance = axios.create(defaultConfig);
    }

    // 发起请求前拦截
    instance.interceptors.request.use(
      config => {
        // 增加通用token
        config.headers.Authorization = global.jwtToken;
        Loading.show();
        return config;
      },
      error => {
        Loading.hide();
        console.log(error);
        return Promise.reject(error);
      },
    );

    // 响应回调前拦截
    instance.interceptors.response.use(
      response => {
        Loading.hide();
        return response.data;
      },
      error => {
        Loading.hide();
        return Promise.reject(error);
      },
    );
  }

  // get 请求
  GET(url) {
    if (!url) {
      throw new Error("url is undefined");
    }
    return get(commonHosts + url);
  }

  // post 请求
  POST(url, params, method) {
    if (!url || !params || typeof params != "object") {
      throw new Error("params is undefined or not an object");
    }
    return post(commonHosts + url, params);
  }

  // put 请求
  PUT(url, params) {
    if (!url || !params || typeof params != "object") {
      throw new Error("params is undefined or not an object");
    }
    return post(commonHosts + url, params, "put");
  }

  // delete 请求
  DELETE(url, params) {
    if (!url || !params || typeof params != "object") {
      throw new Error("params is undefined or not an object");
    }
    return post(commonHosts + url, params, "delete");
  }
}

async function get(url, callback) {
  try {
    let response = await instance.get(url).catch(resp => {
      return resp;
    });
    // 判断服务器返回状态，根据 code 来判断，没有则表示服务器状态异常
    if (response.code === 0) {
      // 判断业务逻辑返回状态值
      return response;
    } else {
      return Promise.reject(response.message);
    }
  } catch (e) {
    console.log(e);
  }
}

async function post(url, params, method = "post") {
  try {
    let response = await instance[method](url, params).catch(resp => {
      return resp;
    });
    // 判断服务器返回状态，根据 code 来判断，没有则表示服务器状态异常
    if (response.code === 0) {
      // 判断业务逻辑返回状态值
      return response.data;
    } else {
      Toast.showToast(response.message || response.msg);
      return Promise.reject(response.msg || "server error!");
    }
  } catch (e) {
    console.log("---->" + e);
  }
}

const Instance = new Axios();

export default Instance;
