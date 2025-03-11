import styled from "styled-components";

export const DoctorManagerContainer = styled.div`
  .button-addDoctor {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #e6f4ff;
    color: black;
    border: 1px solid #4b8dca;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
    &:hover {
      background-color: #4a8dc9;
    }
  }

  .button-action-detail {
    background-color: #4b8dca;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #4a8dc9;
    }
  }
`;
