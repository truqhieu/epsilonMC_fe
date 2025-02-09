import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, setTokens, setUser } from "./authSlice";
import AuthServices from "../../services/AuthServices";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const hasTriedRefresh = sessionStorage.getItem("hasTriedRefresh");

    const refreshAccessToken = async () => {
      if (isRefreshing || hasTriedRefresh) return; // Ngăn gọi lại nhiều lần
      setIsRefreshing(true);
      sessionStorage.setItem("hasTriedRefresh", "true"); // Đánh dấu đã thử refresh

      try {
        const response = await AuthServices.refresh();

        if (response.accessToken) {
          dispatch(setTokens({ accessToken: response.accessToken }));
          dispatch(setUser(response.data.user));
          localStorage.setItem("accessToken", response.accessToken);
          sessionStorage.removeItem("hasTriedRefresh"); // Xóa dấu thử lại sau khi thành công
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        dispatch(logout());
      } finally {
        setIsRefreshing(false);
      }
    };

    if (accessToken && user) {
      dispatch(setTokens({ accessToken }));
      dispatch(setUser(user));
    } else if (!hasTriedRefresh && document.cookie.includes("refreshToken")) {
      // Chỉ thử refresh nếu refreshToken tồn tại trong cookie
      refreshAccessToken();
    }
  }, [dispatch, isRefreshing]);

  return null;
};

export default AuthLoader;
