import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { UserOutlined, LockOutlined, LeftOutlined } from "@ant-design/icons";
import { LoginForStaffStyled } from "../styles";
import AuthServices from "../../../services/AuthServices";
import useAuth from "../../../hooks/useAuth";

const LoginForStaff = ({ setRoleLogin, onCancel }) => {
  const [formLogin] = Form.useForm();
  const { setUserRole, setToken } = useAuth();

  const loginAccout = async () => {
    const values = await formLogin.validateFields();
    console.log(values);
    try {
      const res = await AuthServices.login(values);
      if (res.data.success) {
        setToken(res.data.token);
        setUserRole(res.data.user.role);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        console.log("Login Success:", res.data);
        onCancel();
      } else {
        console.error("Login Failed:", res.data.message);
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <LoginForStaffStyled>
      <div className="header-login">
        <LeftOutlined
          style={{ fontSize: "20px", cursor: "pointer", color: "#3e70a7" }}
          onClick={() => setRoleLogin("")}
        />
        <div className="title-login">Đăng nhập cho Nhân Viên</div>
      </div>
      <Form
        form={formLogin}
        name="normal_login"
        className="login-form"
        style={{ width: "70%", margin: "auto" }}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập Số Điện Thoại!" }]}
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
  );
};

LoginForStaff.propTypes = {
  setRoleLogin: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LoginForStaff;
