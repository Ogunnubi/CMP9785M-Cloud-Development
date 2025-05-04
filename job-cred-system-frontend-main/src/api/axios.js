import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000';


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


axiosPrivate.interceptors.request.use(
    config => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn("Access token is not available");
      }
      return config;
    },
    error => Promise.reject(error)
  );
  
export default axiosPrivate;