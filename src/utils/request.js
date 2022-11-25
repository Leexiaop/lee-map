import axios from 'axios';
import {message} from 'antd';
import {history} from 'umi';
import {getCookie} from '@/utils/util';

axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;

const instance = axios.create({
    timeout: 2 * 60 * 1000,
    xsrfCookieName: 'xsrf-token'
});

instance.interceptors.request.use((config) => {
    if (config.url.indexOf('http') > -1) {
        config.baseURL = '';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

instance.post = (url, params, opts) => {
    if (history.location.pathname === '/bd') {
        params = {
            ...params,
            bduss: getCookie('BDUSS')
        };
    }
    return axios.post(url, params, opts).then((res) => {
        return res?.data;
    }).catch((err) => {
        message.error({
            content: '操作失败，请稍候重试'
        });
    });
};

instance.put = (url, params, opts) => {
    return axios.put(url, params, opts).then((res) => {
        return res?.data;
    }).catch((err) => {
        message.error({
            content: '操作失败，请稍候重试'
        });
    });
};
instance.get = (url, opts) => {
    return axios.get(url, opts).then((res) => {
        return res?.data;
    }).catch((err) => {
        message.error({
            content: '操作失败，请稍候重试'
        });
    });
};
instance.delete = (url, opts) => {
    return axios.delete(url, opts).then((res) => {
        return res?.data;
    }).catch((err) => {
        message.error({
            content: '操作失败，请稍候重试'
        });
    });
};

export default instance;
