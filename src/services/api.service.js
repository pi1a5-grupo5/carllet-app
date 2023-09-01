import axios from 'axios';
import {APP_CONFIG} from '../config/app.config';

const ApiService = axios.create({
  baseURL: `${APP_CONFIG.API_BASE_URL}/api`,
  timeout: 60000,
  headers: {'Content-Type': 'application/json'},
});

ApiService.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);

      return Promise.reject(error);
    },
);


export default ApiService;
