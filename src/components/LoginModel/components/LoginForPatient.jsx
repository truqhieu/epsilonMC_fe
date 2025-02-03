import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { UserOutlined, LockOutlined, LeftOutlined } from "@ant-design/icons";
import { LoginForStaffStyled } from "../styles";

const LoginForPatient = ({ setRoleLogin }) => {
  const [formLogin] = Form.useForm();

  const getOTP = async () => {};

  const onFinish = async () => {
    try {
      const values = await formLogin.validateFields(); // Lấy dữ liệu từ form
      console.log("Received values of form: ", values);
      // Xử lý logic với dữ liệu lấy được
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <LoginForStaffStyled>
      <div className="header-login">
        <LeftOutlined
          style={{ fontSize: "20px", cursor: "pointer", color: "#3e70a7" }}
          onClick={() => setRoleLogin("")}
        />
        <div className="title-login">Đăng nhập cho Bệnh Nhân</div>
      </div>
      <Form
        form={formLogin}
        name="normal_login"
        className="login-form"
        style={{ width: "70%", margin: "auto" }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập Số Điện Thoại!" }]}
        >
          <div className="otp" style={{ display: "flex" }}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Số Điện Thoại"
            />
            <Button
              style={{
                backgroundColor: "#3e70a7",
                color: "white",
              }}
              onClick={getOTP}
            >
              Gửi OTP
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="otp"
          rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="otp"
            placeholder="Nhập mã OTP"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="login-form-button"
            onClick={onFinish}
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

LoginForPatient.propTypes = {
  setRoleLogin: PropTypes.func.isRequired,
};

export default LoginForPatient;
