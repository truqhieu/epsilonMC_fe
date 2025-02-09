import { Routes, Route, Navigate } from "react-router-dom";
import {
  adminRoutes,
  doctorRoutes,
  guestRoutes,
  managerRoutes,
  staffRoutes,
} from "./roleBased.routes";
import AppNavbar from "../components/Navbar/Navbar";
import AppHeader from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import AuthLoader from "../reduxs/authReduxs/authLoader";
const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "guest";

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));
  console.log(userRole);
  return (
    <>
      <AuthLoader />
      {/* Header hiển thị cố định */}
      <AppHeader />
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Navigate to="/trang-chu" replace />} />

        {renderRoutes(guestRoutes)}

        {/* Các route dựa theo role */}
        {userRole === "doctor" && renderRoutes(doctorRoutes)}
        {userRole === "staff" && renderRoutes(staffRoutes)}
        {userRole === "admin" && renderRoutes(adminRoutes)}
        {userRole === "manager" && renderRoutes(managerRoutes)}

        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
      <br></br>
      <ToastContainer stacked />
      <Footer></Footer>
    </>
  );
};

export default AppRouter;
