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
    <div className="homepage">
      <div className="mainstream">
        <img src={doctorImage} alt="doctor" className="doctor-image" />
        <div className="mainstream-content">
          <h1 className="mainstream-title">Về phòng khám của chúng tôi</h1>
          <div className="mainstream-description">
            <div className="mainstream-description-content">
              <p>Epsilon là trung tâm chuyên khoa tâm thần - thần kinh -</p>
              <p>tư vấn tâm lý, chuyên cung cấp các dịch vụ điều trị và hỗ</p>
              <p>trợ sức khỏe tinh thần</p>
              <p>Phòng khám được phụ trách bởi BS TRUNG HIẾU:</p>
              <ul>
                <li>Tốt nghiệp chuyên khoa 2 tâm thần, Đại học Y Hà Nội.</li>
                <li>
                  Nguyên Trưởng khoa Tâm lý lâm sàng, Bệnh viện Tâm thần Hà Nội.
                </li>
                <li>Có hơn 20 năm kinh nghiệm trong tư vấn tâm lý và</li>
                <li>điều trị các rối loạn tâm thần - thần kinh.</li>
              </ul>
            </div>
          </div>
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
          <div className="treatment-item">
            <ul>
              <h3>Khám chữa bệnh người lớn</h3>
              <li>Các rối loạn giấc ngủ: mất ngủ, ngủ nhiều</li>
              <li>Các rối loạn lo âu</li>
              <li>Các rối loạn lưỡng cực</li>
              <li>Các rối loạn dạng cơ thể</li>
              <li>Co giật phân ly </li>
              <li>Rối loạn ảm ảnh cưỡng bức </li>
              <li>...</li>
            </ul>
          </div>

          {/* Hàng 3: Ảnh bên trái - Chữ bên phải */}
          <div className="treatment-item">
            <ul>
              <h3>Khám chữa bệnh trẻ em</h3>
              <li> Co giật do sốt </li>
              <li> Động kinh</li>
              <li> Rối loạn tăng động - giảm chú ý</li>
              <li> Rối loạn bướng bỉnh - chống đối</li>
              <li> Rối loạn hành vi</li>
              <li>.....</li>
            </ul>
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
            <ul>
              <h3>Chuyên khoa thần kinh</h3>
              <li> Đau dai dẳng</li>
              <li> Đau thần kinh tọa</li>
              <li> Chóng mặt</li>
              <li> Nhức đầu</li>
              <li> Run: Parkinson, run lành tính ...</li>
              <li>.....</li>
            </ul>
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
