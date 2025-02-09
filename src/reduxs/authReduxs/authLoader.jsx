import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setTokens, setUser } from "./authSlice";
import AuthServices from "../../services/AuthServices";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    const refreshAccessToken = async () => {
      try {
        const response = await AuthServices.refresh(); // Gửi cookie HTTP-Only
        dispatch(setTokens({ accessToken: response.accessToken }));
        dispatch(setUser(response.data.user));
        localStorage.setItem("accessToken", response.accessToken);
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        dispatch(logout());
      }
    };

    if (accessToken && user) {
      dispatch(setTokens({ accessToken }));
      dispatch(setUser(user));
    } else {
      refreshAccessToken();
    }
  }, [dispatch]);

  return null;
};

export default AuthLoader;
