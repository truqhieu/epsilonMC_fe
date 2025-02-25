import {
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export const menuItemsStaff = {
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
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: "Danh sách cuộc hẹn",
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
