import {
  BookOutlined,
  CommentOutlined,
  FundOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
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
      label: "Lịch khám trực tiếp",
    },
    {
      key: "3",
      icon: <BookOutlined />,
      label: "Hồ sơ bệnh án",
    },
    {
      key: "4",
      icon: <CommentOutlined />,
      label: "Trò chuyện với bệnh nhân",
    },
    {
      key: "5",
      icon: <QuestionCircleOutlined />,
      label: "Câu hỏi của khách",
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
      icon: <UserAddOutlined />,
      label: "Yêu cầu cấp tài khoản",
    },
  ],
  manager: [
    {
      key: "1",
      icon: <FundOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <SolutionOutlined />,
      label: "Quản lý nhân viên",
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Quản lý bác sĩ",
    },
    {
      key: "4",
      icon: <TeamOutlined />,
      label: "Quản lý bệnh nhân",
    },
  ],
};
