import styled from "styled-components";

export const DetailEmployessStyled = styled.div`
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

  .button-detail {
    display: flex;
    margin-top: 20px;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }

  .button-confirm {
    display: flex;
    background-color: rgb(75, 141, 202);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
    &:hover {
      background-color: #4a8dc9;
    }
  }
`;

export const ListEmployessStyled = styled.div`
  .button-addEmployess {
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

export const AddEmployessStyled = styled.div``;
