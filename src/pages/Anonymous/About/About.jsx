import "./About.css";
import { CheckCircleOutlined } from "@ant-design/icons";
import { assets } from "../../../assets/assets";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="homepage">
      <div className="mainstream">
        <img src={assets.doctor} alt="doctor" className="doctor-image" />
        <div className="mainstream-content">
          <h1 className="mainstream-title">Dịch vụ điều trị theo yêu cầu</h1>
          <div className="mainstream-description">
            <div className="mainstream-description-content">
              <p>- Rối loạn giấc ngủ</p>
              <p>- Chậm nói</p>
              <p>- Tự kỷ </p>
              <p>- Tăng động giảm chú ý</p>
              <p>- Trầm cảm lô âu</p>
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
        <button className="appointment-btn">
          <Link
            to="/dat-lich"
            style={{ color: "white", textDecoration: "none" }}
          >
            Đặt hẹn ngay →
          </Link>
        </button>
      </div>

      <div className="treatment-section">
        <div className="treatment-grid">
          <div className="treatment-item">
            <img
              src={assets.brain}
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

          <div className="treatment-item">
            <img
              src={assets.hands}
              alt="Chuyên khoa thần kinh"
              className="treatment-img"
            />
          </div>
          <div className="treatment-item">
            <img
              src={assets.psychology}
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
              src={assets.network}
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
