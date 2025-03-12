import styled from "styled-components";
import bgImage from "../../../assets/avatar/image.png";

export const RoleDashboardStyled = styled.div`
  .dashboard {
    height: 30vw;
    width: 100%;
    background: url(${bgImage}) no-repeat;
    background-size: 110%;
    background-position: center;
    position: relative;
    display: flex;
    flex-direction: row;
  }

  .doctor-image-role {
    position: absolute;
    bottom: -10px;
    right: 0px;
    width: 40%;
  }

  .content-each-role {
    position: absolute;
    top: 70px;
    left: 90px;
    color: #054e8a;
    gap: 10px;
  }
  .brand-role {
    font-size: 2rem;
    color: #000;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    text-transform: capitalize;
    font-family: "Poppins", sans-serif;
    font-style: normal;
    line-height: 1.5rem;
    letter-spacing: 0.02em;
  }

  .title-role {
    margin-top: 2rem;
    color: #000;
    font-size: 1.6rem;
    text-transform: capitalize;
    font-family: "Poppins", sans-serif;
    font-style: normal;
    line-height: 1.5rem;
    letter-spacing: 0.02em;
  }

  .task-role {
    display: flex;
    font-size: 1.2rem;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    color: #000;
  }
`;
