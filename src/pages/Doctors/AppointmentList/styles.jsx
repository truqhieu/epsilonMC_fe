import styled from "styled-components";

export const DetailAppointment = styled.div`
  .detail-appointment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1.2em;
  }

  .info-row {
    display: flex;
    gap: 100px;
  }

  .info-row strong {
    min-width: 135px;
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
