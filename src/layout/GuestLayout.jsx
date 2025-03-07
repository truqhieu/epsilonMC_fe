// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import BookingButton from "../components/BookingButton/BookingButton";
import Footer from "../components/Footer/Footer";
import AppHeader from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import NavbarUser from "../components/NavbarUser/NavbarUer";
import { useSelector } from "react-redux"; // Lấy user từ Redux
import MessengerIcon from "../components/MessWithDoctorButton/MessengerIcon"; // Component mới
const GuestLayout = ({ isDatLichPage }) => {
  const { user } = useSelector((state) => state.auth); // Lấy user từ Redux
  const isPatient = user?.role === "patient"; // Kiểm tra nếu là patient
  return (
    <>
      {!isDatLichPage && <BookingButton />}
      {!isDatLichPage && <AppHeader />}
      {!isDatLichPage ? <Navbar /> : <NavbarUser />}
      <Outlet />

{/* Hiển thị MessengerIcon nếu là patient */}
{isPatient && <MessengerIcon />}
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
