import React from "react";
import "./Header.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function AppHeader() {
  return (
    <div className="footer-container">
      {/* Phần icon */}
      <div className="footer-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="mailto:example@example.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>

      {/* Địa chỉ */}
      <div className="footer-address">
      <a href="/">
          <i className="fas fa-home"></i>
        </a>
        Hoa Lac Hi-tech Park, km 29, Đại lộ Thăng Long, Hà Nội
      </div>

      {/* Giờ làm việc */}
      <div className="footer-timings">
        <i className="fas fa-clock"></i> Thứ 2, 4, 6, 7 - Sáng: 08:30 - 11:00
        <br />
        Thứ 2, 3, 4, 5, 6 - Chiều: 17:30 - 20:00
      </div>

      {/* Số điện thoại */}
      <div className="footer-phone">
        <i className="fas fa-phone"></i> 0987654321
      </div>
    </div>
  );
}

export default AppHeader;
