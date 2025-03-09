import ROUTERS from "./index";
import wrapWithLazy from "../utils/wrapWithLazy";
import React from "react";
import ViewProducts from "../pages/Patients/ViewProducts/ViewProducts";

// Import các component khác
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const HomePage = React.lazy(() => import("../pages/Anonymous/HomePage/HomePage"));
const About = React.lazy(() => import("../pages/Anonymous/About/About"));
const News = React.lazy(() => import("../pages/Anonymous/News/News"));
const NewsDetail = React.lazy(() => import("../pages/Anonymous/News/NewsDetails"));
const Information = React.lazy(() => import("../pages/Anonymous/Information/Information"));
const Contact = React.lazy(() => import("../pages/Anonymous/Contact/Contact"));
const Booking = React.lazy(() => import("../components/BookingPage/BookingPage"));
const DoctorDetails = React.lazy(() => import("../pages/Anonymous/Information/DoctorDetail"));
const CommunityPage = React.lazy(() => import("../pages/Community/CommunityPage"));
const AppointmentList = React.lazy(() => import("../pages/Staffs/AppointmentList/AppointmentList"));
const MedicalRecords = React.lazy(() => import("../pages/Staffs/MedicalRecords/MedicalRecords"));
const DashboardStaff = React.lazy(() => import("../pages/Staffs/DashboardStaff/DashboardStaff"));
const GrantsAccount = React.lazy(() => import("../pages/Admins/AccountManager/GrantsAccount"));
const ViewAccounts = React.lazy(() => import("../pages/Admins/AccountManager/ListAccount"));

const ViewProduct = React.lazy(() => import("../pages/Patients/ViewProducts/ViewProducts"));
const CartPage = React.lazy(() => import("../pages/Patients/Cart/CartPage"));
const HistoryCart = React.lazy(() => import("../pages/Patients/Cart/HistoryCart"));

//Doctor routes
const DashboardDoctor = React.lazy(() =>
  import("../pages/Doctors/DashboardDoctor/DashboardDoctor")
);
const listAppointmentDoctor = React.lazy(() =>
  import("../pages/Doctors/AppointmentList/AppointmentListbyDoctor")
);
const MedicalRecordDoctor = React.lazy(() =>
  import("../pages/Doctors/MedicalRecords/ListMedicalRecord")
);

//Patient routes
const AppointmetnPatient = React.lazy(() =>
  import("../pages/Patients/AppointmentList/AppointmentList")
);
const MedicalRecordPatient = React.lazy(() =>
  import("../pages/Patients/MedicalRecords/MedicalRecord")
);
const GuestQuestionsList = React.lazy(() => 
  import("../pages/Doctors/GuestQuestionList/GuestQuestionList")
);
const ChatPatient = React.lazy(() => 
  import("../pages/Doctors/ChatPatient/ChatPatient")
);

export const staffRoutes = [
  { path: ROUTERS.DASHBOARD_STAFF, element: wrapWithLazy(DashboardStaff) },
  { path: ROUTERS.DANH_SACH_LICH_KHAM, element: wrapWithLazy(AppointmentList) },
  { path: ROUTERS.HO_SO_BENH_AN_NHAN_VIEN, element: wrapWithLazy(MedicalRecords) },
  { path: ROUTERS.NOTFOUND, element: wrapWithLazy(NotFound) },
];

export const adminRoutes = [
  { path: ROUTERS.TAO_ACCOUNT, element: wrapWithLazy(GrantsAccount) },
  { path: ROUTERS.XEM_DANH_SACH_ACCOUNT, element: wrapWithLazy(ViewAccounts) },
  { path: ROUTERS.NOTFOUND, element: wrapWithLazy(NotFound) },
];

export const patientRoutes = [
  { path: ROUTERS.LICH_SU_KHAM, element: wrapWithLazy(AppointmetnPatient) },
  { path: ROUTERS.HO_SO_BENH_AN, element: wrapWithLazy(MedicalRecordPatient) },
  { path: ROUTERS.SAN_PHAM, element: wrapWithLazy(ViewProduct) },
  { path: ROUTERS.GIO_HANG, element: wrapWithLazy(CartPage) },
  { path: ROUTERS.LICH_SU_MUA_HANG, element: wrapWithLazy(HistoryCart) }, // ⚡ Đã cập nhật với productId
  { path: ROUTERS.NOTFOUND, element: wrapWithLazy(NotFound) },
];

export const managerRoutes = [];

export const doctorRoutes = [
  { path: ROUTERS.DASHBOARD_DOCTOR, element: wrapWithLazy(DashboardDoctor) },
  { path: ROUTERS.DANH_SACH_LICH_HEN_TRUC_TIEP, element: wrapWithLazy(listAppointmentDoctor) },
  { path: ROUTERS.HO_SO_BENH_AN_BAC_SI, element: wrapWithLazy(MedicalRecordDoctor) },
  { path: ROUTERS.NOTFOUND, element: wrapWithLazy(NotFound) },
  
 
 
 
  {
    path: ROUTERS.CAU_HOI_KHACH, 
    element: wrapWithLazy(GuestQuestionsList),
  },
  {
    path: ROUTERS.CHAT_BENH_NHAN, 
    element: wrapWithLazy(ChatPatient),
  },
];

export const guestRoutes = [
  { path: ROUTERS.HOME, element: wrapWithLazy(HomePage) },
  { path: ROUTERS.ABOUT, element: wrapWithLazy(About) },
  { path: ROUTERS.NEWS, element: wrapWithLazy(News) },
  { path: ROUTERS.NEWS_DETAIL, element: wrapWithLazy(NewsDetail) },
  { path: ROUTERS.CONTACT, element: wrapWithLazy(Contact) },
  { path: ROUTERS.INFORMATION, element: wrapWithLazy(Information) },
  { path: ROUTERS.BOOKING, element: wrapWithLazy(Booking) },
  { path: ROUTERS.DOCTOR_DETAIL, element: wrapWithLazy(DoctorDetails) },
  { path: ROUTERS.COMMUNITY, element: wrapWithLazy(CommunityPage) },
  { path: ROUTERS.SAN_PHAM, element: wrapWithLazy(ViewProducts) },
  { path: ROUTERS.NOTFOUND, element: wrapWithLazy(NotFound) },
];
``
