// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import PropTypes from "prop-types";
import { DetailEmployessStyled } from "../styles";
import { InfoRow } from "../../../../components/InfoRow";
import { convertToVietnamTime } from "../../../../utils/timeConfig";
import { formatCurrencyVND } from "../../../../utils/moneyConfig";
import UserServices from "../../../../services/UserServices";

const DetailEmployess = ({ open, onCancel, selectedEmployess }) => {
  const [openSalary, setOpenSalary] = useState(false);
  const [salary, setSalary] = useState(selectedEmployess?.salary);

  const updateUserForDeActive = async (userId) => {
    try {
      const res = await UserServices.updateUser({
        _id: userId,
        isActive: false,
      });
      if (res?.success) {
        onCancel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSalary = async (userId) => {
    try {
      const res = await UserServices.updateUser({
        _id: userId,
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
    updateUserForDeActive(selectedEmployess?._id);
  };

  const handleUpdateSalary = () => {
    updateSalary(selectedEmployess?._id);
    setOpenSalary(false);
  };

  return (
    <CustomModal
      title="Chi tiết nhân viên"
      open={open}
      onCancel={onCancel}
      width={800}
      footer={null}
      style={{ top: 40 }}
    >
      <DetailEmployessStyled>
        <div className="detail-container">
          <div className="detail-content">
            <InfoRow label="Họ và tên" value={selectedEmployess?.name} />
            <InfoRow
              label="Giới tính"
              value={selectedEmployess?.gender === "male" ? "Nam" : "Nữ"}
            />
            <InfoRow label="Chức vụ" value={selectedEmployess?.role} />
            <InfoRow label="Email" value={selectedEmployess?.email} />
          </div>
          <div className="detail-content">
            <InfoRow label="Ngày sinh" value={convertToVietnamTime(selectedEmployess?.birthDay)} />
            <InfoRow label="Số điện thoại" value={selectedEmployess?.phone} />
            <InfoRow label="Địa chỉ" value={selectedEmployess?.address} />
          </div>
          <div className="detail-content">
            <InfoRow
              label="Trạng thái"
              value={selectedEmployess?.isActive === true ? "Hoạt động" : "Khóa"}
            />
            <InfoRow label="Lương" value={formatCurrencyVND(selectedEmployess?.salary)} />
            <InfoRow
              label="Ngày vào làm"
              value={convertToVietnamTime(selectedEmployess?.createdAt)}
            />
            {selectedEmployess?.isActive === false && (
              <InfoRow
                label="Ngày nghỉ việc"
                value={convertToVietnamTime(selectedEmployess?.updatedAt)}
              />
            )}
          </div>
          {selectedEmployess?.isActive === true && (
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

DetailEmployess.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  selectedEmployess: PropTypes.object,
};

export default DetailEmployess;
