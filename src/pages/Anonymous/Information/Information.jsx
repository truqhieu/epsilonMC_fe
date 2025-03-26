// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { List, Spin, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import DoctorServices from "../../../services/DoctorServices";
import { InformationStyled } from "./styles";

const Information = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorServices.getDoctors();
        console.log("Dữ liệu API:", response);

        if (Array.isArray(response?.data) && response?.data.length > 0) {
          setDoctors(response?.data);
        } else {
          setDoctors([]);
          setError("Không có dữ liệu bác sĩ!");
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách bác sĩ:", err);
        setError("Lỗi khi tải danh sách bác sĩ!");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <InformationStyled>
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
              grid={{ gutter: 16, column: 4 }}
              dataSource={doctors}
              renderItem={(doctor) => (
                <List.Item>
                  <div
                    className="doctor-card"
                    onClick={() => navigate(`/doctor-detail/${doctor._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialization || "Chưa cập nhật"}</p>
                    <p>🩺 {doctor.consultations || 0} lượt tư vấn</p>
                  </div>
                </List.Item>
              )}
            />
          )}
        </div>

        <button className="question-doctor" onClick={() => navigate("/hoi-dap")}>
          Đặt câu hỏi cho bác sĩ
        </button>
      </div>
    </InformationStyled>
  );
};

export default Information;
