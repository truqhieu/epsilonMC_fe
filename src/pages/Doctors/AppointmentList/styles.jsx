import styled from "styled-components";

export const DetailAppointment = styled.div`
  .detail-appointment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1.2em;
  }

  .personal-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .examination-date {
    display: flex;
    gap: 80px;
    align-items: center;
  }

  .button-action {
    margin-top: 30px;
    display: flex;
    gap: 50px;
    justify-content: center;
  }

  .ant-form-item-required {
    font-size: 17px !important;
    font-weight: 600;
  }
`;

export const ReBookingStyles = styled.div`
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

  .info-detail {
    display: flex;
    gap: 60px;
    align-items: center;
  }

  .detail-content-title {
    font-weight: 700;
    color: rgb(7, 91, 181);
    font-size: 20px;
  }

  .button-action {
    margin-top: 10px;
    display: flex;
    gap: 50px;
    justify-content: center;
  }
`;
