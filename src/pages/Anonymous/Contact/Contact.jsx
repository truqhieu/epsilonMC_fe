import "./Contact.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="contact-header">
          <h1>Liên hệ với chúng tôi</h1>
          <p>Hãy để lại tin nhắn, chúng tôi sẽ phản hồi sớm nhất có thể.</p>
        </div>
        <div className="contact-form">
          <h2>Gửi tin nhắn</h2>
          <form>
            <input type="text" placeholder="Họ và tên" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Số điện thoại" required />
            <textarea
              placeholder="Nội dung tin nhắn"
              rows="5"
              required
            ></textarea>
            <button type="submit">Gửi tin nhắn</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
