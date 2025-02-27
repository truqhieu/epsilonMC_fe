import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Avatar, Spin } from "antd";
import { PhoneOutlined, EnvironmentOutlined, CalendarOutlined, MedicineBoxOutlined } from "@ant-design/icons";

import UserServices from "../../../services/UserServices";
import ListQuestionByDoctor from "./ListquestionbyDoctor"; 
import "./DoctorDetail.css";

const { Title, Text } = Typography;

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await UserServices.getDoctors();
        const selectedDoctor = response.find((doc) => doc._id === id);
        if (selectedDoctor) {
          setDoctor(selectedDoctor);
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

  if (loading) return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
  if (error) return <p>{error}</p>;

  return (
    <div className="doctor-detail-container">
      <Card className="doctor-card">
        <Avatar
          size={120}
          src="https://via.placeholder.com/150"
          alt={doctor.name}
          className="doctor-avatar"
        />
        <Title level={3}>{doctor.name}</Title>

        <div className="doctor-contact">
          <p>
            <PhoneOutlined style={{ color: "#1890ff" }} />{" "}
            <Text strong>Số điện thoại:</Text> {doctor.phone}
          </p>
          <p>
            <EnvironmentOutlined style={{ color: "#1890ff" }} />{" "}
            <Text strong>Địa chỉ:</Text> {doctor.address || "Chưa cập nhật"}
          </p>
        </div>
      </Card>

      <Card className="doctor-info-card">
      <div className="doctor-info-title">
  <MedicineBoxOutlined style={{ color: "#1890ff" }} /> Kinh nghiệm khám chữa bệnh
</div>
        <p>{doctor.specialization || "Chưa có thông tin"}</p>
      </Card>

      <Card className="doctor-info-card">
        <div className="doctor-info-title">
          <CalendarOutlined style={{ color: "#ff4d4f" }} /> Quá trình công tác
        </div>
        <p>{doctor.exp || "Chưa có thông tin"}</p>
      </Card>

      {/* Thêm danh sách câu hỏi mà bác sĩ đã trả lời */}
      <ListQuestionByDoctor doctorId={doctor._id} />
    </div>
  );
};

export default DoctorDetail;
