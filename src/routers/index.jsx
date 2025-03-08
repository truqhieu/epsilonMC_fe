const ROUTERS = {
  // Guest
  HOME: "",
  BOOKING: "dat-lich",
  ABOUT: "gioi-thieu",
  INFORMATION: "thong-tin",
  DOCTOR_DETAIL: "doctor-detail/:id",
  NEWS: "tin-tuc",
  NEWS_DETAIL: "tin-tuc-chi-tiet",
  CONTACT: "lien-he",
  NOTFOUND: "not-found",
  COMMUNITY: "hoi-dap",

  // Bệnh nhân
  DANG_KY_KHAM: "dang-ky-kham",
  LICH_SU_KHAM: "lich-su-kham",
  SAN_PHAM: "san-pham",
  GIO_HANG: "gio-hang",
  CHI_TIET_SAN_PHAM: "chi-tiet-san-pham/:productId", // ⚡ Cập nhật để truyền productId qua URL
  HO_SO_BENH_AN: "ho-so-benh-an",

  // Bác sĩ
  DASHBOARD_DOCTOR: "",
  DANH_SACH_LICH_HEN_TRUC_TIEP: "lich-hen-truc-tiep",
  HO_SO_BENH_AN_BAC_SI: "ho-so-benh-an", 
  CAU_HOI_KHACH: `cau-hoi-khach`,
  CHAT_BENH_NHAN: `chat-benh-nhan`,
  // Nhân viên
  DASHBOARD_STAFF: "",
  DANH_SACH_LICH_KHAM: "danh-sach-lich-kham",
  HO_SO_BENH_AN_NHAN_VIEN: "ho-so-benh-an",

  // Quản lý
  DASHBOARD_MANAGER: "",
  MANAGE_EMPLOYEES: "danh-sach-nhan-vien",
  MANAGE_DOCTORS: "danh-sach-bac-si",
  MANAGE_PATIENTS: "danh-sach-benh-nhan",

  // Admin
  XEM_DANH_SACH_ACCOUNT: "danh-sach-account",
  TAO_ACCOUNT: "tao-tai-khoan",
};

export default ROUTERS;
