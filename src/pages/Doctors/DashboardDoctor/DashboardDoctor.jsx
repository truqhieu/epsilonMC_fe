// eslint-disable-next-line no-unused-vars
import React from "react";
import "./styles.jsx";
import { useSelector } from "react-redux";
import { assets } from "../../../assets/assets";
import { RoleDashboardStyled } from "./styles.jsx";

const DashboardDoctor = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <RoleDashboardStyled>
      <div className="dashboard">
        <div className="content-each-role">
          <div className="brand-role">Trung tâm chữa lành tâm hồn Epsilon</div>
          <div className="title-role">Xin Chào, bác sĩ {user?.name}</div>
          <div className="task-role">Hãy bắt đầu công việc hôm nay nào!</div>
        </div>
        <img src={assets.doctor} alt="doctor" className="doctor-image-role" />
      </div>
    </RoleDashboardStyled>
  );
};

export default DashboardDoctor;
