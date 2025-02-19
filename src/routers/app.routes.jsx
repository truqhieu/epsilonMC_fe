import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  adminRoutes,
  doctorRoutes,
  guestRoutes,
  managerRoutes,
  staffRoutes,
} from "./roleBased.routes";
import AppHeader from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import AuthLoader from "../reduxs/authReduxs/authLoader";
import BookingButton from "../components/BookingButton/BookingButton";
import Navbar from "../components/Navbar/Navbar";
import NavbarUser from "../components/NavbarUser/NavbarUer";
const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathName = location.pathname;
  const userRole = user?.role || "guest";

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));

  const isDatLichPage = pathName === "/dat-lich";
  const isNotGuest = userRole !== "guest";

  return (
    <>
      <AuthLoader />
      {!isDatLichPage && <BookingButton />}
      {!isDatLichPage && !isNotGuest && <AppHeader />}
      {isDatLichPage || isNotGuest ? <NavbarUser /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/trang-chu" replace />} />
        {renderRoutes(guestRoutes)}

        {/* Routes based on role */}
        {userRole === "doctor" && renderRoutes(doctorRoutes)}
        {userRole === "staff" && renderRoutes(staffRoutes)}
        {userRole === "admin" && renderRoutes(adminRoutes)}
        {userRole === "manager" && renderRoutes(managerRoutes)}

        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>

      <ToastContainer stacked />
      <Footer />
    </>
  );
};

export default AppRouter;
