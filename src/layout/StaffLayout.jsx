// UserRoleLayout.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
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

const { Header, Sider, Content } = Layout;

const StaffLayout = ({ renderRoutes }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = user?.role || "staff";

  const handleLogout = () => {
    dispatch(logout());
    AuthServices.logout();
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Tạo menu dựa trên userRole
  const menuItems = {
    doctor: [
      {
        key: "1",
        icon: <UserOutlined />,
        label: "Bệnh nhân",
      },
      {
        key: "2",
        icon: <VideoCameraOutlined />,
        label: "Chẩn đoán",
      },
    ],
    staff: [
      {
        key: "1",
        icon: <HomeOutlined />,
        label: "Dashborad",
      },
      {
        key: "2",
        icon: <UserOutlined />,
        label: "Quản lý lịch khám",
      },
      {
        key: "3",
        icon: <VideoCameraOutlined />,
        label: "Chẩn đoán",
      },
    ],
    admin: [
      {
        key: "1",
        icon: <UserOutlined />,
        label: "Quản lý người dùng",
      },
      {
        key: "2",
        icon: <VideoCameraOutlined />,
        label: "Thống kê",
      },
    ],
    manager: [
      {
        key: "1",
        icon: <UserOutlined />,
        label: "Quản lý công việc",
      },
      {
        key: "2",
        icon: <VideoCameraOutlined />,
        label: "Báo cáo",
      },
    ],
  };

  const navigationPaths = {
    doctor: {
      1: "/doctor/patients", // Bệnh nhân
      2: "/doctor/diagnosis", // Chẩn đoán
    },
    staff: {
      1: "/staff/dashboard",
      2: "/staff/danh-sach-lich-kham",
      3: "/staff/ho-so-benh-an",
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

  const menu = menuItems[userRole] || menuItems.staff;

  console.log(userRole);

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
              {userRole === "doctor" && renderRoutes(doctorRoutes)}
              {userRole === "staff" && renderRoutes(staffRoutes)}
              {userRole === "admin" && renderRoutes(adminRoutes)}
              {userRole === "manager" && renderRoutes(managerRoutes)}
              <Route path="/*" element={<Navigate to="/not-found" />} />
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
