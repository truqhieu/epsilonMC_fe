import ROUTERS from "./index";
import wrapWithLazy from "../utils/wrapWithLazy";
import React from "react";

//Guest routes
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const HomePage = React.lazy(() =>
  import("../pages/Anonymous/HomePage/HomePage")
);
const About = React.lazy(() => import("../pages/Anonymous/About/About"));
const News = React.lazy(() => import("../pages/Anonymous/News/News"));
const NewsDetail = React.lazy(() =>
  import("../pages/Anonymous/News/NewsDetails")
);
const Information = React.lazy(() =>
  import("../pages/Anonymous/Information/Information")
);
const Contact = React.lazy(() => import("../pages/Anonymous/Contact/Contact"));
const Booking = React.lazy(() =>
  import("../components/BookingPage/BookingPage")
);

const DoctorDetails = React.lazy(() =>
  import("../pages/Anonymous/Information/DoctorDetail")
);

//Staff routes
const AppointmentList = React.lazy(() =>
  import("../pages/Staffs/AppointmentList/AppointmentList")
);
const MedicalRecords = React.lazy(() =>
  import("../pages/Staffs/MedicalRecords/MedicalRecords")
);
const DashboardStaff = React.lazy(() =>
  import("../pages/Staffs/DashboardStaff/DashboardStaff")
);

//Admin routes
const CreateAccount = React.lazy(() =>
  import("../pages/Admins/AccountManager/CreateAccount")
);
const ViewAccounts = React.lazy(() =>
  import("../pages/Admins/AccountManager/ViewListAccount")
);

//Doctor routes
const DashboardDoctor = React.lazy(() =>
  import("../pages/Doctors/DashboardDoctor/DashboardDoctor")
);

export const staffRoutes = [
  {
    path: ROUTERS.DASHBOARD_STAFF,
    element: wrapWithLazy(DashboardStaff),
  },
  {
    path: ROUTERS.DANH_SACH_LICH_KHAM,
    element: wrapWithLazy(AppointmentList),
  },
  {
    path: ROUTERS.HO_SO_BENH_AN_NHAN_VIEN,
    element: wrapWithLazy(MedicalRecords),
  },
  {
    path: ROUTERS.NOTFOUND,
    element: wrapWithLazy(NotFound),
  },
];

export const adminRoutes = [
  {
    path: ROUTERS.TAO_ACCOUNT,
    element: wrapWithLazy(CreateAccount),
  },
  {
    path: ROUTERS.XEM_DANH_SACH_ACCOUNT,
    element: wrapWithLazy(ViewAccounts),
  },
  {
    path: ROUTERS.NOTFOUND,
    element: wrapWithLazy(NotFound),
  },
];

export const patientRoutes = [];
export const managerRoutes = [];

export const doctorRoutes = [
  {
    path: ROUTERS.DASHBOARD_DOCTOR,
    element: wrapWithLazy(DashboardDoctor),
  },
  {
    path: ROUTERS.NOTFOUND,
    element: wrapWithLazy(NotFound),
  },
];

export const guestRoutes = [
  {
    path: ROUTERS.HOME,
    element: wrapWithLazy(HomePage),
  },
  {
    path: ROUTERS.ABOUT,
    element: wrapWithLazy(About),
  },
  {
    path: ROUTERS.NEWS,
    element: wrapWithLazy(News),
  },
  {
    path: ROUTERS.NEWS_DETAIL,
    element: wrapWithLazy(NewsDetail),
  },
  {
    path: ROUTERS.CONTACT,
    element: wrapWithLazy(Contact),
  },
  {
    path: ROUTERS.INFORMATION,
    element: wrapWithLazy(Information),
  },
  {
    path: ROUTERS.BOOKING,
    element: wrapWithLazy(Booking),
  },
  {
    path: ROUTERS.DOCTOR_DETAIL,
    element: wrapWithLazy(DoctorDetails),
  },
  {
    path: ROUTERS.NOTFOUND,
    element: wrapWithLazy(NotFound),
  },
];
