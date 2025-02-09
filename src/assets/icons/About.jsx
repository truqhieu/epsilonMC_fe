import React from "react";
import "./About.css"; // Import file CSS riêng
import doctorImage from "../../../assets/avatar/doctor.png"; // Đúng đường dẫn
import { CheckCircleOutlined } from "@ant-design/icons"; // Import icon từ Ant Design
import brainImage from "../../../assets/brain.png"; // Hình não bộ
import handsImage from "../../../assets/hands.png"; // Hình bàn tay
import networkImage from "../../../assets/network.png"; // Hình mạng thần kinh
const About = () => {
  return (
    <div className="about-section">
        <div className="about-header" >
          <img src={doctorImage} alt="Bác sĩ" className="doctor-img" />
          <div className="about-content">
            <h2>Về phòng khám chúng tôi</h2>
            <p>
              Epsilon là trung tâm chuyên khoa tâm thần - thần kinh - tư vấn tâm lý, chuyên cung cấp các dịch vụ điều trị và hỗ trợ sức khỏe tinh thần.
            </p>
            <p>
              Phòng khám được phụ trách bởi <b>BS TRUNG HIẾU</b>:
            </p>
            <ul>
              <li>Tốt nghiệp chuyên khoa 2 tâm thần, Đại học Y Hà Nội.</li>
              <li>Nguyên Trưởng khoa Tâm lý lâm sàng, Bệnh viện Tâm thần Hà Nội.</li>
              <li>Có hơn 20 năm kinh nghiệm trong tư vấn tâm lý và điều trị các rối loạn tâm thần - thần kinh.</li>
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

       {/* Bố cục 2x2 với hình ảnh minh họa */}
       <div className="treatment-grid">
        <div className="treatment-item">
          <img src={brainImage} alt="Khám bệnh người lớn" className="treatment-img" />
          <h4>Khám chữa bệnh người lớn</h4>
          <ul>
            <li>Các rối loạn giấc ngủ: mất ngủ, ngủ nhiều</li>
            <li>Các rối loạn lo âu</li>
            <li>Các rối loạn lưỡng cực</li>
            <li>Các rối loạn dạng cơ thể</li>
            <li>Co giật phân ly</li>
            <li>Rối loạn ám ảnh cưỡng bức</li>
          </ul>
        </div>

        <div className="treatment-item">
          <img src={handsImage} alt="Khám bệnh trẻ em" className="treatment-img" />
          <h4>Khám chữa bệnh trẻ em</h4>
          <ul>
            <li>Co giật do sốt</li>
            <li>Động kinh</li>
            <li>Rối loạn tăng động - giảm chú ý</li>
            <li>Rối loạn bướng bỉnh - chống đối</li>
            <li>Rối loạn hành vi</li>
          </ul>
        </div>

        <div className="treatment-item">
          <img src={networkImage} alt="Chuyên khoa thần kinh" className="treatment-img" />
          <h4>Chuyên khoa thần kinh</h4>
          <ul>
            <li>Đau đầu</li>
            <li>Đau thần kinh tọa</li>
            <li>Chóng mặt</li>
            <li>Nhức đầu</li>
            <li>Run: Parkinson, run lành tính</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;