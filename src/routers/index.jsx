// const BAC_SI = "bac_si";
// const NHAN_VIEN = "nhan_vien";
// const QUAN_LY = "quan_ly";
const BENH_NHAN = "benh-nhan";
// const ADMIN = "admin";

const ROUTERS = {
  //Guest
  HOME: "/trang-chu",
  LOGIN: "/dang-nhap",
  ABOUT: "/gioi-thieu",
  INFORMATION: "/thong-tin",
  DOCTOR_DETAIL : "/doctor-detail/:id",
  NEWS: "/tin-tuc",
  NEWS_DETAIL: "/tin-tuc-chi-tiet",
  CONTACT: "/lien-he",

  //Bệnh nhân
  BENH_NHAN: BENH_NHAN,
  DANG_KY_KHAM: `/${BENH_NHAN}/dang-ky-kham`,
  LICH_SU_KHAM: `/${BENH_NHAN}/lich-su-kham`,
  HO_SO_BENH_AN: `/${BENH_NHAN}/ho-so-benh-an`,

  // Bác sĩ

  // Nhân viên

  // Quản lý

  // Admin
};
export default ROUTERS;
