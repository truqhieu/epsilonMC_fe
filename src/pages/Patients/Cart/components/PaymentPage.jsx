// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { PaymentContainer } from "../../../../components/BookingPage/styles";
import CustomModal from "../../../../components/CustomModal";

const PaymentPage = ({ amount, invoiceId, open, onCancel }) => {
  const qr_url = `https://qr.sepay.vn/img?acc=67808082002&bank=TPBank&amount=${amount}&des=TKPEH ${invoiceId}`;
  return (
    <CustomModal
      title="Thanh toán"
      open={open}
      onCancel={onCancel}
      width={840}
      footer={false}
      closeIcon={false}
      maskClosable={false}
    >
      <PaymentContainer>
        <div className="payment-page">
          <img src={qr_url} alt="qr" />
          <div className="content-payment">
            <div className="content-title">
              {" "}
              Sử dụng dịch vụ quét QR của ngân hàng để tiến hành thanh toán
            </div>
            <div className="content-bank">Ngân hàng: TPBank</div>
            <div className="content-account">Số tài khoản: 67808082002</div>
            <div className="content-amount">Số tiền: {amount} VND</div>
          </div>
        </div>
      </PaymentContainer>
    </CustomModal>
  );
};

PaymentPage.propTypes = {
  amount: PropTypes.number.isRequired,
  invoiceId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaymentPage;
