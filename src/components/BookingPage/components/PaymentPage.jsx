// eslint-disable-next-line no-unused-vars
import React from "react";

import PropTypes from "prop-types";
import { PaymentContainer } from "../styles";

const PaymentPage = ({ qr_url, amount }) => {
  return (
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
  );
};

PaymentPage.propTypes = {
  qr_url: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default PaymentPage;
