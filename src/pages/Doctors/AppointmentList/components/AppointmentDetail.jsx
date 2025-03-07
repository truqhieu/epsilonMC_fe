// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "antd";
import PropTypes from "prop-types";
import CustomModal from "../../../../components/CustomModal";
import { DetailAppointment } from "../styles";
import { formatDate } from "../../../../utils/timeConfig";
import AppointmentServices from "../../../../services/AppointmentServices";
import TextArea from "antd/es/input/TextArea";
import MedicalRecordServices from "../../../../services/MedicalRecordServices";
import { InfoRow } from "../../../../components/InfoRow";

const AppointmentDetail = ({ open, onCancel, selectedAppointment }) => {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState({});

  const [formMedicalRecord] = Form.useForm();

  const getAppointmentById = async (id) => {
    try {
      setLoading(true);
      const res = await AppointmentServices.getAppointmentById(id);
      if (res.success) {
        setAppointment(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addMedicalRecord = async () => {
    const values = formMedicalRecord.getFieldsValue();
    try {
      setLoading(true);
      const res = await MedicalRecordServices.addMedicalRecord({
        ...values,
        symptom: appointment.symptom,
        patientId: appointment.patient._id,
        appointmentId: appointment._id,
        doctorId: appointment.doctor._id,
        createdBy: appointment.doctor._id,
        typeAppointment: appointment?.typeAppointment,
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

  useEffect(() => {
    if (open && selectedAppointment) {
      getAppointmentById(selectedAppointment?._id);
    }
  }, [open, selectedAppointment]);

  return (
    <CustomModal
      title="Hồ sơ bệnh án"
      open={open}
      onCancel={onCancel}
      loading={loading}
      width={700}
      footer={null}
      style={{ top: 20 }}
    >
      <DetailAppointment>
        <div className="detail-appointment">
          <div className="personal-info">
            <div className="examination-date">
              <InfoRow label="Bệnh nhân:" value={appointment.patient?.name} />
              <strong>{appointment.patient?.gender === "male" ? "Nam" : "Nữ"}</strong>
            </div>
            <InfoRow label="Ngày sinh:" value={formatDate(appointment.patient?.birthDay)} />
            <InfoRow label="Triệu chứng:" value={appointment.symptom} />

            <Form layout="vertical" form={formMedicalRecord}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="diagnose"
                    label="Chẩn đoán"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập chẩn đoán",
                      },
                    ]}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="treatment_plan"
                    label="Hướng điều trị"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập hướng điều trị",
                      },
                    ]}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="note"
                    label="Ghi chú"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập ghi chú",
                      },
                    ]}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          {appointment?.status === "Approved" && (
            <div className="button-action">
              <Button
                type="primary"
                style={{ backgroundColor: "#389E0D" }}
                onClick={() => {
                  addMedicalRecord();
                }}
              >
                Hoàn thành ca khám
              </Button>
            </div>
          )}
        </div>
      </DetailAppointment>
    </CustomModal>
  );
};
AppointmentDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.object,
};

export default AppointmentDetail;
