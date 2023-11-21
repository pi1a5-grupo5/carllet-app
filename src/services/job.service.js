import axios from 'axios';
import {APP_CONFIG} from '../config/app.config';

const JobService = axios.create({
  baseURL: `${APP_CONFIG.JOB_URL}`,
  timeout: 60000,
  headers: {'Content-Type': 'application/json'},
});

JobService.interceptors.response.use(
    (response) => {
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

export default JobService;