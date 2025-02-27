import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setTokens, setUser } from "./authSlice";
import AuthServices from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

const AuthLoader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
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
      refreshAccessToken();
    }
  }, [dispatch]);

  return null;
};

export default AuthLoader;
