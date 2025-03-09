import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLoader from "../reduxs/authReduxs/authLoader";
import StaffLayout from "../layout/StaffLayout";
import { ToastContainer } from "react-toastify";
import GuestLayout from "../layout/GuestLayout";
import {
  adminRoutes,
  doctorRoutes,
  guestRoutes,
  managerRoutes,
  patientRoutes,
  staffRoutes,
} from "./roleBased.routes";
const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathName = location.pathname;

  const isDatLichPage = pathName === "/dat-lich";
  const isPatient = user?.role === "patient";

  return (
    <>
      <AuthLoader />
      <Routes>
        {(isPatient || !user) && (
          <Route path="/*" element={<GuestLayout isDatLichPage={isDatLichPage} />}>
            {guestRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {patientRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
        )}

        {user && !isPatient && (
          <Route path={`/${user.role}/*`} element={<StaffLayout />}>
            {user.role === "doctor" &&
              doctorRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            {user.role === "staff" &&
              staffRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            {user.role === "admin" &&
              adminRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            {user.role === "manager" &&
              managerRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
          </Route>
        )}
      </Routes>

      <ToastContainer stacked />
    </>
  );
};

export default AppRouter;