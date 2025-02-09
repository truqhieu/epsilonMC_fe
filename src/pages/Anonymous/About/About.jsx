import React from "react";
import "./About.css"; // Import file CSS riêng
import doctorImage from "../../../assets/avatar/doctor.png"; // Đúng đường dẫn
import { CheckCircleOutlined } from "@ant-design/icons"; // Import icon từ Ant Design
import brainImage from "../../../assets/icons/brain.png"; // Hình não bộ
import handsImage from "../../../assets/icons/hands.png"; // Hình bàn tay
import networkImage from "../../../assets/icons/network.png"; // Hình mạng thần kinh
import psychologyImage from "../../../assets/icons/psy.png";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-header">
        <img src={doctorImage} alt="Bác sĩ" className="doctor-img" />
        <div className="about-content">
          <h2>Về phòng khám chúng tôi</h2>
          <p>
            Epsilon là trung tâm chuyên khoa tâm thần - thần kinh - tư vấn tâm
            lý, chuyên cung cấp các dịch vụ điều trị và hỗ trợ sức khỏe tinh
            thần.
          </p>
          <p>
            Phòng khám được phụ trách bởi <b>BS TRUNG HIẾU</b>:
          </p>
          <ul>
            <li>Tốt nghiệp chuyên khoa 2 tâm thần, Đại học Y Hà Nội.</li>
            <li>
              Nguyên Trưởng khoa Tâm lý lâm sàng, Bệnh viện Tâm thần Hà Nội.
            </li>
            <li>
              Có hơn 20 năm kinh nghiệm trong tư vấn tâm lý và điều trị các rối
              loạn tâm thần - thần kinh.
            </li>
          </ul>
        </div>
      </div>

      {/* Dịch vụ khám chữa bệnh */}
      <div className="services">
        <h3>Dịch vụ khám chữa bệnh</h3>
        <div className="service-list">
          <div className="service-item">
            <CheckCircleOutlined className="check-icon" />
            <span>Khám và điều trị các rối loạn tâm thần trẻ em</span>
          </div>
          <div className="service-item">
            <CheckCircleOutlined className="check-icon" />
            <span>Chuyên khoa thần kinh</span>
          </div>
          <div className="service-item">
            <CheckCircleOutlined className="check-icon" />
            <span>Khám và điều trị các rối loạn tâm thần người lớn</span>
          </div>
          <div className="service-item">
            <CheckCircleOutlined className="check-icon" />
            <span>Tư vấn và điều trị tâm lý</span>
          </div>
        </div>
        <button className="appointment-btn">Đặt hẹn ngay →</button>
      </div>

      {/* Bố cục danh mục khám chữa bệnh */}
      <div className="treatment-section">
        <div className="treatment-grid">
          {/* Hàng 1: Ảnh bên trái - Chữ bên phải */}
          <div className="treatment-item">
            <img
              src={brainImage}
              alt="Khám bệnh người lớn"
              className="treatment-img"
            />
          </div>

          {/* Hàng 2: Chữ bên trái - Ảnh bên phải */}
          <div className="treatment-item">
            <h3>Khám chữa bệnh người lớn</h3>
          </div>

          {/* Hàng 3: Ảnh bên trái - Chữ bên phải */}
          <div className="treatment-item">
            <h3>Khám chữa bệnh trẻ em</h3>
          </div>

          {/* Hàng 4: Chữ bên trái - Ảnh bên phải */}
          <div className="treatment-item">
            <img
              src={handsImage}
              alt="Chuyên khoa thần kinh"
              className="treatment-img"
            />
          </div>
          <div className="treatment-item">
            <img
              src={psychologyImage}
              alt="Chuyên khoa thần kinh"
              className="treatment-img"
            />
          </div>
          <div className="treatment-item">
            <h3>Chuyên khoa thần kinh</h3>
          </div>
          <div className="treatment-item">
            <h3>Tư vấn tâm lý</h3>
          </div>
          <div className="treatment-item">
            <img
              src={networkImage}
              alt="Chuyên khoa thần kinh"
              className="treatment-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
