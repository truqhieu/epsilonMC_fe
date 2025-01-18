import { Routes, Route, Navigate } from "react-router-dom";
import {
  adminRoutes,
  doctorRoutes,
  guestRoutes,
  managerRoutes,
  staffRoutes,
} from "./roleBased.routes";
import { useAuth } from "../context/auth.context";
import AppNavbar from "../components/Navbar/Navbar";
import AppHeader from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AppNavbarLogin from "../components/NavbarLogin/NavbarLogin";
const AppRouter = () => {
  const { role } = useAuth();

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));

  return (
    <>
      {/* Header hiển thị cố định */}
      <AppNavbar />
      <br></br>
      <AppNavbarLogin/>
      <Routes>
        {/* Điều hướng mặc định */}
        <Route path="/" element={<Navigate to="/trang-chu" replace />} />

        {/* Public routes */}
        {renderRoutes(guestRoutes)}

        {/* Các route dựa theo role */}
        {role === "doctor" && renderRoutes(doctorRoutes)}
        {role === "staff" && renderRoutes(staffRoutes)}
        {role === "guest" && renderRoutes(guestRoutes)}
        {role === "admin" && renderRoutes(adminRoutes)}
        {role === "manager" && renderRoutes(managerRoutes)}

        {/* Trang không tìm thấy */}
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
      <AppHeader />
      <br></br>
      <Footer></Footer>
    </>
  );
};

export default AppRouter;
