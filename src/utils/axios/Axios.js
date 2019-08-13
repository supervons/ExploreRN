/**
 * Created by supervons on 2019/08/05.
 * 基于 axios 的网络请求组件
 * Axios-based network request component
 */
import axios from 'axios';
import Toast from '../../components/toast';

let defaultConfig = {
    timeout: 3000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
};
let instance = axios;
// 请求地址 host
// const commonHosts = 'http://192.168.0.116:8080/commonProject';
const commonHosts = 'http://www.superfys.top:8080/commonProject';

class Axios {
    constructor(props) {
        if (props && typeof props == 'object') {
            instance = axios.create(props);
        } else {
            instance = axios.create(defaultConfig);
        }

        // 发起请求前拦截
        instance.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            console.log(error);
            return Promise.reject(error);
        });

        // 响应回调前拦截
        instance.interceptors.response.use((response) => {
            return response.data;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    // get 请求
    GET(url) {
        if (!url) {
            throw new Error('url is undefined');
        }
        return get(commonHosts + url);
    }

    // post 请求
    POST(url, params) {
        if (!url || !params || typeof params != 'object') {
            throw new Error('params is undefined or not an object');
        }
        return post(commonHosts + url, params);
    }
}

async function get(url, callback) {
    try {
        let response = await instance.get(url).catch(resp => {
            return resp;
        });
        // 判断服务器返回状态，根据 code 来判断，没有则表示服务器状态异常
        if (response.code) {
            // 判断业务逻辑返回状态值
            if (response.code.toUpperCase() === 'SUCCESS') {
                return response;
            } else {
                return Promise.reject(response.msg)
            }
        } else {
            return Promise.reject(response.message)
        }
    } catch (e) {
        console.log(e);
    }
}

async function post(url, params, callback) {
    try {
        let response = await instance.post(url, params).catch(resp => {
            return resp;
        });
        // 判断服务器返回状态，根据 code 来判断，没有则表示服务器状态异常
        if (response.code) {
            // 判断业务逻辑返回状态值
            if (response.code.toUpperCase() === 'SUCCESS') {
                return response;
            } else {
                return Promise.reject(response.msg)
            }
        } else {
            return Promise.reject(response.message)
        }
    } catch (e) {
        console.log('---->' + e);
    }
}

const Instance = new Axios();

export default Instance;
