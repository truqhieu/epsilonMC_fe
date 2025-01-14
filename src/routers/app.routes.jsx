import { Routes, Route, Navigate } from "react-router-dom";
import {
  adminRoutes,
  doctorRoutes,
  guestRoutes,
  managerRoutes,
  staffRoutes,
} from "./roleBased.routes";
import { useAuth } from "../context/auth.context";

const AppRouter = () => {
  const { role } = useAuth();

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));

  return (
    <Routes>
      {role === "guest" && renderRoutes(guestRoutes)}
      {role === "doctor" && renderRoutes(doctorRoutes)}
      {role === "staff" && renderRoutes(staffRoutes)}
      {role === "guest" && renderRoutes(guestRoutes)}
      {role === "admin" && renderRoutes(adminRoutes)}
      {role === "manager" && renderRoutes(managerRoutes)}

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AppRouter;
