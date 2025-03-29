// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { AddEmployessStyled } from "../styles";
import { Form, Input, DatePicker, InputNumber, Button, Select, Row, Col } from "antd";
import UserServices from "../../../../services/UserServices";

const { Option } = Select;

const AddEmployees = ({ open, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const createUser = async (body) => {
    try {
      setLoading(true);
      const res = await UserServices.createUser({
        ...body,
        isAccount: false,
        isActive: false,
      });
      if (res?.success) {
        console.log("User created successfully:", res.data);
        form.resetFields();
        onCancel();
      } else {
        console.error("Failed to create user:", res.data);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        createUser(values);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
    // createDoctor(formattedValues);
  };

  return (
    <CustomModal
      title="Thêm nhân viên mới"
      open={open}
      onCancel={onCancel}
      width={700}
      footer={null}
      style={{ top: 40 }}
      loading={loading}
    >
      <AddEmployessStyled>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="birthDay"
                label="Ngày sinh"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn Giới tính" }]}
              >
                <Select placeholder="Chọn Giới tính" allowClear>
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>

          {/* Address */}
          <Form.Item name="address" label="Địa chỉ">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          {/* BirthDay */}

          {/* Role */}
          <Form.Item name="role" label="Vai trò">
            <Select placeholder="Chọn vai trò" allowClear>
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>

          {/* Salary */}
          <Form.Item
            name="salary"
            label="Lương"
            rules={[{ type: "number", min: 0, message: "Lương không hợp lệ" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Nhập lương" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ margin: "0 auto", display: "block" }}>
              Thêm nhân viên
            </Button>
          </Form.Item>
        </Form>
      </AddEmployessStyled>
    </CustomModal>
  );
};

AddEmployees.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default AddEmployees;
