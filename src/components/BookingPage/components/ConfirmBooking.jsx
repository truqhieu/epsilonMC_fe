// eslint-disable-next-line no-unused-vars
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import { ConfirmBookingContainer } from "../styles";

const ConfirmBooking = () => {
  return (
    <ConfirmBookingContainer>
      <div className="confirm-booking-page">
        <CheckOutlined className="check-icon" />
        <div className="content-title">Đặt khám thành công</div>
        <div className="note">
          Tài khoản hệ thống của bạn sẽ sớm được cấp. Hẹn gặp bạn tại buổi hẹn
        </div>
        <button
          className="button-confirm"
          onClick={() => window.location.replace("/")}
        >
          Trở lại trang chủ
        </button>
      </div>
    </ConfirmBookingContainer>
  );
};

export default ConfirmBooking;
