// eslint-disable-next-line no-unused-vars
import React from "react";
import CustomModal from "../../CustomModal";

import PropTypes from "prop-types";
import { InfoRow } from "../../InfoRow";
import { convertToVietnamTime } from "../../../utils/timeConfig";
import { DetailStyles } from "../styles";

const DoctorDetail = ({ open, onCancel, doctor }) => {
  console.log(doctor);
  return (
    <CustomModal title="Chi tiết bác sĩ" open={open} onCancel={onCancel} footer={false} width={650}>
      <DetailStyles>
        <div className="detail-container">
          <div className="detail-content">
            <InfoRow label="Họ và tên" value={doctor?.name} />
            <InfoRow label="Ngày sinh" value={convertToVietnamTime(doctor?.birthDay)} />
            <InfoRow label="Giới tính" value={doctor?.gender === "male" ? "Nam" : "Nữ"} />
          </div>
          <div className="detail-content">
            <InfoRow label="Số điện thoại" value={doctor?.phone} />
            <InfoRow label="Email" value={doctor?.email} />
            <InfoRow label="Địa chỉ" value={doctor?.address} />
          </div>
          <div className="detail-content">
            <InfoRow label="Kinh nghiệm làm việc" value={doctor?.exp} />
            <InfoRow label="Chuyên khoa" value={doctor?.specialization} />
          </div>
        </div>
      </DetailStyles>
    </CustomModal>
  );
};

DoctorDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  doctor: PropTypes.object.isRequired,
};
export default DoctorDetail;
