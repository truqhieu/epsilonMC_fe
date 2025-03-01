import { assets } from "../../../assets/assets";
import "./HomePage.css";

const HomePage = () => {
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
      <div className="service-lists">
        <div className="service">
          <img src={assets.service1} alt="service" className="service-icon" />
          <div className="service-title">
            Khám và điều trị các loại rối loạn tâm thần ở người lớn
          </div>
        </div>
        <div className="service">
          <img src={assets.service2} alt="service" className="service-icon" />
          <div className="service-title">
            Khám và điều trị các loại rối loạn tâm thần ở trẻ em
          </div>
        </div>
        <div className="service">
          <img src={assets.service3} alt="service" className="service-icon" />
          <div className="service-title">Chuyên khoa thần kinh</div>
        </div>
        <div className="service">
          <img src={assets.service4} alt="service" className="service-icon" />
          <div className="service-title">Tư vấn và điều trị tâm lý</div>
        </div>
      </div>
      <div className="strengths">
        <div className="strengths-content">
          <div className="strengths-title">Thế mạnh của chúng tôi</div>
          <div className="strengths-content-detail">
            <div className="strength">
              <div className="strength-detail-title">
                {" "}
                <img
                  src={assets.strength1}
                  alt="strength"
                  className="strength-icon"
                />
                <div className="strength-title">
                  CỞ SỞ VẬT CHẤT KHANG TRANG - HIỆN ĐẠI
                </div>
              </div>
              <div className="strength-detail-content">
                Nhằm phục vụ bệnh nhân chu đáo, nhiệt tình, chuyên nghiệp, bệnh
                nhân có thể đặt lịch hẹn trước qua điện thoại nên không mất
                nhiều thời gian chờ đợi khi đến khám.
              </div>
            </div>
            <div className="strength">
              <div className="strength-detail-title">
                {" "}
                <img
                  src={assets.strength2}
                  alt="strength"
                  className="strength-icon"
                />
                <div className="strength-title">
                  BỒI DƯỠNG, CẬP NHẬT KIẾN THỨC MỚI NHẤT
                </div>
              </div>
              <div className="strength-detail-content">
                Luôn tích cực tham gia báo cáo các hội thảo với các chuyên gia,
                bác sĩ, giáo sư trong và ngoài nước. Qua đó cập nhật những kiến
                thức, liệu pháp điều trị mới nhất, những loại thuốc tốt nhất cho
                bệnh nhân
              </div>
            </div>
            <div className="strength">
              <div className="strength-detail-title">
                {" "}
                <img
                  src={assets.strength4}
                  alt="strength"
                  className="strength-icon"
                />
                <div className="strength-title">TẬN TÂM VỚI BỆNH NHÂN</div>
              </div>
              <div className="strength-detail-content">
                Bên cạnh việc theo dõi sát tình trạng bệnh lý để điều chỉnh
                thuốc, can thiệp phù hợp , chúng tôi luôn luôn lắng nghe những
                khó khăn mà người bệnh gặp phải, hỗ trợ tư vấn kịp thời cho bệnh
                nhân và người nhà , giúp cải thiện chất lượng cuộc sống.
              </div>
            </div>
            <div className="strength">
              <div className="strength-detail-title">
                {" "}
                <img
                  src={assets.strength3}
                  alt="strength"
                  className="strength-icon"
                />
                <div className="strength-title">TRÌNH ĐỘ CHUYÊN MÔN CAO</div>
              </div>
              <div className="strength-detail-content">
                Bác sĩ có hơn 20 năm kinh nghiệm trong lĩnh vực tâm lý và tâm
                thần kinh. Ông từng là Trưởng khoa Tâm lý lâm sàng tại Bệnh viện
                Tâm thần Hà Nội và được đánh giá cao bởi chuyên môn vững vàng.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-packages">
        <div className="service-packages-detail">
          <div className="service-packages-header">Các gói dịch vụ</div>
          <div className="service-packages-content">
            <div className="service-package">
              <div className="package-title">
                <img
                  src={assets.package1}
                  alt="package"
                  className="package-icon"
                />
                <h4>Khám lần đầu</h4>
                <p>Bệnh nhân thăm khám lần đầu</p>
              </div>
              <hr />
              <div className="package-price">
                1.000.000 <span> VND</span>
              </div>
            </div>
            <div className="service-package">
              <div className="package-title">
                <img
                  src={assets.package2}
                  alt="package"
                  className="package-icon"
                />
                <h4>Tái khám</h4>
                <p>Bệnh nhân tái khám</p>
              </div>
              <hr />
              <div className="package-price">
                800.000 <span> VND</span>
              </div>
            </div>
            <div className="service-package">
              <div className="package-title">
                <img
                  src={assets.package3}
                  alt="package"
                  className="package-icon"
                />
                <h4>Tư vấn</h4>
                <p>Tư vấn tâm lý</p>
              </div>
              <hr />
              <div className="package-price">
                1.000.000 <span> VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
