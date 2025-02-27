import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import "./styles.css"; // Import file CSS

function AppointmentList() {
  const { doctorId } = useParams(); // Lấy doctorId từ URL param
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) {
      setError("Không tìm thấy thông tin bác sĩ.");
      setLoading(false);
      return;
    }

    const API_URL = `http://localhost:9999/api/appointment/listAppointmentsDoctor/${doctorId}`;

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
          setAppointments(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Lỗi khi gọi API: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]); // useEffect sẽ chạy lại khi doctorId thay đổi

  if (loading) return <p className="loading-text">Đang tải danh sách cuộc hẹn...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">Danh sách cuộc hẹn</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Tên bệnh nhân</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Ngày khám</th>
            <th>Triệu chứng</th>
            <th>Bác sĩ</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.patient?.name}</td>
                <td>{appointment.patient?.phone}</td>
                <td>{appointment.patient?.email}</td>
                <td>{new Date(appointment.examinationDate).toLocaleDateString()}</td>
                <td>{appointment.symptom}</td>
                <td>{appointment.doctor?.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-appointments">Không có cuộc hẹn nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
