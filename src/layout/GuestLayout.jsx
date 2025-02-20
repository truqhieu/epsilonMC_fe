// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import BookingButton from "../components/BookingButton/BookingButton";
import AppHeader from "../components/Header/Header";
import NavbarUser from "../components/NavbarUser/NavbarUer";
import Navbar from "../components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { guestRoutes } from "../routers/roleBased.routes";
import Footer from "../components/Footer/Footer";

const GuestLayout = ({ isDatLichPage, renderRoutes, isPatient }) => {
  return (
    <>
      {!isDatLichPage && <BookingButton />}
      {!isDatLichPage && <AppHeader />}
      {isDatLichPage || isPatient ? <NavbarUser /> : <Navbar />}
      <Routes>
        {renderRoutes(guestRoutes)}
        <Route path="/*" element={<Navigate to="/not-found" />} />
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
