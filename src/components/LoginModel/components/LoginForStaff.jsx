import { Form, Input, Button, Spin } from "antd";
import PropTypes from "prop-types";
import { UserOutlined, LockOutlined, LeftOutlined } from "@ant-design/icons";
import { LoginForStaffStyled } from "../styles";
import AuthServices from "../../../services/AuthServices";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginForStaff = ({ setRoleLogin, onCancel }) => {
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLogin] = Form.useForm();
  const { setUserRole, setAccessToken, setRefreshToken } = useAuth();

  const loginAccout = async () => {
    const values = await formLogin.validateFields();
    try {
      setLoading(true);
      const res = await AuthServices.loginStaff(values);
      console.log(res.data.success);

      if (res.data.success) {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setUserRole(res.data.user.role);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userRole", res.data.user.role);
        onCancel();
        toast.success("Đăng nhập thành công!");
      }
      if (!res.data.success) {
        setLoginError(true);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <LoginForStaffStyled>
        <div className="header-login">
          <LeftOutlined
            style={{ fontSize: "20px", cursor: "pointer", color: "#3e70a7" }}
            onClick={() => setRoleLogin("")}
          />
          <div className="title-login">Đăng nhập cho Nhân Viên</div>
        </div>
        {loginError ? (
          <div className="error">Số Điện Thoại Hoặc Mật Khẩu không đúng!</div>
        ) : null}
        <Form
          form={formLogin}
          name="normal_login"
          className="login-form"
          style={{ width: "70%", margin: "auto" }}
        >
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập Số Điện Thoại!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Số Điện Thoại"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-form-button"
              onClick={loginAccout}
              style={{
                backgroundColor: "#3e70a7",
                color: "white",
                transform: "translateX(150px)",
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </LoginForStaffStyled>
    </Spin>
  );
};

LoginForStaff.propTypes = {
  setRoleLogin: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LoginForStaff;
