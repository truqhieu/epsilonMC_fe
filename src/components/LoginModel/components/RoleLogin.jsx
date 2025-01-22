// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { assets } from "../../../assets/assets";

const RoleLogin = ({ setRoleLogin }) => {
  return (
    <div className="login-model">
      <div className="header">
        <img src={assets.logo} alt="logo" className="logo"></img>
        <div className="title">ĐĂNG NHẬP</div>
      </div>
      <div className="button">
        <div className="role-button" onClick={() => setRoleLogin("patient")}>
          Bệnh nhân
        </div>
        <div className="role-button" onClick={() => setRoleLogin("staff")}>
          Nhân viên
        </div>
      </div>
    </div>
  );
};
RoleLogin.propTypes = {
  setRoleLogin: PropTypes.func.isRequired,
};
export default RoleLogin;
