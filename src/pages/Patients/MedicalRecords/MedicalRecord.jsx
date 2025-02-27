import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css"; // Import file CSS

function MedicalRecord() {
  const { patientId } = useParams();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (patientId) {
      const apiUrl = `http://localhost:9999/api/medicalrecord/medical-record/${patientId}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMedicalRecords(data);
          } else {
            setMedicalRecords([]); // Đảm bảo không bị lỗi khi render
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [patientId]);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;

  return (
    <div className="medical-record-container">
      <h2>Hồ Sơ Bệnh Án</h2>
      {medicalRecords.length > 0 ? (
        <table className="medical-record-table">
          <thead>
            <tr>
              <th>Chẩn Đoán</th>
              <th>Ghi Chú</th>
              <th>Ngày Tạo</th>
              <th>Ngày Cập Nhật</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.diagnose}</td>
                <td>{record.note}</td>
                <td>{record.created_at}</td>
                <td>{record.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">Không tìm thấy hồ sơ bệnh án.</p>
      )}
    </div>
  );
}

export default MedicalRecord;
