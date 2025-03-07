// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import BookingButton from "../components/BookingButton/BookingButton";
import Footer from "../components/Footer/Footer";
import AppHeader from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import NavbarUser from "../components/NavbarUser/NavbarUer";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import PatientServices from "../services/PatientServices";
import ChangeDoctor from "./modal/ChangeDoctor";

const GuestLayout = ({ isDatLichPage }) => {
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const getPatient = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await PatientServices.getPatientById(user.id);
      if (res.success) {
        setPatient(res.data);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.role === "patient") {
      getPatient();
    }
  }, [user, getPatient]);

  useEffect(() => {
    if (patient?.doctor?.isActive === false) {
      setIsOpenModal(true);
    }
  }, [patient]);

  return (
    <Spin size="large" spinning={loading}>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {!isDatLichPage && <BookingButton />}
        {!isDatLichPage && <AppHeader />}
        {!isDatLichPage ? <Navbar /> : <NavbarUser />}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
        <Footer />
      </div>
      {isOpenModal && (
        <ChangeDoctor
          open={isOpenModal}
          onCancel={() => setIsOpenModal(false)}
          doctor={patient?.doctor}
        />
      )}
    </Spin>
  );
};

GuestLayout.propTypes = {
  isDatLichPage: PropTypes.bool,
  isGuest: PropTypes.bool,
  isPatient: PropTypes.bool,
};

export default GuestLayout;
