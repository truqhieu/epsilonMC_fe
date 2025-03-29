// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CustomModal from "../../CustomModal";
import PropTypes from "prop-types";
import { Button, Form, Input, Spin } from "antd";
import AuthServices from "../../../services/AuthServices";
import { toast } from "react-toastify";

const ForgotPassword = ({ open, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const forgotPasswordHandler = async (values) => {
    try {
      setLoading(true);
      const res = await AuthServices.forgotPassword(values);
      if (res.success) {
        toast.success(res.message || "Đã gửi email cấp lại mật khẩu!");
        onCancel();
      } else {
        toast.error(res.message || "Có lỗi xảy ra, vui lòng thử lại!");
      }
      form.resetFields();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error("Forgot Password Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading}>
      <CustomModal
        title="Quên mật khẩu"
        open={open}
        onCancel={onCancel}
        footer={null}
        width={500}
        style={{ top: 220 }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ padding: "0 20px" }}
          onFinish={forgotPasswordHandler}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cấp lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </CustomModal>
    </Spin>
  );
};

ForgotPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ForgotPassword;
