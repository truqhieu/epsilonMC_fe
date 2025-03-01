// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Spin, Row, Col } from "antd";
import dayjs from "dayjs";
import AppointmentServices from "../../../services/AppointmentServices";
import ExamServices from "../../../services/ExamServices";
import axios from "axios";
import PropTypes from "prop-types";
import DoctorServices from "../../../services/DoctorServices";

const BookingForm = ({ setAmount, setIsBooking, setCurrent }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listExam, setListExam] = useState([]);
  const [examinationType, setExaminationType] = useState(1);
  const [listProvices, setListProvinces] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [codeProvinces, setCodeProvinces] = useState(0);
  const [listDistricts, setListDistricts] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [codeDistricts, setCodeDistricts] = useState(0);
  const [listWards, setListWards] = useState([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [doctor, setDoctor] = useState();
  const [wards, setWards] = useState([]);
  const [exam, setExam] = useState();

  const [formBooking] = Form.useForm();
  const values = formBooking.getFieldsValue();
  console.log(values);

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

  const validateDate = (_, value) => {
    if (!value) {
      return Promise.reject("Vui lòng chọn ngày!");
    }

    const minDate = dayjs().add(1, "day").startOf("day");

    if (value.isBefore(minDate)) {
      return Promise.reject(
        "Ngày khám phải từ ngày " + minDate.format("DD/MM/YYYY") + " trở đi!"
      );
    }

    return Promise.resolve();
  };

  const getLocation = async (url, setData) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation(
      "https://open.oapi.vn/location/provinces?page=0&size=63",
      setListProvinces
    );
  }, []);

  useEffect(() => {
    if (codeProvinces) {
      getLocation(
        `https://open.oapi.vn/location/districts/${codeProvinces}?page=0&size=100`,
        setListDistricts
      );
    }
    if (codeDistricts) {
      getLocation(
        `https://open.oapi.vn/location/wards/${codeDistricts}?page=0&size=100`,
        setListWards
      );
    }
  }, [codeProvinces, codeDistricts]);

  const getListExam = async () => {
    try {
      setLoading(true);
      const res = await ExamServices.listExam(examinationType);
      if (res.success) {
        setListExam(res.exams);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getListDoctorByExam = async () => {
    try {
      setLoading(true);
      const res = await DoctorServices.getListDoctorsByExam({
        date: selectedDate,
        exam_id: exam,
      });
      if (res.success) setListDoctor(res.data);
      console.log(listDoctor);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListExam();
    if (examinationType === 1) {
      getListExam();
    } else {
      getListDoctorByExam();
    }
  }, [examinationType]);

  const addAppointment = async (values) => {
    try {
      setLoading(true);
      const res = await AppointmentServices.addAppointment({
        ...values,
        amount: 5000,
      });
      if (res?.success) {
        localStorage.setItem("invoiceId", res.invoiceId);
        setIsBooking(true);
        setCurrent(1);
      }
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

  const filterOption = (input, option) =>
    option.label.toLowerCase().includes(input.toLowerCase());

  return (
    <Spin spinning={loading}>
      <div className="booking-form">
        <Form layout="vertical" form={formBooking}>
          {/* Thông tin cá nhân */}
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="name"
                label="Họ và Tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="birthday"
                label="Ngày sinh"
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
            </Col>
          </Row>

          {/* Liên hệ */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                    pattern: /^[0-9]{10}$/,
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email hợp lệ",
                  },
                ]}
              >
                <Input placeholder="example@example.com" />
              </Form.Item>
            </Col>
          </Row>

          {/* Địa chỉ */}
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="provinces"
                label="Tỉnh/Thành phố"
                rules={[
                  { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
                ]}
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
                  allowClear
                  showSearch
                  filterOption={filterOption}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="districts"
                label="Quận/Huyện"
                rules={[
                  { required: true, message: "Vui lòng chọn Quận/Huyện" },
                ]}
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
                  allowClear
                  showSearch
                  filterOption={filterOption}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="wards"
                label="Phường/Xã"
                rules={[{ required: true, message: "Vui lòng chọn Phường/Xã" }]}
              >
                <Select
                  value={wards}
                  onChange={(value) => setWards(value)}
                  placeholder="Phường/Xã"
                  options={listWards.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                  allowClear
                  showSearch
                  filterOption={filterOption}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="address" label="Địa chỉ">
            <Input placeholder="Địa chỉ" />
          </Form.Item>

          {/* Thông tin khám */}
          <Row gutter={16}>
            <Col xs={24} sm={6}>
              <Form.Item
                name="examinationType"
                label="Hình thức khám"
                rules={[
                  { required: true, message: "Vui lòng chọn hình thức khám" },
                ]}
              >
                <Select
                  value={examinationType}
                  onChange={(value) => setExaminationType(value)}
                  placeholder="Chọn hình thức khám"
                  options={[
                    { value: 2, label: "Online" },
                    { value: 1, label: "Trực tiếp" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                name="examinationDate"
                label="Ngày khám"
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
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                name="exam"
                label="Ca khám"
                rules={[{ required: true, message: "Vui lòng chọn ca khám" }]}
              >
                <Select
                  value={exam}
                  onChange={(value) => setExam(value)}
                  placeholder="Chọn ca khám"
                  options={listExam.map((item) => ({
                    value: item._id,
                    label: item.examination,
                  }))}
                  allowClear
                />
              </Form.Item>
            </Col>
            {examinationType === 2 && (
              <Col xs={24} sm={6}>
                <Form.Item
                  name="doctor"
                  label="Chọn bác sĩ"
                  rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
                >
                  <Select
                    value={doctor || undefined}
                    onChange={(value) => setDoctor(value)}
                    placeholder="Chọn bác sĩ phụ trách"
                    options={(listDoctor || []).map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                    allowClear
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Form.Item
            name="symptom"
            label="Triệu chứng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập triệu chứng bạn đang gặp phải",
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
  setCurrent: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  setIsBooking: PropTypes.func.isRequired,
};

export default BookingForm;
