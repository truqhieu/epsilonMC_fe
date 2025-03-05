import styled from "styled-components";

export const BookingPageContainer = styled.div`
  .booking-page {
    margin: 2vh 30vh;
  }

  .steps-content {
    margin: 20px 150px;
  }

  .booking-form {
    border: 2px solid #d4d9e4;
    background-color: #f3f5fa;
    padding: 20px 40px;
  }

  .booking-form-title {
    font-size: 1.5em;
    margin-bottom: 15px;
    text-align: center;
  }

  .booking-btn {
    background-color: #ff4d4d;
    color: white;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    width: 100%;
  }

  .booking-btn:hover {
    background-color: #cc0000;
  }

  .info-patient {
    margin-bottom: 20px;
  }

  .info-patient-title {
    font-size: 1.1em;
    margin-bottom: 10px;
  }

  .info-patient-content {
    display: flex;
    justify-content: space-between;
    font-size: 1em;
    margin-bottom: 10px;
    margin-top: 10px;
    border: 1px solid #d4d9e4;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
  }

  .patient-icon {
    margin-right: 10px;
  }
`;

export const PaymentContainer = styled.div`
  .payment-page {
    display: flex;
    gap: 50px;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .content-title {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    width: 400px;
  }

  .content-bank {
    font-size: 1.2em;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .content-account {
    font-size: 1.2em;
    margin-bottom: 10px;
    font-weight: 600;
  }
  .content-amount {
    font-size: 1.2em;
    margin-bottom: 10px;
    font-weight: 600;
  }
`;

export const ConfirmBookingContainer = styled.div`
  .confirm-booking-page {
    margin: 2vh 30vh;
    text-align: center;
  }

  .check-icon {
    color: #1ab2c9;
    border: 2px solid #1ab2c9;
    border-radius: 20%;
    padding: 20px;
    font-size: 10rem;
    margin: 50px auto;
  }

  .content-title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .note {
    width: 100%;
    font-size: 0%.8;
    margin-bottom: 30px;
  }

  .button-confirm {
    background-color: #ff4d4d;
    color: white;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }
`;

export const DetailStyles = styled.div`
  .detail-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .detail-content {
    display: flex;
    flex-direction: column;

    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 10px;
    border-radius: 16px;
    padding: 20px;
  }

  .examination-date {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .reAppointment {
    margin: 0 auto;
    background: #73d0f4;
    color: #fff;
    border-radius: 16px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    font-size: 16px;
    &:hover {
      background: #3161ad;
    }
  }
`;
