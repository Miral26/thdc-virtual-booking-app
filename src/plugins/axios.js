// /src/plugins/axios.js
import axios from 'axios';
import { API_URL } from '../shared/constant';

axios.interceptors.request.use(
    config => {
        const userInfo = localStorage.getItem('userInfo');
        let token = ''
        if (userInfo) {
            token = JSON.parse(userInfo).access
        }
        const headers = (!config.url.includes('/publicAPI') && token) ? {
            Authorization: `Bearer ${token}`
        } : config.headers;
        config.url = config.url.replace('/publicAPI', '');
        return {
            ...config,
            baseURL: `${API_URL}/api/`,
            headers
        };
    },
    error => Promise.reject(error)
);
axios.interceptors.response.use(
    data => {
        console.log(`data`, data)
        return { ...data }
    },
    error => {
        console.log(`error`, error)
        if (error && error.response && error.response.status === 401 && error.response.data.code === "token_not_valid") {
            localStorage.removeItem('userInfo');
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        Promise.reject(error)
    }
);

export default axios;