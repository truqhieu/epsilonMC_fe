// eslint-disable-next-line no-unused-vars
import React from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { InfoRow } from "../../../../components/InfoRow";
import { convertToVietnamTime } from "../../../../utils/timeConfig";
import { DetailPatientStyled } from "../styles";

const DetailPatient = ({ open, onCancel, selectedPatient }) => {
  return (
    <CustomModal
      title="Chi tiết bệnh nhân"
      open={open}
      onCancel={onCancel}
      width={800}
      footer={null}
      style={{ top: 40 }}
    >
      <DetailPatientStyled>
        <div className="detail-container">
          <div className="detail-content">
            <InfoRow label="Họ và tên" value={selectedPatient?.name} />
            <InfoRow label="Ngày sinh" value={convertToVietnamTime(selectedPatient?.birthDay)} />
            <InfoRow label="Giới tính" value={selectedPatient?.gender === "male" ? "Nam" : "Nữ"} />
            <InfoRow label="Email" value={selectedPatient?.email} />
            <InfoRow label="Số điện thoại" value={selectedPatient?.phone} />
          </div>
          <div className="detail-content">
            <InfoRow label="Tỉnh/Thành phố" value={selectedPatient?.provinces} />
            <InfoRow label="Quận/Huyện" value={selectedPatient?.districts} />
            <InfoRow label="Phường/Xã" value={selectedPatient?.wards} />
            <InfoRow label="Địa chỉ" value={selectedPatient?.address} />
          </div>
          <div className="title-detail">Bác sĩ phụ trách</div>
          <div className="detail-content">
            <InfoRow label="Bác sĩ" value={selectedPatient?.doctor?.name} />
            <InfoRow label="Email" value={selectedPatient?.doctor?.email} />
            <InfoRow label="Số điện thoại" value={selectedPatient?.doctor?.phone} />
          </div>
        </div>
      </DetailPatientStyled>
    </CustomModal>
  );
};

DetailPatient.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  selectedPatient: PropTypes.object,
};

export default DetailPatient;
