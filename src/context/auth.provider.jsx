import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from ".";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userRole, setUserRole] = useState("guest"); // Default là guest

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    navigate("/");
    setUserRole("guest");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const contextValue = {
    userRole,
    setUserRole,
    logout,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
