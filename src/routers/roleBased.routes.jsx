import ROUTERS from "./index";
import wrapWithLazy from "../utils/wrapWithLazy";
import React from "react";

const LoginPage = React.lazy(() => import("../pages/Anonymous/Login"));
const Home = React.lazy(() => import("../pages/Anonymous/HomePage"));
const UnauthorizedPage = React.lazy(() => import("../pages/NotFound"));
const About = React.lazy(() =>
  import("../pages/Anonymous/HomePage/components/About")
);
const News = React.lazy(() =>
  import("../pages/Anonymous/HomePage/components/News")
);
const Information = React.lazy(() =>
  import("../pages/Anonymous/HomePage/components/Information")
);
const Contact = React.lazy(() =>
  import("../pages/Anonymous/HomePage/components/Contact")
);

export const adminRoutes = [
  {
    path: ROUTERS.QUAN_LY_KHACH,
    element: wrapWithLazy(),
  },
  {
    path: ROUTERS.QUAN_LY_LICH_HOP,
    element: wrapWithLazy(),
  },
  // ... Các route dành riêng cho admin
];

export const staffRoutes = [];
export const patientRoutes = [];
export const managerRoutes = [];

export const doctorRoutes = [
  {
    path: ROUTERS.HOME,
    element: wrapWithLazy(Home),
  },
  {
    path: ROUTERS.GIAM_SAT_CUOC_HOP_APP,
    element: wrapWithLazy(),
  },
];

export const guestRoutes = [
  {
    path: ROUTERS.LOGIN,
    element: wrapWithLazy(LoginPage),
  },
  {
    path: ROUTERS.HOME,
    element: wrapWithLazy(Home),
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
    path: ROUTERS.CONTACT,
    element: wrapWithLazy(Contact),
  },
  {
    path: ROUTERS.INFORMATION,
    element: wrapWithLazy(Information),
  },
  {
    path: "*",
    element: wrapWithLazy(UnauthorizedPage),
  },
];
