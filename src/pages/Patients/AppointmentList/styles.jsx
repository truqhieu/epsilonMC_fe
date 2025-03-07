import styled from "styled-components";

export const AppointmentListPatient = styled.div`
  .container-appointment {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 180px;
  }

  .title-appointment {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    border: 2px solid #73d0f4;
    background-color: #3161ad;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px;
    color: #fff;
  }

  .list-appointment {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .appointment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 10px;
    border-radius: 16px;
    margin: 0 20% 10px;
    width: 55%;
    height: 120px;
  }

  .appointment-time {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-weight: 700;
    font-size: 13px;
    margin-right: 5px;
    padding: 0 10px;
    background: rgba(49, 97, 173, 0.125);
    border-radius: 16px;
  }

  .date {
    color: rgb(7, 91, 181);
    opacity: 0.4;
    font-size: 48px;
    line-height: 38px;
    padding-bottom: 10px;
  }

  .month-year {
    font-size: 18px;
  }

  .content-appointment {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }

  .appointment-name {
    font-weight: 700;
    color: rgb(7, 91, 181);
    font-size: 20px;
  }

  .appointment-doctor {
    padding-top: 8px;
    font-size: 18px;
  }

  .appointment-exam {
    font-size: 16px;
  }

  .appointment-status {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 15%;
    height: 50px;
    font-size: 16px;
    margin-top: 10px;
    border-radius: 16px;
  }
`;

export const DetailAppointmentStyles = styled.div`
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
`;
