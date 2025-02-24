// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { StaffLayoutStyled } from "./styles";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reduxs/authReduxs/authSlice";
import AuthServices from "../services/AuthServices";
import {
  adminRoutes,
  doctorRoutes,
  managerRoutes,
  staffRoutes,
} from "../routers/roleBased.routes";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ROUTERS from "../routers";
import { menuItemsStaff } from "./components/MenuItemStaff";

const { Header, Sider, Content } = Layout;

const StaffLayout = ({ renderRoutes }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    AuthServices.logout();

    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Tạo menu dựa trên userRole

  const navigationPaths = {
    doctor: {
      1: "/doctor/patients", // Bệnh nhân
      2: "/doctor/diagnosis", // Chẩn đoán
    },
    staff: {
      1: ROUTERS.DASHBOARD_STAFF,
      2: ROUTERS.DANH_SACH_LICH_KHAM,
      3: ROUTERS.HO_SO_BENH_AN_NHAN_VIEN,
    },
    admin: {
      1: "/admin/manage-users", // Quản lý người dùng
      2: "/admin/statistics", // Thống kê
    },
    manager: {
      1: "/manager/work-management", // Quản lý công việc
      2: "/manager/report", // Báo cáo
    },
  };

  const menu = menuItemsStaff[userRole] || menuItemsStaff.staff;

  return (
    <StaffLayoutStyled>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="demo-logo-vertical">
            <img src={assets.logo} className="logo" />
          </div>
          <Menu
            theme="light"
            mode="inline"
            items={menu}
            onClick={(e) => {
              const path = navigationPaths[userRole]?.[e.key];
              if (path) {
                navigate(path);
              } else {
                console.log(`No path found for key ${e.key}`);
              }
            }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0",
              background: colorBgContainer,
            }}
            className="header-layout"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="navbar-right">
              <div className="navbar-profile">
                <div className="profile">
                  <div className="account-name">{user?.name}</div>
                  <div className="avatar-frame">
                    <img src={assets.avatar} alt="" className="avatar" />
                  </div>
                </div>
                <ul className="navbar-profile-dropdown-user">
                  <li>
                    <UserOutlined />
                    <p style={{ width: "max-content" }}>Tài khoản</p>
                  </li>
                  <hr />
                  <li onClick={() => handleLogout()}>
                    <LogoutOutlined />
                    <p style={{ width: "max-content" }}>Đăng xuất</p>
                  </li>
                </ul>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<Navigate to={ROUTERS.DASHBOARD_STAFF} replace />}
              />
              <>
                {userRole === "doctor" && renderRoutes(doctorRoutes)}
                {userRole === "staff" && renderRoutes(staffRoutes)}
                {userRole === "admin" && renderRoutes(adminRoutes)}
                {userRole === "manager" && renderRoutes(managerRoutes)}
              </>
              <Route path="/*" element={<Navigate to={ROUTERS.NOTFOUND} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </StaffLayoutStyled>
  );
};
StaffLayout.propTypes = {
  renderRoutes: PropTypes.func.isRequired,
};

export default StaffLayout;
