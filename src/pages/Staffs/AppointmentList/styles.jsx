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
  }
`;
