import styled from "styled-components";

export const DetailPatientStyled = styled.div`
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

  .title-detail {
    padding: 0 10px;
    font-weight: 700;
    color: rgb(7, 91, 181);
    font-size: 20px;
  }
`;
