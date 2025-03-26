// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomModal from "../../../../components/CustomModal";
import AppointmentServices from "../../../../services/AppointmentServices";
import { DetailAppointment } from "../styles";
import { convertToVietnamTime, formatDate } from "../../../../utils/timeConfig";
import { Button, Select } from "antd";
import DoctorServices from "../../../../services/DoctorServices";
import AuthServices from "../../../../services/AuthServices";
import { InfoRow } from "../../../../components/InfoRow";
import InvoiceServices from "../../../../services/InvoiceServices";

const AppointmentDetailModal = ({ open, onCancel, selectedAppointment }) => {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [listDoctor, setListDoctor] = useState([]);
  const [doctor, setDoctor] = useState("");

  const fetchAppointmentById = async () => {
    if (!selectedAppointment) return;
    setLoading(true);
    try {
      const res = await AppointmentServices.getAppointmentById(selectedAppointment);
      if (res.success) setAppointment(res.data);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorsByExam = async () => {
    if (!appointment?.examinationDate || !appointment?.exam_id?._id) return;
    setLoading(true);
    try {
      const res = await DoctorServices.getListDoctorsByExam({
        date: appointment.examinationDate,
        exam_id: appointment.exam_id._id,
      });
      if (res.success) setListDoctor(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppointment = async (status) => {
    if (!appointment?._id) return;
    setLoading(true);
    try {
      const res = await AppointmentServices.updateAppointment(appointment._id, {
        doctor: doctor || appointment?.doctor?._id,
        status,
        date: appointment.examinationDate,
        exam_id: appointment.exam_id._id,
        patientId: appointment.patient._id,
        typeAppointment: appointment?.typeAppointment,
      });
      if (res.success) {
        if (status === "Approved" && appointment?.patient?.isAccount === false) {
          await registerAccount();
        }
        await sendEmail(status);
        onCancel();
      }
    } catch (error) {
      console.error(`Error updating appointment (${status}):`, error);
    } finally {
      setLoading(false);
    }
  };

  const registerAccount = async () => {
    try {
      await AuthServices.register({
        email: appointment.patient.email,
        phone: appointment.patient.phone,
        patientId: appointment.patient._id,
        role: "patient",
      });
    } catch (error) {
      console.error("Error registering patient account:", error);
    }
  };

  const sendEmail = async (status) => {
    setLoading(true);
    try {
      const res = await (status === "Approved"
        ? AppointmentServices.sendMailApproved
        : AppointmentServices.sendMailRejected)({
        id: appointment._id,
        email: appointment.patient.email,
        date: appointment.examinationDate,
        exam: appointment.exam_id.examination,
      });
      if (!res.success) console.error("Failed to send email notification");
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!appointment?._id) return;
    setLoading(true);
    try {
      const res = await InvoiceServices.updateInvoice({
        appointmentId: appointment._id,
        status: "Paid",
      });
      if (res.success) {
        handleUpdateAppointment("Approved");
        onCancel();
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchAppointmentById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedAppointment]);

  useEffect(() => {
    if (appointment) {
      fetchDoctorsByExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment]);

  return (
    <CustomModal
      title="Chi tiết lịch khám"
      open={open}
      onCancel={onCancel}
      loading={loading}
      width={650}
      footer={null}
      style={{ top: 20 }}
    >
      <DetailAppointment>
        <div className="detail-appointment">
          <div className="personal-info">
            <InfoRow label="Bệnh nhân:" value={appointment?.patient?.name} />
            <InfoRow
              label="Giới tính:"
              value={appointment?.patient?.gender === "male" ? "Nam" : "Nữ"}
            />
            <InfoRow label="Ngày sinh:" value={formatDate(appointment?.patient?.birthDay)} />
            <InfoRow label="Số điện thoại:" value={appointment?.patient?.phone} />
            <InfoRow label="Email:" value={appointment?.patient?.email} />
            <InfoRow label="Địa chỉ:" value={appointment?.patient?.address} />
            <InfoRow
              label="Ngày khám:"
              value={convertToVietnamTime(appointment?.examinationDate)}
            />
            <InfoRow label="Trạng thái:" value={appointment?.status} isTag={true} />
            <InfoRow label="Triệu chứng:" value={appointment?.symptom} />
            <InfoRow
              label="Bác sĩ phụ trách:"
              value={
                appointment?.doctor?.name || (
                  <Select
                    value={doctor || undefined}
                    placeholder="Chọn bác sĩ phụ trách"
                    options={listDoctor.map((item) => ({ value: item._id, label: item.name }))}
                    onChange={setDoctor}
                    allowClear
                  />
                )
              }
            />
          </div>

          {appointment?.status === "Pending" && (
            <div className="button-action">
              <Button
                type="primary"
                style={{ backgroundColor: "#389E0D" }}
                onClick={() => handleUpdateAppointment("Approved")}
              >
                Xác nhận lịch hẹn
              </Button>
              <Button type="primary" danger onClick={() => handleUpdateAppointment("Rejected")}>
                Từ chối lịch hẹn
              </Button>
            </div>
          )}

          {appointment?.status === "Approved" && (
            <Button
              type="primary"
              danger
              onClick={() => handleUpdateAppointment("Cancelled")}
              style={{ width: "30%", margin: "20px auto 5px" }}
            >
              Hủy lịch hẹn
            </Button>
          )}

          {appointment?.status === "PendingPayment" && (
            <Button
              type="primary"
              className="button-action"
              onClick={handleConfirmPayment}
              style={{ backgroundColor: "#389E0D", width: "30%", margin: "20px auto 5px" }}
            >
              Xác nhận thanh toán
            </Button>
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
