import { Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLoader from "../reduxs/authReduxs/authLoader";
import StaffLayout from "../layout/StaffLayout";
import { ToastContainer } from "react-toastify";
import GuestLayout from "../layout/GuestLayout";
const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathName = location.pathname;

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ));

  const isDatLichPage = pathName === "/dat-lich";
  const isPatient = user?.role === "patient";

  console.log(!user || isPatient);

  return (
    <>
      <AuthLoader />
      {isPatient || !user ? (
        <GuestLayout
          isDatLichPage={isDatLichPage}
          renderRoutes={renderRoutes}
        />
      ) : (
        <StaffLayout renderRoutes={renderRoutes} />
      )}

      <ToastContainer stacked />
    </>
  );
};

export default AppRouter;
