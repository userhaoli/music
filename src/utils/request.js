import axios from 'axios';

 const instance = axios.create({
    baseURL: 'http://localhost:3000',         // url = base url + request url
    timeout: 5000          // 请求时间
  })
  
export default instance;
