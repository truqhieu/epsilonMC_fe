// eslint-disable-next-line no-unused-vars
import React from "react";
import CustomModal from "../../CustomModal";
import { InfoRow } from "../../InfoRow";

import PropTypes from "prop-types";
import { DetailStyles } from "../styles";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { useNavigate } from "react-router-dom";

const PatientDetail = ({ open, onCancel, patient }) => {
  const navigate = useNavigate();
  return (
    <CustomModal
      title="Chi tiết bệnh nhân"
      open={open}
      onCancel={onCancel}
      footer={false}
      width={650}
    >
      <DetailStyles>
        <div className="detail-container">
          <div className="detail-content">
            <InfoRow label="Họ và tên" value={patient?.name} />
            <InfoRow label="Ngày sinh" value={convertToVietnamTime(patient?.birthDay)} />
            <InfoRow label="Giới tính" value={patient?.gender === "male" ? "Nam" : "Nữ"} />
          </div>
          <div className="detail-content">
            <InfoRow label="Số điện thoại" value={patient?.phone} />
            <InfoRow label="Email" value={patient?.email} />
            <InfoRow label="Phường/Xã" value={patient?.wards} />
            <InfoRow label="Quận/Huyện" value={patient?.districts} />
            <InfoRow label="Tỉnh/Thành phố" value={patient?.provinces} />
            <InfoRow label="Địa chỉ" value={patient?.address} />
          </div>
          <button className="reAppointment" onClick={() => navigate("/dat-lich")}>
            Chỉnh sửa
          </button>
        </div>
      </DetailStyles>
    </CustomModal>
  );
};

PatientDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
};
export default PatientDetail;
