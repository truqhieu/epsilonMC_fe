// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import AppointmentServices from "../../../services/AppointmentServices";
import ExamServices from "../../../services/ExamServices";
import axios from "axios";
import PropTypes from "prop-types";

const BookingForm = ({ next, setAmount }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [listProvices, setListProvinces] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [codeProvinces, setCodeProvinces] = useState(0);
  const [listDistricts, setListDistricts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [codeDistricts, setCodeDistricts] = useState(0);
  const [listWards, setListWards] = useState([]);
  const [wards, setWards] = useState([]);
  const [exam, setExam] = useState();

  const [formBooking] = Form.useForm();

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

  const getAllProvices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://open.oapi.vn/location/provinces?page=0&size=63"
      );

      if (res) {
        setListProvinces(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDistrictsByProvices = async (code) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://open.oapi.vn/location/districts/${code}?page=0&size=100`
      );
      if (res) {
        setListDistricts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getWardsByDistricts = async (code) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://open.oapi.vn/location/wards/${code}?page=0&size=100`
      );
      if (res) {
        setListWards(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (values) => {
    try {
      setLoading(true);
      const res = await AppointmentServices.addAppointment({
        ...values,
        amount: 5000,
      });
      if (res?.success) {
        localStorage.setItem("invoiceId", res.invoiceId);
      }
      next();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    formBooking
      .validateFields()
      .then((values) => {
        addAppointment(values);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  useEffect(() => {
    getListExam();
    getAllProvices();
  }, []);

  useEffect(() => {
    if (codeProvinces) {
      getDistrictsByProvices(codeProvinces);
    }
    if (codeDistricts) {
      getWardsByDistricts(codeDistricts);
    }
  }, [codeProvinces, codeDistricts]);

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
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                style={{ flex: 1 }}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                </Select>
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
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", gap: "10px" }}>
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
            </div>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Item
                name="provinces"
                label="Tỉnh/Thành phố"
                rules={[
                  { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
                ]}
                style={{ flex: 1 }}
              >
                <Select
                  value={provinces}
                  onChange={(value, option) => {
                    setProvinces(value);
                    setCodeProvinces(option.id);
                  }}
                  placeholder="Tỉnh/Thành phố"
                  options={listProvices.map((item) => ({
                    id: item.id,
                    value: item.name,
                    label: item.name,
                  }))}
                  virtual
                  allowClear={true}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Form.Item>
              <Form.Item
                name="districts"
                label="Quận/Huyện"
                rules={[
                  { required: true, message: "Vui loàng chọn Quận/Huyện" },
                ]}
                style={{ flex: 1 }}
              >
                <Select
                  value={districts}
                  onChange={(value, option) => {
                    setDistricts(value);
                    setCodeDistricts(option.id);
                  }}
                  placeholder="Quận/Huyện"
                  options={listDistricts.map((item) => ({
                    id: item.id,
                    value: item.name,
                    label: item.name,
                  }))}
                  allowClear={true}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Form.Item>
              <Form.Item
                name="wards"
                label="Phường/Xã"
                rules={[
                  { required: true, message: "Vui loàng chọn Phường/Xã" },
                ]}
                style={{ flex: 1 }}
              >
                <Select
                  value={wards}
                  onChange={(value) => setWards(value)}
                  placeholder="Phường/Xã"
                  options={listWards.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                  allowClear={true}
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address" style={{ flex: 1 }}>
            <Input placeholder="Địa chỉ" />
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

          <div style={{ color: "red", fontSize: "16px", textAlign: "center" }}>
            Giá dịch vụ cho lần khám đầu tiên là 1.000.000 vnđ
          </div>
          <Form.Item>
            <button
              className="booking-btn"
              onClick={() => {
                setAmount(5000);
                onSubmit();
              }}
            >
              Đặt lịch ngay
            </button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
BookingForm.propTypes = {
  next: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default BookingForm;
