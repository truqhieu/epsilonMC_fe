// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { DetailAppointment } from "../../AppointmentList/styles";
import { InfoRow } from "../../../../components/InfoRow";
import MedicalRecordServices from "../../../../services/MedicalRecordServices";
import { formatDate } from "../../../../utils/timeConfig";

const MedicalRecordDetail = ({ open, onCancel, selectedRecord }) => {
  const [loading, setLoading] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState([]);

  const getMedicalRecordsById = async (id) => {
    try {
      setLoading(true);
      const res = await MedicalRecordServices.getMedicalRecordById(id);
      if (res.success) {
        setMedicalRecord(res.data);
      }
      console.log(medicalRecord);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && selectedRecord) {
      getMedicalRecordsById(selectedRecord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedRecord]);

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
              <InfoRow
                label="Bệnh nhân:"
                value={medicalRecord?.patientId?.name}
              />
              {medicalRecord?.patientId?.gender === "male" ? "Nam" : "Nữ"}
            </div>
            <InfoRow
              label="Ngày sinh:"
              value={formatDate(medicalRecord?.patientId?.birthDay)}
            />
            <InfoRow label="Triệu chứng:" value={medicalRecord?.symptom} />
            <InfoRow label="Chẩn đoán:" value={medicalRecord?.diagnose} />
            <InfoRow
              label="Hướng điều trị:"
              value={medicalRecord?.treatment_plan}
            />
            <InfoRow label="Ghi chú:" value={medicalRecord?.note} />
          </div>
        </div>
      </DetailAppointment>
    </CustomModal>
  );
};

MedicalRecordDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedRecord: PropTypes.string.isRequired,
};

export default MedicalRecordDetail;
