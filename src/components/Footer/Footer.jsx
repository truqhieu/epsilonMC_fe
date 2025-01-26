// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-doctor">
        <div className="title">
          <img
            src={assets.footerDoctor}
            alt="Bác sĩ Trần Trung Hiếu"
            style={{ width: "100px" }}
          />
          <p style={{ marginBottom: "-80px" }}>Bs. Trần Trung Hiếu</p>
        </div>
        <p className="doctor-description">
          Bác sĩ có hơn 20 năm kinh nghiệm trong lĩnh vực tâm lý và tâm thần
          kinh. Ông từng là Trưởng khoa Tâm lý lâm sàng tại Bệnh viện Tâm thần
          Hà Nội và được đánh giá cao bởi chuyên môn vững vàng.
        </p>
      </div>

      <div className="footer-contact">
        <h3 className="contact-title">Thông tin liên hệ</h3>
        {/* Địa chỉ */}
        <div className="footer-contact-item">
          <img src={assets.homeIcon} alt="home" className="icon" />
          Hoa Lac Hi-tech Park, km 29, Đại lộ Thăng Long, Hà Nội
        </div>

        {/* Số điện thoại */}
        <div className="footer-contact-item">
          <img src={assets.phoneIcon} alt="phone" className="icon" />
          <p>0987654321</p>
        </div>

        {/* Email */}
        <div className="footer-contact-item">
          <img src={assets.mailIcon} alt="mail" className="icon" />
          <p>example@example.com</p>
        </div>

        {/* Facebook */}
        <div className="footer-contact-item">
          <img src={assets.fbIcon} alt="fb" className="icon" />
          <p>https://www.facebook.com/example</p>
        </div>
      </div>

      {/* Phần menu */}
      <div className="footer-menu">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29797.67416935781
        !2d105.52934400000001!3d21.004288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s
        0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE
        7hu5lp!5e0!3m2!1svi!2s!4v1737344800209!5m2!1svi!2s"
          width="350"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Footer;
