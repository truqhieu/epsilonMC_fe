// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomModal from "../../../../components/CustomModal";
import AppointmentServices from "../../../../services/AppointmentServices";
import { DetailAppointment } from "../styles";
import { formatDate } from "../../../../utils/timeConfig";
import { Button, Select, Tag } from "antd";
import { getColorByStatus } from "../../../../utils/getColorByStatus";
import DoctorServices from "../../../../services/DoctorServices";
import AuthServices from "../../../../services/AuthServices";

const AppointmentDetailModal = ({ open, onCancel, selectedAppointment }) => {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState({});
  const [listDoctor, setListDoctor] = useState([]);
  const [doctor, setDoctor] = useState("");

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

  const getListDoctorByExam = async () => {
    try {
      setLoading(true);
      const res = await DoctorServices.getListDoctorsByExam({
        date: appointment.examinationDate,
        exam_id: appointment.exam_id._id,
      });
      if (res.success) setListDoctor(res.data);
      console.log(listDoctor);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id, status) => {
    try {
      const res = await AppointmentServices.updateAppointment(id, {
        doctor: doctor,
        status: status,
        date: appointment.examinationDate,
        exam_id: appointment.exam_id._id,
        patientId: appointment.patient._id,
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

  const registerAccount = async () => {
    try {
      setLoading(true);
      await AuthServices.register({
        email: appointment.patient.email,
        phone: appointment.patient.phone,
        patientId: appointment.patient._id,
        role: "patient",
      });
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

  useEffect(() => {
    if (appointment) {
      getListDoctorByExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment]);

  const sendEmail = async (status) => {
    try {
      setLoading(true);
      const res = await (status === "approved"
        ? AppointmentServices.sendMailApproved
        : AppointmentServices.sendMailRejected)({
        email: appointment.patient.email,
        date: appointment.examinationDate,
        exam: appointment.exam_id.examination,
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

  const handleUpdateAppointment = () => {
    if (!appointment?._id) return;

    updateAppointment(appointment._id, "Approved");

    if (appointment?.patient?.isAccount === false) {
      registerAccount();
    }

    sendEmail("approved");
  };

  const handleRejectAppointment = () => {
    if (!appointment?._id) return;
    updateAppointment(appointment._id, "Rejected");
    sendEmail("rejected");
  };

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
      title="Chi tiết lịch khám"
      open={open}
      onCancel={onCancel}
      loading={loading}
      width={650}
      footer={null}
    >
      <DetailAppointment>
        <div className="detail-appointment">
          <div className="personal-info">
            <InfoRow label="Bệnh nhân:" value={appointment.patient?.name} />
            <InfoRow
              label="Giới tính:"
              value={appointment.patient?.gender === "male" ? "Nam" : "Nữ"}
            />
            <InfoRow
              label="Ngày sinh:"
              value={formatDate(appointment.patient?.birthDay)}
            />
            <InfoRow
              label="Số điện thoại:"
              value={appointment.patient?.phone}
            />
            <InfoRow label="Email:" value={appointment.patient?.email} />
            <InfoRow label="Địa chỉ:" value={appointment.patient?.address} />
            <div className="examination-date">
              <InfoRow
                label="Ngày khám:"
                value={formatDate(appointment.examinationDate)}
              />
              {appointment.exam_id?.examination}
            </div>
            <InfoRow
              label="Trạng thái:"
              value={appointment.status}
              isTag={true}
            />
            <InfoRow label="Triệu chứng:" value={appointment.symptom} />
            <InfoRow
              label="Bác sĩ phụ trách:"
              value={
                appointment.doctor?.name ? (
                  appointment.doctor?.name
                ) : (
                  <Select
                    value={doctor || undefined}
                    placeholder="Chọn bác sĩ phụ trách"
                    options={(listDoctor || []).map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                    onChange={(value) => setDoctor(value)}
                    allowClear={true}
                  />
                )
              }
            />
          </div>
          {appointment.status === "Pending" && (
            <div className="button-action">
              <Button
                type="primary"
                style={{ backgroundColor: "#389E0D" }}
                onClick={handleUpdateAppointment}
              >
                Xác nhận lịch hẹn
              </Button>

              <Button type="primary" danger onClick={handleRejectAppointment}>
                Từ chối lịch hẹn
              </Button>
            </div>
          )}
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
