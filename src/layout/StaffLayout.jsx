import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { logout } from "../reduxs/authReduxs/authSlice";
import AuthServices from "../services/AuthServices";
import { menuItemsStaff } from "./components/MenuItemStaff";
import { StaffLayoutStyled } from "./styles";
import ROUTERS from "../routers";

const { Header, Sider, Content } = Layout;

const StaffLayout = () => {
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

  const routes = {
    doctor: [
      "patients",
      ROUTERS.DANH_SACH_LICH_HEN_TRUC_TIEP,
      ROUTERS.HO_SO_BENH_AN_BAC_SI,
    ],
    staff: [
      ROUTERS.DASHBOARD_STAFF,
      ROUTERS.DANH_SACH_LICH_KHAM,
      ROUTERS.HO_SO_BENH_AN_NHAN_VIEN,
    ],
    admin: [ROUTERS.XEM_DANH_SACH_ACCOUNT, ROUTERS.TAO_ACCOUNT],
    manager: ["work-management", "report"],
  };

  // Tạo navigationPaths tự động
  const navigationPaths = Object.fromEntries(
    Object.entries(routes).map(([role, paths]) => [
      role,
      Object.fromEntries(
        paths.map((path, index) => [index + 1, `/${role}/${path}`])
      ),
    ])
  );

  const menu = menuItemsStaff[userRole] || menuItemsStaff.staff;

  return (
    <StaffLayoutStyled>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          width={230}
        >
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
                navigate(path, { replace: true });
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
              minHeight: 260,
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </StaffLayoutStyled>
  );
};

export default StaffLayout;
