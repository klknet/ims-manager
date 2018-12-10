import axios from 'axios';
import config from '../config/settings';
import persist from './persist';
import { message } from 'antd';

const instance = axios.create();
instance.defaults.timeout = config.timeout;
instance.defaults.baseURL = config.baseURL;

instance.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response && err.response.data.status === 401 && err.response.data.message === 'Unauthorized') {
    message.error("登录超时")
    persist.logout();
    window.location.reload();
  }
});

export default instance;

