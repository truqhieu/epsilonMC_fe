// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { DetailMedicalRecordStyles } from "../styles";
import { InfoRow } from "../../../../components/InfoRow";
import { convertToVietnamTime } from "../../../../utils/timeConfig";
import { useSelector } from "react-redux";

const DetailMedicalRecord = ({ open, onCancel, selectedMedicalRecord }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <CustomModal title="Chi tiết hồ sơ" open={open} onCancel={onCancel} footer={false} width={650}>
      <DetailMedicalRecordStyles>
        <div className="detail-container">
          <div className="detail-content">
            <InfoRow label="Bệnh nhân" value={user?.name} />
            <div className="examination-date">
              <InfoRow
                label="Thời gian"
                value={convertToVietnamTime(selectedMedicalRecord?.examinationDate)}
              />
              <div style={{ fontWeight: "bold" }}>
                {selectedMedicalRecord?.exam_id?.examination}
              </div>
            </div>
            <InfoRow label="Triệu chứng" value={selectedMedicalRecord?.symptom} />
          </div>
          <div className="detail-content">
            <InfoRow label="Bác sĩ" value={selectedMedicalRecord?.doctorId?.name} />
            <InfoRow
              label="Dịch vụ"
              value={`Tư vấn ${
                selectedMedicalRecord?.exam_id?.examinationType === 1 ? "Trực tiếp" : "Online"
              } với BS ${selectedMedicalRecord?.doctorId?.name} `}
            />
          </div>
          <div className="detail-content">
            <InfoRow label="Chẩn đoán" value={selectedMedicalRecord?.diagnose} />
            <InfoRow label="Phương pháp điều trị" value={selectedMedicalRecord?.treatment_plan} />
            <InfoRow label="Ghi chú" value={selectedMedicalRecord?.note} />
          </div>
        </div>
      </DetailMedicalRecordStyles>
    </CustomModal>
  );
};

DetailMedicalRecord.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  selectedMedicalRecord: PropTypes.object,
};

export default DetailMedicalRecord;
