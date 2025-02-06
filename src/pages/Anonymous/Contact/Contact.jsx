import { assets } from "../../../assets/assets";
import "./Contact.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div >
        <div className="contact-content">

          <div className="contact-form">

            <h2>Gửi tin nhắn</h2>
            <form>
              <input type="text" placeholder="Họ và tên" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Số điện thoại" required />
              <textarea placeholder="Nội dung tin nhắn" rows="5" required></textarea>
              <button type="submit">Gửi tin nhắn</button>
            </form>
            
          </div>
          <div className="contact-info">

            <h2>Thông tin liên hệ</h2>
            <p><strong>Địa chỉ:</strong>Hoa Lac Hi-tech Park, km 29, Đại lộ Thăng Long, Hà Nội</p>
            <p><strong>Số điện thoại:</strong> 0123 456 789</p>
            <p><strong>Email:</strong> trunghieu2003hhh@gmail.com</p>

          </div>

        </div>

        <div className="contact-header">

          <h1>Liên hệ với chúng tôi</h1>
          <p>Hãy để lại tin nhắn, chúng tôi sẽ phản hồi sớm nhất có thể.</p>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
