// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const AppHeader = () => {
  return (
    <div className="header-container">
      {/* Phần icon */}
      <div className="header-icons">
        <img src={assets.fbIcon} alt="fb" className="icon" />
        <a href="mailto:example@example.com">
          <img
            src={assets.mailIcon}
            alt="mail"
            className="icon"
            style={{ width: "35px", marginBottom: "-3px" }}
          />
        </a>
      </div>

      {/* Địa chỉ */}
      <div className="header-items">
        <img src={assets.homeIcon} alt="home" className="icon" />
        Hoa Lac Hi-tech Park, km 29, Đại lộ Thăng Long, Hà Nội
      </div>

      {/* Giờ làm việc */}
      <div className="header-items">
        <img src={assets.timeIcon} alt="time" className="icon" />
        <div className="header-timings-text">
          <p>Thứ 2, 3, 4, 5, 6, 7 - Sáng: 08:30 - 11:00</p>
          <p>Thứ 2, 3, 4, 5, 6 - Chiều: 17:30 - 20:00</p>
        </div>
      </div>

      {/* Số điện thoại */}
      <div className="header-items">
        <img src={assets.phoneIcon} alt="phone" className="icon" />
        <p>0987654321</p>
      </div>
    </div>
  );
};

export default AppHeader;
