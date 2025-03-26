import {
  BookOutlined,
  CommentOutlined,
  FundOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  SignatureOutlined,
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
      icon: <UserAddOutlined />,
      label: "Lịch khám trực tiếp",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Lịch khám Online",
    },
    {
      key: "3",
      icon: <BookOutlined />,
      label: "Hồ sơ bệnh án",
    },
    {
      key: "4",
      icon: <CommentOutlined />,
      label: "Chat với bệnh nhân",
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
      icon: <UserOutlined />,
      label: "Quản lý lịch khám",
    },
    {
      key: "2",
      icon: <ShoppingCartOutlined />,
      label: "Trạng Thái Đơn Hàng",
    },
    {
      key: "3",
      icon: <SignatureOutlined />,
      label: "Đặt lịch khám",
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
