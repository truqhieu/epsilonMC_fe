// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { InfoRow } from "../../../../components/InfoRow";
import { ReBookingStyles } from "../styles";
import { convertToVietnamTime } from "../../../../utils/timeConfig";
import MedicalRecordServices from "../../../../services/MedicalRecordServices";
import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import ExamServices from "../../../../services/ExamServices";
import AppointmentServices from "../../../../services/AppointmentServices";

const ReBookingModal = ({ open, onCancel, selectedAppointment }) => {
  const [loading, setLoading] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [examinationType, setExaminationType] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [exam, setExam] = useState();
  const [listExam, setListExam] = useState([]);

  const [formBooking] = Form.useForm();

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

  useEffect(() => {
    getListExam();
    if (examinationType === 1) {
      getListExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examinationType]);

  const getMedicalRecord = async (appointmentId) => {
    try {
      setLoading(true);
      const res = await MedicalRecordServices.getListMedicalRecordByAppointment(appointmentId);
      if (res.success) {
        setMedicalRecord(res?.data);
      }
      console.log(medicalRecord);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAppointment) {
      getMedicalRecord(selectedAppointment._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAppointment]);

  const updateAppointment = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.updateAppointment(selectedAppointment._id, {
        doctor: selectedAppointment?.doctor,
        status: "Approved",
        date: selectedDate,
        exam: exam?._id,
        patientId: selectedAppointment?.patient?._id,
        typeAppointment: 2,
      });
      if (res.success) {
        sendEmailReminder();
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
        patientId: selectedAppointment?.patient?.id,
        email: selectedAppointment?.patient?.email,
        doctorId: selectedAppointment?.doctor,
        typeAppointment: 2,
        emailSent: false,
        amount: 5000,
      });
      if (res?.success) {
        updateAppointment();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmailReminder = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.sendMailReminder({
        email: selectedAppointment?.patient?.email,
        date: selectedDate,
        exam: exam?.examination,
      });
      if (res.success) {
        onCancel();
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
    <CustomModal
      title="Xác nhận thông tin"
      open={open}
      onCancel={onCancel}
      loading={loading}
      width={700}
      footer={null}
      style={{ top: 20 }}
    >
      <ReBookingStyles>
        <div className="detail-container">
          <div className="detail-content">
            <div className="info-detail">
              <InfoRow label="Người khám" value={selectedAppointment?.patient?.name} />
              <span style={{ fontWeight: "bold" }}>
                {selectedAppointment?.patient?.gender === "male" ? "Nam" : "Nữ"}
              </span>
            </div>
            <InfoRow
              label="Ngày sinh"
              value={convertToVietnamTime(selectedAppointment?.patient?.birthDay)}
            />
            <InfoRow label="Email" value={selectedAppointment?.patient?.email} />
            <InfoRow label="Số điện thoại" value={selectedAppointment?.patient?.phone} />
          </div>
          <div className="detail-content">
            <div className="detail-content-title"> Hồ sơ lần khám trước</div>
            <InfoRow label="Triệu chứng" value={medicalRecord?.symptom} />
            <InfoRow label="Chẩn đoán" value={medicalRecord?.diagnose} />
            <InfoRow label="Hướng điều trị" value={medicalRecord?.treatment_plan} />
            <InfoRow label="Gi chú" value={medicalRecord?.note} />
          </div>
          <div className="detail-content">
            <Form form={formBooking} layout="vertical">
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
                      value={exam?._id}
                      onChange={(value, option) =>
                        setExam({ _id: value, examination: option.label })
                      }
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
            </Form>
            <div className="button-action">
              <Button
                type="primary"
                style={{ backgroundColor: "#0794DB" }}
                onClick={() => onSubmit()}
              >
                Hẹn tái khám
              </Button>
            </div>
          </div>
        </div>
      </ReBookingStyles>
    </CustomModal>
  );
};

ReBookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.object,
};

export default ReBookingModal;
