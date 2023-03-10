import axios from 'axios';
import cookie from 'js-cookie';
import { camelizeKeys, decamelizeKeys } from 'humps';

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

API.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };

    if (
      newConfig.headers &&
      newConfig.headers['Content-Type'] === 'multipart/form-data'
    )
      return newConfig;
    if (config.params) {
      newConfig.params = decamelizeKeys(config.params);
    }
    if (config.data) {
      newConfig.data = decamelizeKeys(config.data);
    }
    return newConfig;
  },
  (error) => Promise.reject(camelizeKeys(error)),
);

API.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      response.headers['content-type']?.includes('application/json')
    ) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  },
  (error) => Promise.reject(camelizeKeys(error)),
);

export default API;
