// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./NavbarUser.css";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../LoginModel/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduxs/authReduxs/authSlice";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import AuthServices from "../../services/AuthServices";

const NavbarUser = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    AuthServices.logout();

    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <div className="navbar-user">
      <div className="navbar-user-left">
        <Link to="/" style={{ textDecoration: "none", color: "#0787b2" }}>
          <h2>EPSILON HEAVEN</h2>
        </Link>
      </div>

      <div className="navbar-user-right">
        {!accessToken ? (
          <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
        ) : (
          <div className="navbar-user-profile">
            <div className="profile">
              <div className="account-name">{user?.name}</div>
              <div className="avatar-frame">
                <img src={assets.avatar} alt="" className="avatar" />
              </div>
            </div>
            <ul className="navbar-user-profile-dropdown">
              <li>
                <UserOutlined />
                <p style={{ width: "max-content" }}>Tài khoản</p>
              </li>
              <hr />
              <li onClick={() => handleLogout()}>
                <LogoutOutlined />
                <p style={{ width: "max-content" }}>Đăng xuất</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {!!showLogin && (
        <LoginForm open={showLogin} onCancel={() => setShowLogin(false)} />
      )}
    </div>
  );
};

NavbarUser.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default NavbarUser;
