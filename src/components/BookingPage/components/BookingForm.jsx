// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import AppointmentServices from "../../../services/AppointmentServices";
import ExamServices from "../../../services/ExamServices";
import PropTypes from "prop-types";

const BookingForm = ({ setIsBooking }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [exam, setExam] = useState();

  const [formBooking] = Form.useForm();
  const values = formBooking.getFieldsValue();

  const validateAge = (_, value) => {
    if (!value) {
      return Promise.reject("Vui lòng chọn ngày!");
    }
    const minDate = dayjs().subtract(5, "year");
    if (value.isAfter(minDate)) {
      return Promise.reject("Người khám phải trên 5 tuổi!");
    }
    return Promise.resolve();
  };

  const getListExam = async () => {
    try {
      setLoading(true);
      const res = await ExamServices.listExam();
      if (res.success) {
        setListExam(res.exams);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.addAppointment(values);
      if (res.success) {
        setIsBooking(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListExam();
  }, []);

  const validateDate = (_, value) => {
    if (!value) {
      return Promise.reject("Vui lòng chọn ngày!");
    }

    const minDate = dayjs().add(2, "day").startOf("day");

    if (value.isBefore(minDate)) {
      return Promise.reject(
        "Ngày khám phải từ ngày " + minDate.format("DD/MM/YYYY") + " trở đi!"
      );
    }

    return Promise.resolve();
  };

  return (
    <Spin spinning={loading}>
      <div className="booking-form">
        <div className="booking-form-title">Đặt lịch khám</div>
        <Form layout="vertical" form={formBooking}>
          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                name="name"
                label="Họ và Tên"
                rules={[
                  { required: true, message: "Vui loàng nhập họ và tên" },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[{ validator: validateAge }]}
                required
              >
                <DatePicker
                  value={birthday}
                  onChange={(date) => setBirthday(date)}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày sinh"
                />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                    pattern: /^[0-9]{10}$/,
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email hợp lệ",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="example@example.com" />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address" style={{ flex: 1 }}>
                <Input placeholder="Địa chỉ" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                label="Ngày khám"
                name="examinationDate"
                rules={[{ validator: validateDate }]}
                required
              >
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày khám"
                />
              </Form.Item>
              <Form.Item
                name="exam"
                label="Ca khám"
                rules={[{ required: true, message: "Vui loàng chọn ca khám" }]}
              >
                <Select
                  value={exam}
                  onChange={(value) => setExam(value)}
                  placeholder="Chọn ca khám"
                  options={listExam.map((item) => ({
                    value: item._id,
                    label: item.examination,
                  }))}
                  style={{ width: "185px" }}
                />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item
            label="Triệu chứng"
            name="symptom"
            rules={[
              {
                required: true,
                message: "Vui loàng nhập triệu chứng bạn đang gặp phải",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <button className="booking-btn" onClick={addAppointment}>
              Đặt lịch ngay
            </button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
BookingForm.propTypes = {
  setIsBooking: PropTypes.func.isRequired,
};

export default BookingForm;
