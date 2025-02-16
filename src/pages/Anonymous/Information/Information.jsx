import React, { useEffect, useState } from "react";
import { List, Spin, Alert } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import UserServices from "../../../services/UserServices";
import { assets } from "../../../assets/assets";
import "./Information.css";

const Information = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await UserServices.getDoctors();
        if (Array.isArray(response) && response.length > 0) {
          setDoctors(response);
        } else {
          setDoctors([]);
          setError("Không có dữ liệu bác sĩ!");
        }
      } catch (err) {
        setError("Lỗi khi tải danh sách bác sĩ!");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="homepage">
      <div className="mainstream">
        <img src={assets.doctor} alt="doctor" className="doctor-image" />
        <div className="mainstream-content">
          <h1 className="mainstream-title">Khám - tư vấn - điều trị các bệnh</h1>
          <div className="mainstream-description">
            <div className="mainstream-description-content">
              <p>- Rối loạn giấc ngủ</p>
              <p>- Chậm nói</p>
              <p>- Tự kỷ </p>
              <p>- Tăng động giảm chú ý</p>
              <p>- Trầm cảm lo âu</p>
              <p>- Chóng mặt đau đầu</p>
            </div>
            <div className="mainstream-description-content">
              <p>- Hoang tưởng ảo giác</p>
              <p>- Co giật</p>
              <p>- Ám ảnh tâm lý</p>
              <p>- Rối loạn hoặc giảm trí nhớ</p>
              <p>- Tư vấn và điều trị tâm lý</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách bác sĩ */}
      <div className="doctor-list">
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          <List
            grid={{ gutter: 16, column: 4 }} // Hiển thị 4 cột ngang
            dataSource={doctors}
            renderItem={(doctor, index) => (
              <List.Item>
                <div
                  className="doctor-card"
                  onClick={() => navigate(`/doctor-detail/${index + 1}`)} // Chuyển hướng với số thứ tự
                  style={{ cursor: "pointer" }}
                >
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialization}</p>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Information;
