import { Routes, Route, Navigate } from "react-router-dom";
import {
  adminRoutes,
  doctorRoutes,
  guestRoutes,
  managerRoutes,
  staffRoutes,
} from "./roleBased.routes";
import { useAuth } from "../context/auth.context";
import AppHeader from "../components/Header/Header"; // Import Header

const AppRouter = () => {
  const { role } = useAuth();

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));

  return (
    <>
      {/* Header hiển thị cố định */}
      <AppHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/trang-chu" replace />} />

        {/* Public routes */}
        {renderRoutes(guestRoutes)}

        {/* User role-based routes */}
        {role === "doctor" && renderRoutes(doctorRoutes)}
        {role === "staff" && renderRoutes(staffRoutes)}
        {role === "guest" && renderRoutes(guestRoutes)}
        {role === "admin" && renderRoutes(adminRoutes)}
        {role === "manager" && renderRoutes(managerRoutes)}

        {/* Not found page */}
        <Route path="/*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
};

export default AppRouter;
