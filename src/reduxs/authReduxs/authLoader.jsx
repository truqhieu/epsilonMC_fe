import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "./authSlice";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken && refreshToken && user) {
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return null;
};

export default AuthLoader;
