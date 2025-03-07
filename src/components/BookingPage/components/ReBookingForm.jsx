// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import dayjs from "dayjs";
import ExamServices from "../../../services/ExamServices";
import { useSelector } from "react-redux";
import PatientServices from "../../../services/PatientServices";
import PatientDetail from "../modal/PatientDetail";
import DoctorDetail from "../modal/DoctorDetail";
import PropTypes from "prop-types";
import AppointmentServices from "../../../services/AppointmentServices";

const ReBookingForm = ({ setAmount, setIsBooking, setCurrent }) => {
  const [loading, setLoading] = useState(true);
  const [examinationType, setExaminationType] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [listExam, setListExam] = useState([]);
  const [exam, setExam] = useState();
  const [isOpenPatient, setIsOpenPatient] = useState(false);
  const [isOpenDoctor, setIsOpenDoctor] = useState(false);
  const [patient, setPatient] = useState();

  const [formBooking] = Form.useForm();
  const { user } = useSelector((state) => state.auth);

  const validateDate = (_, value) => {
    if (!value) {
      return Promise.reject("Vui lòng chọn ngày!");
    }

    const minDate = dayjs().add(1, "day").startOf("day");

    if (value.isBefore(minDate)) {
      return Promise.reject("Ngày khám phải từ ngày " + minDate.format("DD/MM/YYYY") + " trở đi!");
    }

    return Promise.resolve();
  };

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

  const getPatient = async () => {
    try {
      setLoading(true);
      const res = await PatientServices.getPatientById(user?.id);
      if (res.success) {
        setPatient(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListExam();
    if (examinationType === 1) {
      getListExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examinationType]);

  const addAppointment = async (values) => {
    try {
      setLoading(true);
      const res = await AppointmentServices.addAppointment({
        ...values,
        patientId: user?.id,
        email: patient?.email,
        doctorId: patient?.doctor?._id,
        amount: 5000,
        emailSent: false,
        typeAppointment: 2,
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

  return (
    <Spin spinning={loading}>
      <div className="booking-form">
        <div className="booking-form-title">Đặt lịch tái khám</div>
        <Form layout="vertical" form={formBooking}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <div className="info-patient">
                <div className="info-patient-title">Người tới khám</div>
                <div className="info-patient-content" onClick={() => setIsOpenPatient(true)}>
                  <div className="patient-name">{user.name}</div>
                  <div className="patient-icon">{">"}</div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="info-patient">
                <div className="info-patient-title">Bác sĩ phụ trách</div>
                <div
                  className="info-patient-content"
                  onClick={() => {
                    setIsOpenDoctor(true);
                  }}
                >
                  <div className="patient-name">{patient?.doctor?.name}</div>
                  <div className="patient-icon">{">"}</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={6}>
              <Form.Item
                name="examinationType"
                label="Hình thức khám"
                rules={[{ required: true, message: "Vui lòng chọn hình thức khám" }]}
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
                  value={selectedDate ? convertToVietnamTime(selectedDate) : null}
                  onChange={(date) => setSelectedDate(date ? convertToVietnamTime(date) : null)}
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
            Giá dịch vụ cho lần tái khám là 800.000 vnđ
          </div>
          <Form.Item>
            <button
              className="booking-btn"
              onClick={() => {
                setAmount(5000);
                onSubmit();
              }}
            >
              Đặt lịch tái khám
            </button>
          </Form.Item>
        </Form>
      </div>
      {!!isOpenPatient && (
        <PatientDetail
          open={isOpenPatient}
          patient={patient}
          onCancel={() => setIsOpenPatient(false)}
        />
      )}
      {!!isOpenDoctor && (
        <DoctorDetail
          open={isOpenDoctor}
          doctor={patient?.doctor}
          onCancel={() => setIsOpenDoctor(false)}
        />
      )}
    </Spin>
  );
};

ReBookingForm.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  setIsBooking: PropTypes.func.isRequired,
};

export default ReBookingForm;
