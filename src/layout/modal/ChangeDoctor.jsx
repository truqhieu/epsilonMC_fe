// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CustomModal from "../../components/CustomModal";
import { ChangeDoctorStyles } from "../styles";
import { InfoRow } from "../../components/InfoRow";
import DoctorServices from "../../services/DoctorServices";
import PatientServices from "../../services/PatientServices";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const ChangeDoctor = ({ open, onCancel, doctor }) => {
  const [loading, setLoading] = useState(false);
  const [doctorActive, setDoctorActive] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { user } = useSelector((state) => state.auth);

  // Lấy danh sách bác sĩ đang hoạt động
  const getDoctorActive = useCallback(async () => {
    setLoading(true);
    try {
      const res = await DoctorServices.getDoctorActive({ isActive: true });
      if (res.success) setDoctorActive(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách bác sĩ:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật bác sĩ mới
  const updateDoctor = async () => {
    if (!selectedDoctor) return alert("Vui lòng chọn bác sĩ!");
    setLoading(true);
    try {
      const res = await PatientServices.updateDoctorForPatient({
        doctorId: selectedDoctor,
        patientId: user?.id,
      });
      if (res.success) onCancel(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Lỗi cập nhật bác sĩ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) getDoctorActive();
  }, [open, getDoctorActive]);

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      width={800}
      loading={loading}
      title="Thay đổi bác sĩ"
      footer={null}
      closeIcon={false}
      maskClosable={false}
      style={{ top: 10 }}
    >
      <ChangeDoctorStyles>
        <div className="change-doctor-container">
          <div className="change-doctor-content">
            <p>
              Rất tiếc, bác sĩ <strong>{doctor?.name}</strong> hiện đang tạm nghỉ vì lý do cá nhân.
            </p>
            <p>
              Để đảm bảo quá trình khám chữa bệnh của bạn không bị gián đoạn, vui lòng chọn một bác
              sĩ thay thế.
            </p>
          </div>

          <div className="change-doctor-content">
            <div className="change-doctor-content-title">Vui lòng chọn bác sĩ thay thế</div>
            <div className="change-doctor-content-list">
              {doctorActive.length > 0 ? (
                doctorActive.map((item) => (
                  <div
                    key={item._id}
                    className={`change-doctor-content-list-item-info ${
                      selectedDoctor === item._id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedDoctor(item._id)}
                  >
                    <img
                      src={`${API_BASE_URL}images/${item.image}`}
                      alt="Bác sĩ"
                      className="change-doctor-content-list-item-image"
                    />
                    <div className="change-doctor-content-list-item-detail">
                      <InfoRow label="Tên bác sĩ" value={item.name} />
                      <InfoRow label="Chuyên khoa" value={item.specialization} />
                      <InfoRow label="Địa chỉ" value={item.address} />
                      <InfoRow label="Kinh nghiệm" value={item.exp} />
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có bác sĩ nào khả dụng.</p>
              )}
            </div>
          </div>

          <button
            className="change-doctor-button"
            onClick={updateDoctor}
            disabled={!selectedDoctor || loading}
          >
            {loading ? "Đang cập nhật..." : "Thay đổi bác sĩ"}
          </button>
        </div>
      </ChangeDoctorStyles>
    </CustomModal>
  );
};

ChangeDoctor.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  doctor: PropTypes.object,
};

export default ChangeDoctor;
