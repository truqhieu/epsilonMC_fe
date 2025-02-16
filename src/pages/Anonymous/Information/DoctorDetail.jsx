import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserServices from "../../../services/UserServices";

const DoctorDetail = () => {
  const { id } = useParams(); 
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await UserServices.getDoctors();
        
        const doctorIndex = parseInt(id) - 1;
        if (response[doctorIndex]) {
          setDoctor(response[doctorIndex]); 
        } else {
          setError("Không tìm thấy bác sĩ!");
        }
      } catch (err) {
        setError("Lỗi khi tải thông tin bác sĩ!");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Thông tin bác sĩ</h1>
      <p><strong>Tên:</strong> {doctor.name}</p>
      <p><strong>Chuyên môn:</strong> {doctor.specialization}</p>
      <p><strong>Địa chỉ:</strong> {doctor.address}</p>
      <p><strong>Số điện thoại:</strong> {doctor.phone}</p>
    </div>
  );
};

export default DoctorDetail;
