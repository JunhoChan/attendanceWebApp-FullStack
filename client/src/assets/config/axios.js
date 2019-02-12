import axios from 'axios';      // 封装了fetch请求的库

const baseUrl = 'http://localhost:7001/v1/api/';

// 设置axios相关配置
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}

export default axios;