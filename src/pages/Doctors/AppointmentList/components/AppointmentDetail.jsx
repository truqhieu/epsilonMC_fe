// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Tag } from "antd";
import PropTypes from "prop-types";

import { getColorByStatus } from "../../../../utils/getColorByStatus";
import CustomModal from "../../../../components/CustomModal";
import { DetailAppointment } from "../styles";
import { formatDate } from "../../../../utils/timeConfig";
import AppointmentServices from "../../../../services/AppointmentServices";

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

  useEffect(() => {
    if (open && selectedAppointment) {
      getAppointmentById(selectedAppointment);
    }
  }, [open, selectedAppointment]);

  const InfoRow = ({ label, value, isTag }) => (
    <div className="info-row">
      <strong>{label}</strong>
      {isTag ? (
        <Tag color={getColorByStatus(value)}>{value}</Tag>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );

  InfoRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ]),
    isTag: PropTypes.bool,
  };
  return (
    <CustomModal
      title="Hồ sơ bệnh án"
      open={open}
      onCancel={onCancel}
      loading={loading}
      width={650}
      footer={null}
    >
      <DetailAppointment>
        <div className="detail-appointment">
          <div className="personal-info">
            <div className="examination-date">
              <InfoRow label="Bệnh nhân:" value={appointment.patient?.name} />
              {appointment.patient?.gender === "male" ? "Nam" : "Nữ"}
            </div>
            <InfoRow
              label="Ngày sinh:"
              value={formatDate(appointment.patient?.birthDay)}
            />

            <InfoRow label="Triệu chứng:" value={appointment.symptom} />
            <Form layout="vertical" form={formMedicalRecord}>
              <Row gutter={16}></Row>
            </Form>
          </div>
          <div className="button-action">
            <Button type="primary" style={{ backgroundColor: "#389E0D" }}>
              Hoàn thành ca khám
            </Button>
          </div>
        </div>
      </DetailAppointment>
    </CustomModal>
  );
};
AppointmentDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.string.isRequired,
};

export default AppointmentDetail;
