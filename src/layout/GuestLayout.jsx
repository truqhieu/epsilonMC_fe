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

const GuestLayout = ({ isDatLichPage, renderRoutes }) => {
  return (
    <>
      {!isDatLichPage && <BookingButton />}
      {!isDatLichPage && <AppHeader />}
      {!isDatLichPage ? <Navbar /> : <NavbarUser />}
      <Routes>
        {renderRoutes(guestRoutes)}
        {renderRoutes(patientRoutes)}

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
