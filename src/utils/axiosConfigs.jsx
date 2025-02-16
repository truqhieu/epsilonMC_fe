import axios from "axios";
import store from "../reduxs/store";
import { logout, setTokens } from "../reduxs/authReduxs/authSlice";
import AuthServices from "../services/AuthServices";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Gửi cookie HTTP-Only
});

// Hàm làm mới accessToken bằng refreshToken
const refreshAccessToken = async () => {
  try {
    const response = await AuthServices.refresh(); // Gửi cookie HTTP-Only

    // Cập nhật accessToken vào Redux
    store.dispatch(setTokens({ accessToken: response.accessToken }));
    localStorage.setItem("accessToken", response.accessToken);
    return response.accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    store.dispatch(logout());
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

    //khac loi 401
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    //dang nhập sai
    if (
      error.response.data?.message === "Mật khẩu không chính xác" ||
      error.response.data?.message === "Người dùng không tồn tại"
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return http(originalRequest); // Gửi lại request với token mới
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
);

export default http;
