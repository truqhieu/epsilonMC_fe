// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { DetailAppointmentStyles } from "../styles";
import { InfoRow } from "../../../../components/InfoRow";
import { convertToVietnamTime } from "../../../../utils/timeConfig";
import InvoiceServices from "../../../../services/InvoiceServices";
import { formatCurrencyVND } from "../../../../utils/moneyConfig";
import { Button } from "antd";
import AppointmentServices from "../../../../services/AppointmentServices";

const DetailAppointment = ({ open, onCancel, selectedAppointment }) => {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({});
  console.log("selectedAppointment", selectedAppointment);

  const getInvoice = async (id) => {
    try {
      setLoading(true);
      const res = await InvoiceServices.getInvoicesByAppointmentId(id);
      if (res?.success) {
        setInvoice(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      const res = await AppointmentServices.sendMailRejected({
        id: selectedAppointment._id,
        email: selectedAppointment.patient.email,
        date: selectedAppointment.examinationDate,
        exam: selectedAppointment.exam_id.examination,
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

  const updateAppointment = async (id, status) => {
    try {
      const res = await AppointmentServices.updateAppointment(id, {
        doctor: selectedAppointment?.doctor?._id,
        status: status,
        date: selectedAppointment.examinationDate,
        exam_id: selectedAppointment.exam_id._id,
        patientId: selectedAppointment.patient._id,
        typeAppointment: selectedAppointment?.typeAppointment,
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

  const handleRejectAppointment = () => {
    if (!selectedAppointment?._id) return;
    updateAppointment(selectedAppointment._id, "Cancelled");
    sendEmail();
  };

  useEffect(() => {
    getInvoice(selectedAppointment?._id);
  }, [open, selectedAppointment]);

  return (
    <CustomModal
      title="Chi tiết lịch khám"
      open={open}
      onCancel={onCancel}
      footer={false}
      loading={loading}
      width={650}
      style={{ top: 10 }}
    >
      <DetailAppointmentStyles>
        <div className="detail-container">
          <div className="detail-content">
            <InfoRow label="Người khám" value={selectedAppointment?.patient?.name} />
            <InfoRow label="Trạng thái" value={selectedAppointment?.status} isTag={true} />
            <InfoRow
              label="Triệu chứng"
              value={selectedAppointment?.symptom ? selectedAppointment?.symptom : "Tái khám"}
            />
          </div>
          <div className="detail-content">
            <InfoRow label="Bác sĩ" value={selectedAppointment?.doctor?.name?.toUpperCase()} />
            <InfoRow
              label="Dịch vụ"
              value={`Tư vấn ${
                selectedAppointment?.examinationType === 1 ? "Trực tiếp" : "Online"
              } với BS ${selectedAppointment?.doctor?.name} `}
            />
            <div className="examination-date">
              <InfoRow
                label="Thời gian"
                value={convertToVietnamTime(selectedAppointment?.examinationDate)}
              />
              <div style={{ fontWeight: "bold" }}>{selectedAppointment?.exam_id?.examination}</div>
            </div>
          </div>
          <div className="detail-content">
            <InfoRow label="Cơ sở y tế" value="Trung tâm chữa lành tâm hồn Epsilon" />
            <InfoRow label="Địa chỉ" value="Thạch Hòa - Thạch Thất - Hà Nội" />
            <InfoRow label="Nơi làm việc" value="Thạch Hòa - Thạch Thất - Hà Nội" />
          </div>
          <div className="detail-content">
            <InfoRow
              label="Trạng thái thanh toán"
              value={invoice?.status === "Paid" ? "Đã thanh toán" : "Chưa thanh toán"}
            />
            <InfoRow label="Giá dịch vụ" value={formatCurrencyVND(invoice?.amount)} />
            <InfoRow
              label="Tổng thanh toán"
              value={formatCurrencyVND(invoice?.amount)}
              color="red"
            />
          </div>
          {selectedAppointment.status === "Approved" ||
            (selectedAppointment.status === "PendingPayment" && (
              <Button
                type="primary"
                danger
                onClick={handleRejectAppointment}
                style={{ width: "30%", margin: "0 auto" }}
              >
                Hủy lịch hẹn
              </Button>
            ))}
        </div>
      </DetailAppointmentStyles>
    </CustomModal>
  );
};

DetailAppointment.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.object,
};

export default DetailAppointment;
