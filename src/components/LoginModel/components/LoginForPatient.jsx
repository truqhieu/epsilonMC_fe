import { Form, Input, Button, Spin } from "antd";
import PropTypes from "prop-types";
import { UserOutlined, LockOutlined, LeftOutlined } from "@ant-design/icons";
import { LoginForStaffStyled } from "../styles";
import { useEffect, useState } from "react";
import AuthServices from "../../../services/AuthServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "../../../reduxs/authReduxs/authSlice";
import { Link } from "react-router-dom";

const LoginForPatient = ({ setRoleLogin, onCancel }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sendOTP, setSendOTP] = useState(false);

  const [formLogin] = Form.useForm();
  const dispatch = useDispatch();

  const handleSendOTP = async () => {
    try {
      if (email === "") {
        toast.error("Vui lòng nhập Email!");
        return;
      }
      setLoading(true);
      const res = await AuthServices.sendOTP({ email });
      if (res.success) {
        toast.success("Gửi mã OTP thành công!");
        setSendOTP(true);
        setSeconds(60);
      } else {
        toast.error("Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Send OTP Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    const values = await formLogin.validateFields();
    try {
      setLoading(true);
      const res = await AuthServices.verifyOTP(values);
      if (res.success) {
        loginPatient();
      }
    } catch (error) {
      console.error("Verify OTP Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const loginPatient = async () => {
    try {
      setLoading(true);
      const res = await AuthServices.loginPatient({ email });
      if (res.success) {
        dispatch(
          setTokens({
            accessToken: res.accessToken,
          })
        );
        dispatch(setUser(res.user));
        sessionStorage.removeItem("hasTriedRefresh");
        onCancel();
        toast.success("Đăng nhập thành công!");
      }
      if (!res.success) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seconds <= 0) return;
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // xóa interval khi seconds thay đổi
    return () => clearInterval(intervalId);
  }, [seconds]);

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
        {sendOTP ? (
          <div className="error">Gửi lại mã OTP sau {seconds} giây</div>
        ) : null}
        <Form
          form={formLogin}
          name="normal_login"
          className="login-form"
          style={{ width: "70%", margin: "auto" }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập Email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <div className="otp" style={{ display: "flex" }}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Vui lòng nhập Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                style={{
                  backgroundColor: "#3e70a7",
                  color: "white",
                }}
                onClick={handleSendOTP} // Gửi mã otp
                disabled={seconds > 0}
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
        <div className="booing-order">
          Nếu đây là lần đầu bạn đến với chúng tôi vui lòng{" "}
          <Link to="/dat-lich">đăng ký</Link> !
        </div>
      </LoginForStaffStyled>
    </Spin>
  );
};

LoginForPatient.propTypes = {
  setRoleLogin: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LoginForPatient;
