import { Modal } from "antd";
import styled from "styled-components";

export const LoginModel = styled(Modal)`
  .ant-modal-content {
    top: 100px !important;
  }
  .header-login-role {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .title-login-role {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
    padding-left: 50px;
    color: #3e70a7;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;
    margin: 20px 0;
  }

  .role-button {
    width: 100%;
    height: 80px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dbf2fa;
    border-radius: 10px;
    padding: 10px;
    font-size: 25px;
    font-weight: bold;
    color: #3e70a7;
    border: 2px solid rgb(142, 199, 218);
    text-align: center;
  }
`;

export const LoginForStaffStyled = styled.div`
  .header-login {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
    padding-left: 10px;
  }

  .title-login {
    font-size: 30px;
    font-weight: bold;
    padding-left: 10px;
    color: #3e70a7;
    padding-left: 65px;
  }

  .error {
    color: red;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    position: absolute;
    top: 55px;
    left: 50%;
    width: max-content;
    transform: translateX(-50%);
  }

  .otp {
    display: flex;
    gap: 10px;
  }

  .booing-order {
    text-align: center;
  }
`;
