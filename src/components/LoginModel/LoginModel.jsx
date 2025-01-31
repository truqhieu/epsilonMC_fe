// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
// import { Button, Form, Input } from "antd";
import { LoginModel } from "./styles";
import LoginForPatient from "./components/LoginForPatient";
import RoleLogin from "./components/RoleLogin";
import LoginForStaff from "./components/LoginForStaff";

const LoginForm = ({ open, onCancel }) => {
  const [roleLogin, setRoleLogin] = useState("");

  return (
    <LoginModel
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      {roleLogin === "" ? (
        <RoleLogin setRoleLogin={setRoleLogin} />
      ) : roleLogin === "patient" ? (
        <LoginForPatient setRoleLogin={setRoleLogin} onCancel={onCancel} />
      ) : (
        <LoginForStaff setRoleLogin={setRoleLogin} onCancel={onCancel} />
      )}
    </LoginModel>
  );
};
LoginForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LoginForm;
