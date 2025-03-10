// eslint-disable-next-line no-unused-vars
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ConfirmBookingContainer } from "../../../../components/BookingPage/styles";
import PropTypes from "prop-types";
import CustomModal from "../../../../components/CustomModal";

const ConfirmBooking = ({ open, onCancel }) => {
  const navigate = useNavigate();
  return (
    <CustomModal title="Thanh toán" open={open} onCancel={onCancel} width={840} footer={false}>
      <ConfirmBookingContainer>
        <div className="confirm-booking-page">
          <CheckOutlined className="check-icon" />
          <div className="content-title">Đặt hàng thành công</div>
          <button className="button-confirm" onClick={() => navigate("/")}>
            Trở lại trang chủ
          </button>
        </div>
      </ConfirmBookingContainer>
    </CustomModal>
  );
};
ConfirmBooking.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmBooking;
