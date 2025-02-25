import styled from "styled-components";
import { Table } from "antd";

export const TableCustom = styled(Table)`
  .ant-table-thead .ant-table-cell {
    background-color: #e6f4ff;
    font-weight: bold;
    font-size: 1.2em;
  }
`;

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
    align-items: center;
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
`;
