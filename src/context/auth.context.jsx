import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("guest"); // Default là guest

  const login = (userInfo, userRole) => {
    setUser(userInfo);
    setRole(userRole); // Xác định role sau khi login
  };

  const logout = () => {
    setUser(null);
    setRole("guest"); // Reset về guest khi logout
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const contextValue = {
    user,
    role,
    login,
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

export const useAuth = () => useContext(AuthContext);
