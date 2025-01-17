import React from "react";
import "./Footer.css"; 

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-doctor">
        <img
          src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/454885731_1044449314001072_3333236384935656227_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=HKu-Ww6VaA8Q7kNvgGw2dlO&_nc_oc=AdjPoUPInUmH6KxhvTRkFYJe5wu480bfi4gaBt_memL-2RXO41gmuiGA77vP53S49-NAAXlDFDvCsOrLUwsfMotT&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AnLdlepXNdabjO6KrhS6FOf&oh=00_AYBMpiaW1nXxaWhxiGcWtUe_PB2bmCNopcwUF_Xu0Rjx9A&oe=678FF743" // Thay bằng đường dẫn ảnh của bạn
          alt="Bác sĩ Trần Trung Hiếu"
          className="doctor-image"
        />
        <h3>Bs. Trần Trung Hiếu</h3>
        <p>
          Bác sĩ có hơn 20 năm kinh nghiệm trong lĩnh vực tâm lý và tâm thần
          kinh. Ông từng là Trưởng khoa Tâm lý lâm sàng tại Bệnh viện Tâm thần
          Hà Nội và được đánh giá cao bởi chuyên môn vững vàng.
        </p>
      </div>

      {/* Phần thông tin liên hệ */}
      <div className="footer-contact">
        <h3>Thông tin liên hệ</h3>
        <p>
          <i className="fas fa-home"></i> Hoa Lac Hi-tech Park, km 29, Đại lộ
          Thăng Long, Hà Nội
        </p>
        <p>
          <i className="fas fa-phone"></i> 0987654321
        </p>
        <p>
          <i className="fas fa-envelope"></i> trunghieu2003hhh@gmail.com
        </p>
        <p>
          <i className="fab fa-facebook"></i>{" "}
          <a
            href="https://www.facebook.com/media/set/?set=a.158488922597120&type=3"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.facebook.com
          </a>
        </p>
      </div>

      {/* Phần menu */}
      <div className="footer-menu">
        <h3>Menu</h3>
        <ul>
          <li>
            <a href="/">Trang chủ</a>
          </li>
          <li>
            <a href="/kham">Khám - Tư vấn - Điều trị</a>
          </li>
          <li>
            <a href="/tintuc">Tin tức</a>
          </li>
          <li>
            <a href="/lienhe">Liên hệ</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
