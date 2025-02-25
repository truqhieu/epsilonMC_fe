const BAC_SI = "doctor";
const NHAN_VIEN = "staff";
// const QUAN_LY = "quan_ly";
const BENH_NHAN = "benh-nhan";
const ADMIN = "admin";

const ROUTERS = {
  //Guest
  HOME: "/",
  BOOKING: "/dat-lich",
  ABOUT: "/gioi-thieu",
  INFORMATION: "/thong-tin",
  DOCTOR_DETAIL: "/doctor-detail/:id",
  NEWS: "/tin-tuc",
  NEWS_DETAIL: "/tin-tuc-chi-tiet",
  CONTACT: "/lien-he",

  //Bệnh nhân
  DANG_KY_KHAM: `/${BENH_NHAN}/dang-ky-kham`,
  LICH_SU_KHAM: `/${BENH_NHAN}/lich-su-kham`,
  HO_SO_BENH_AN: `/${BENH_NHAN}/ho-so-benh-an`,

  // Bác sĩ
  DASHBOARD_DOCTOR: `/${BAC_SI}/dashboard`,

  // Nhân viên
  DASHBOARD_STAFF: `/${NHAN_VIEN}/dashboard`,
  DANH_SACH_LICH_KHAM: `/${NHAN_VIEN}/danh-sach-lich-kham`,
  HO_SO_BENH_AN_NHAN_VIEN: `/${NHAN_VIEN}/ho-so-benh-an`,

  // Quản lý

  // Admin
  XEM_DANH_SACH_ACCOUNT: "/admin/manage-users",
  TAO_ACCOUNT: "/admin/tao-tai-khoan",
};
export default ROUTERS;
