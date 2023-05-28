import axios from 'axios';
import { APP_CONFIG } from '../config/app.config';

const ApiService = axios.create({
  baseURL: `${APP_CONFIG.API_BASE_URL}/api`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ApiService;