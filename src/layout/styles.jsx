import styled from "styled-components";

export const StaffLayoutStyled = styled.div`
  .demo-logo-vertical {
    text-align: center;
    padding: 8px;
  }

  .logo {
    height: 40%;
    width: 40%;
  }

  .header-layout {
    background-color: #fff;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .navbar-right {
    display: flex;
    align-items: center;
    margin-right: 40px;
  }

  .navbar-right button {
    background: transparent;
    font-size: 16px;
    color: #49557e;
    border: 1px solid #9ad8e2;
    padding: 10px 30px;
    border-radius: 50px;
    cursor: pointer;
    transition: 0.3s;
  }

  .navbar-profile-dropdown-user {
    position: absolute;
    display: none;
    right: 0;
    z-index: 1;
  }

  .navbar-profile:hover .navbar-profile-dropdown-user {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #f2f8fa;
    padding: 12px 15px;
    border-radius: 4px;
    border: 1px solid #bce6f7;
    outline: 2px solid white;
    list-style: none;
  }

  .navbar-profile-dropdown-user li {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    height: 12px;
  }

  .navbar-profile-dropdown-user img {
    width: 20px;
  }

  .navbar-profile-dropdown-user li:hover {
    color: #11afee;
  }

  .ant-menu-item {
    margin-bottom: 10px;
  }
`;
