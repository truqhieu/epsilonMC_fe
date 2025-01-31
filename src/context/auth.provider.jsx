import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from ".";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("guest"); // Default là guest

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
    setUserRole("guest");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const contextValue = {
    userRole,
    setUserRole,
    logout,
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
