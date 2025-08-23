import axios from "axios";

export const fetcher = (url) => api.get(url).then((res) => res);

export const postFetcher = (url, params) => {
  return api.post(url, params).then((res) => res.data);
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error;
  }
);

api.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    throw error;
  }
);

export default api;
