// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { InfoRow } from "../../../../components/InfoRow";
import { convertToVietnamTime } from "../../../../utils/timeConfig";
import { DetailEmployessStyled } from "../../EmployessManager/styles";
import { formatCurrencyVND } from "../../../../utils/moneyConfig";
import DoctorServices from "../../../../services/DoctorServices";

const DetailDoctor = ({ open, onCancel, selectedDoctor }) => {
  const [openSalary, setOpenSalary] = useState(false);
  const [salary, setSalary] = useState(selectedDoctor?.salary);

  const updateUserForDeActive = async (doctorId) => {
    try {
      const res = await DoctorServices.updateDoctor({
        _id: doctorId,
        isActive: false,
      });
      if (res?.success) {
        onCancel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSalary = async (doctorId) => {
    try {
      const res = await DoctorServices.updateDoctor({
        _id: doctorId,
        salary: salary,
      });
      if (res?.success) {
        onCancel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    updateUserForDeActive(selectedDoctor?._id);
  };

  const handleUpdateSalary = () => {
    updateSalary(selectedDoctor?._id);
    setOpenSalary(false);
  };

  return (
    <CustomModal
      title="Chi tiết bác sĩ"
      open={open}
      onCancel={onCancel}
      width={800}
      footer={null}
      style={{ top: 40 }}
    >
      <DetailEmployessStyled>
        <div className="detail-container">
          <div className="detail-content">
            <InfoRow label="Họ và tên" value={selectedDoctor?.name} />
            <InfoRow label="Giới tính" value={selectedDoctor?.gender === "male" ? "Nam" : "Nữ"} />
            <InfoRow label="Email" value={selectedDoctor?.email} />
            <InfoRow label="Chuyên khoa" value={selectedDoctor?.specialization} />
            <InfoRow label="Kinh nghiệm" value={selectedDoctor?.exp} />
          </div>
          <div className="detail-content">
            <InfoRow label="Ngày sinh" value={convertToVietnamTime(selectedDoctor?.birthDay)} />
            <InfoRow label="Số điện thoại" value={selectedDoctor?.phone} />
            <InfoRow label="Địa chỉ" value={selectedDoctor?.address} />
          </div>
          <div className="detail-content">
            <InfoRow
              label="Trạng thái"
              value={selectedDoctor?.isActive === true ? "Hoạt động" : "Khóa"}
            />
            <InfoRow label="Lương" value={formatCurrencyVND(selectedDoctor?.salary)} />
            <InfoRow label="Ngày vào làm" value={convertToVietnamTime(selectedDoctor?.createdAt)} />
            {selectedDoctor?.isActive === false && (
              <InfoRow
                label="Ngày nghỉ việc"
                value={convertToVietnamTime(selectedDoctor?.updatedAt)}
              />
            )}
          </div>
          {selectedDoctor?.isActive === true && (
            <div className="button-detail">
              <button className="button-confirm" onClick={handleConfirm}>
                Xác nhận nghỉ việc
              </button>
              <button className="button-confirm" onClick={() => setOpenSalary(true)}>
                Cập nhật lương
              </button>
            </div>
          )}
        </div>
        {openSalary && (
          <CustomModal
            title="Cập nhật lương"
            open={openSalary}
            onCancel={() => setOpenSalary(false)}
            width={500}
            footer={null}
            style={{ top: 100 }}
          >
            <div className="update-salary">
              <div
                className="input-salary"
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="label-salary" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Lương mới:
                </span>
                <input
                  type="number"
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Nhập lương mới"
                />
                <button
                  className="button-confirm"
                  onClick={handleUpdateSalary}
                  style={{
                    width: "100px",
                    height: "36px",
                    marginLeft: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#4b8dca",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </CustomModal>
        )}
      </DetailEmployessStyled>
    </CustomModal>
  );
};

DetailDoctor.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedDoctor: PropTypes.object,
};

export default DetailDoctor;
