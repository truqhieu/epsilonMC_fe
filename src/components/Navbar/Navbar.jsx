// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Navbar.css";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

const Navbar = ({ setShowLogin, userRole }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/trang-chu" onClick={() => setMenu("home")}>
          <img src={assets.logo} alt="logo" className="logo"></img>
        </Link>
        <div className="slogon">
          <div style={{ fontSize: "12px" }}>Chữa lành tâm vệ</div>
          <div style={{ fontSize: "12px" }}>Nâng bước tâm hồn</div>
        </div>
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
        {userRole === "admin" || !token ? (
          <></>
        ) : (
          <>
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
              <Link to="/cart">
                <img src={assets.basket_icon} alt="" />
              </Link>
            </div>
          </>
        )}

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Login</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              {userRole === "admin" ? (
                <></>
              ) : (
                <>
                  <li onClick={() => navigate("/myorders")}>
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </li>
                  <hr />
                </>
              )}
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Navbar;
