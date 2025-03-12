// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import { assets } from "../../../assets/assets";
import { RoleDashboardStyled } from "../../Doctors/DashboardDoctor/styles";

const DashboardStaff = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <RoleDashboardStyled>
      <div className="dashboard">
        <div className="content-each-role">
          <div className="brand-role">Trung tâm chữa lành tâm hồn Epsilon</div>
          <div className="title-role">Xin Chào, {user?.name}</div>
          <div className="task-role">Hãy bắt đầu công việc hôm nay nào!</div>
        </div>
        <img src={assets.doctor} alt="doctor" className="doctor-image-role" />
      </div>
    </RoleDashboardStyled>
  );
};

export default DashboardStaff;
