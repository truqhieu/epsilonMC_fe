// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Navbar.css";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import LoginForm from "../LoginModel/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduxs/authReduxs/authSlice";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import AuthServices from "../../services/AuthServices";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    AuthServices.logout();
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/trang-chu" onClick={() => setMenu("home")}>
          <img src={assets.logo} alt="logo" className="logo"></img>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="navbar-branch">Trung tâm chữa lành tâm hồn EPSILON</div>
        <div className="navbar-menu">
          <Link
            to="/gioi-thieu"
            onClick={() => setMenu("about")}
            className={menu === "about" ? "active" : ""}
          >
            Giới thiệu
          </Link>
          <Link
            to="/thong-tin"
            onClick={() => setMenu("information")}
            className={menu === "information" ? "active" : ""}
          >
            Khám - Tư vấn
          </Link>
          <Link
            to="/tin-tuc"
            onClick={() => setMenu("news")}
            className={menu === "news" ? "active" : ""}
          >
            Tin tức
          </Link>
          <Link
            to="/lien-he"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Liên hệ
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        {!accessToken ? (
          <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
        ) : (
          <div className="navbar-profile">
            <div className="profile">
              <div className="account-name">{user?.name}</div>
              <div className="avatar-frame">
                <img src={assets.avatar} alt="" className="avatar" />
              </div>
            </div>
            <ul className="navbar-profile-dropdown">
              <li onClick={() => setMenu("profile")}>
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

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
