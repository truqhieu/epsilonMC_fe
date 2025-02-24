// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import BookingButton from "../components/BookingButton/BookingButton";
import AppHeader from "../components/Header/Header";
import NavbarUser from "../components/NavbarUser/NavbarUer";
import Navbar from "../components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { guestRoutes, patientRoutes } from "../routers/roleBased.routes";
import Footer from "../components/Footer/Footer";
import ROUTERS from "../routers";
import { useSelector } from "react-redux";

const GuestLayout = ({ isDatLichPage, renderRoutes, isPatient }) => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "staff";
  return (
    <>
      {!isDatLichPage && <BookingButton />}
      {!isDatLichPage && <AppHeader />}
      {isDatLichPage || isPatient ? <NavbarUser /> : <Navbar />}
      <Routes>
        {renderRoutes(guestRoutes)}
        {userRole === "patient" && renderRoutes(patientRoutes)}

        <Route path="/*" element={<Navigate to={ROUTERS.NOTFOUND} />} />
      </Routes>
      <Footer />
    </>
  );
};

GuestLayout.propTypes = {
  isDatLichPage: PropTypes.bool,
  isGuest: PropTypes.bool,
  isPatient: PropTypes.bool,
  renderRoutes: PropTypes.func.isRequired,
};

export default GuestLayout;
