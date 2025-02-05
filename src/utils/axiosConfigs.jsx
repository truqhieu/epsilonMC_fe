import axios from "axios";
import store from "../reduxs/store";
import { logout, setTokens } from "../reduxs/authReduxs/authSlice";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Hàm làm mới accessToken bằng refreshToken
const refreshAccessToken = async () => {
  try {
    const { refreshToken } = store.getState().auth;
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });

    // Cập nhật accessToken mới vào Redux
    store.dispatch(
      setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken || refreshToken, // Giữ nguyên refreshToken nếu không có cái mới
      })
    );

    return response.data.accessToken;
  } catch (error) {
    store.dispatch(logout());
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

// Thêm token vào request
http.interceptors.request.use(
  async (config) => {
    let { accessToken } = store.getState().auth;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi 401 và làm mới accessToken nếu cần
http.interceptors.response.use(
  (response) => response?.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return http(originalRequest); // Gửi lại request với token mới
      }
    }

    return error.response ? error.response : Promise.reject(error);
  }
);

export default http;
