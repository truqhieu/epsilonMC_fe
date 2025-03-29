// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { Form, Input, DatePicker, InputNumber, Button, Row, Col, Select } from "antd";
import DoctorServices from "../../../../services/DoctorServices";
import dayjs from "dayjs";
import { convertToVietnamTime } from "../../../../utils/timeConfig";

const { Option } = Select;

const AddDoctor = ({ open, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [birthDay, setBirthDay] = useState(null);
  const [form] = Form.useForm();

  const createDoctor = async (body) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let key in body) {
        formData.append(key, body[key]);
      }

      if (image) {
        formData.append("image", image);
      }

      const res = await DoctorServices.createDoctor(formData);
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
        createDoctor(values);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
    // createDoctor(formattedValues);
  };

  const validateAge = (_, value) => {
    if (!value) {
      return Promise.reject("Vui lòng chọn ngày!");
    }
    const minDate = dayjs().subtract(28, "year");
    if (value.isAfter(minDate)) {
      return Promise.reject("Bác sĩ phải trên 28 tuổi!");
    }
    return Promise.resolve();
  };

  return (
    <CustomModal
      title="Thêm bác sĩ mới"
      open={open}
      onCancel={onCancel}
      width={700}
      footer={null}
      style={{ top: 40 }}
      loading={loading}
    >
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
          <Col span={12}>
            <Form.Item
              name="image"
              label="Hình ảnh mô tả"
              rules={[{ required: true, message: "Vui lòng thêm ảnh mô tả" }]}
            >
              <div className="add-img-upload flex-col">
                <label htmlFor="image">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="add"
                      style={{ width: "100px", height: "70px" }}
                    />
                  ) : (
                    <></>
                  )}
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  required
                />
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="birthDay" label="Ngày sinh" rules={[{ validator: validateAge }]}>
              <DatePicker
                value={birthDay ? convertToVietnamTime(birthDay) : null}
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                onChange={(date) => setBirthDay(date ? convertToVietnamTime(date) : null)}
              />
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="specialization"
              label="Chuyên khoa"
              rules={[{ required: true, message: "Vui lòng nhập Chuyên khoa" }]}
            >
              <Input placeholder="Nhập Chuyên khoa" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="exp"
              label="Kinh nghiệm làm việc"
              rules={[{ required: true, message: "Vui lòng nhập Kinh nghiệm làm việc" }]}
            >
              <Input placeholder="Nhập Kinh nghiệm làm việc" />
            </Form.Item>
          </Col>
        </Row>

        {/* Address */}
        <Form.Item name="address" label="Địa chỉ">
          <Input placeholder="Nhập địa chỉ" />
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
    </CustomModal>
  );
};

AddDoctor.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default AddDoctor;
