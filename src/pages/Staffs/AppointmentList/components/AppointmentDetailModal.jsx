// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomModal from "../../../../components/CustomModal";
import AppointmentServices from "../../../../services/AppointmentServices";
import { DetailAppointment } from "../styles";

const AppointmentDetailModal = ({ open, onCancel, selectedAppointment }) => {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    const getAppointmentById = async (id) => {
      try {
        setLoading(true);
        const res = await AppointmentServices.getAppointmentById(id);
        if (res.success) {
          setAppointment(res.data);
        }
        console.log(appointment);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (open && selectedAppointment) {
      getAppointmentById(selectedAppointment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedAppointment]);

  return (
    <CustomModal
      title="Chi tiết lịch khám"
      open={open}
      onCancel={onCancel}
      loading={loading}
      width={800}
      footer={null}
    >
      <DetailAppointment>
        <div className="detail-appointment">
          Bệnh nhân: {appointment.patient?.name}
          Số điện thoại: {appointment.patient?.phone}
          Email: {appointment.patient?.email}
          Địa chỉ: {appointment.patient?.address}
          Giới tính: {appointment.patient?.gender}
          Ngày sinh: {appointment.patient?.dob}
          Ngày khám: {appointment.examinationDate}
          Ca khám: {appointment.exam_id?.examination}
          Trạng thái: {appointment.status}
          Triệu chứng: {appointment.symptom}
        </div>
      </DetailAppointment>
    </CustomModal>
  );
};

AppointmentDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.string.isRequired,
};

export default AppointmentDetailModal;
