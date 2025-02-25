// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import BookingButton from "../components/BookingButton/BookingButton";
import Footer from "../components/Footer/Footer";
import AppHeader from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import NavbarUser from "../components/NavbarUser/NavbarUer";

const GuestLayout = ({ isDatLichPage }) => {
  return (
    <>
      {!isDatLichPage && <BookingButton />}
      {!isDatLichPage && <AppHeader />}
      {!isDatLichPage ? <Navbar /> : <NavbarUser />}
      <Outlet />
      <Footer />
    </>
  );
};

GuestLayout.propTypes = {
  isDatLichPage: PropTypes.bool,
  isGuest: PropTypes.bool,
  isPatient: PropTypes.bool,
};

export default GuestLayout;
