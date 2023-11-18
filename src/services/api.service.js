import axios from 'axios';
import {APP_CONFIG} from '../config/app.config';

const ApiService = axios.create({
  baseURL: `${APP_CONFIG.API_BASE_URL}/api`,
  timeout: 60000,
  headers: {'Content-Type': 'application/json'},
});

ApiService.interceptors.response.use(
    (response) => {
      console.log(response)

      if (response.data || response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    },
    (error) => {
      return Promise.reject(error);
    },
);


export default ApiService;
