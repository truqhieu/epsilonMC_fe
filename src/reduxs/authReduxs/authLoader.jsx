import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setTokens, setUser } from "./authSlice";
import AuthServices from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Truy xuất thông tin người dùng và accessToken từ Redux
  const { accessToken, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const hasTriedRefresh = sessionStorage.getItem("hasTriedRefresh");

    const refreshAccessToken = async () => {
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
      }
    };

    if (accessToken && user) {
      // Nếu đã có accessToken và user trong Redux, set lại chúng
      dispatch(setTokens({ accessToken }));
      dispatch(setUser(user));

      if (user.role) {
        if (user.role === "patient") {
          // navigate("/");
        } else {
          navigate(`/${user.role}`);
        }
      }
    } else if (!hasTriedRefresh && document.cookie.includes("refreshToken")) {
      // Nếu chưa thử refresh, và có refresh token trong cookie, thực hiện refresh
      refreshAccessToken();
    }
  }, [dispatch, accessToken, user, navigate]);

  return null;
};

export default AuthLoader;
