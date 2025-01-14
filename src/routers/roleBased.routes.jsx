import ROUTER from "./index";
import wrapWithLazy from "../utils/wrapWithLazy";
import React from "react";

const LoginPage = React.lazy(() => import("../pages/Anonymous/Login"));
const Home = React.lazy(() => import("../pages/Anonymous/HomePage"));
const UnauthorizedPage = React.lazy(() => import("../pages/NotFound"));

export const adminRoutes = [
  {
    path: ROUTER.QUAN_LY_KHACH,
    element: wrapWithLazy(),
  },
  {
    path: ROUTER.QUAN_LY_LICH_HOP,
    element: wrapWithLazy(),
  },
  // ... Các route dành riêng cho admin
];

export const staffRoutes = [];
export const patientRoutes = [];
export const managerRoutes = [];

export const doctorRoutes = [
  {
    path: ROUTER.HOME,
    element: wrapWithLazy(Home),
  },
  {
    path: ROUTER.GIAM_SAT_CUOC_HOP_APP,
    element: wrapWithLazy(),
  },
];

export const guestRoutes = [
  {
    path: ROUTER.LOGIN,
    element: wrapWithLazy(LoginPage),
  },
  {
    path: ROUTER.HOME,
    element: wrapWithLazy(Home),
  },
  {
    path: "*",
    element: wrapWithLazy(UnauthorizedPage),
  },
];
