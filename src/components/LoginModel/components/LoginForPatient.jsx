import { Form, Input, Button, Spin } from "antd";
import PropTypes from "prop-types";
import { UserOutlined, LockOutlined, LeftOutlined } from "@ant-design/icons";
import { LoginForStaffStyled } from "../styles";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import AuthServices from "../../../services/AuthServices";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const LoginForPatient = ({ setRoleLogin, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { setUserRole, setAccessToken, setRefreshToken } = useAuth();

  const [formLogin] = Form.useForm();

  const loginAccout = async () => {
    try {
      setLoading(true);
      const res = await AuthServices.loginPatient(phoneNumber);
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
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const setUpRecaptcha = async () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        defaultCountry: "VN",
      }
    );
    await window.recaptchaVerifier.render();
  };

  const handleSendOTP = async () => {
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);

      window.confirmationResult = confirmationResult;
      console.log("OTP đã được gửi");
    } catch (error) {
      console.error("SMS not sent", error);
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      loginAccout();
      console.log("Đăng nhập thành công", result.user);
    } catch (error) {
      console.error("Mã OTP không chính xác", error);
    }
  };

  console.log(phoneNumber, otp);

  useEffect(() => {
    setUpRecaptcha();
  }, []);

  return (
    <Spin spinning={loading}>
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
            rules={[
              { required: true, message: "Vui lòng nhập Số Điện Thoại!" },
            ]}
          >
            <div className="otp" style={{ display: "flex" }}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Số Điện Thoại"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                style={{
                  backgroundColor: "#3e70a7",
                  color: "white",
                }}
                onClick={handleSendOTP} // Gửi mã OTP
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
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-form-button"
              onClick={verifyOTP}
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
        <div id="recaptcha-container"></div>
      </LoginForStaffStyled>
    </Spin>
  );
};

LoginForPatient.propTypes = {
  setRoleLogin: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LoginForPatient;
