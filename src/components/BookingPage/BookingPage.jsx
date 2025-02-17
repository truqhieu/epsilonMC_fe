import "./BookingPage.css";
import { assets } from "../../assets/assets";
import BookingForm from "./components/BookingForm";
import { useState } from "react";

const BookingPage = () => {
  const [isBooking, setIsBooking] = useState(false);
  return (
    <div className="booking-page">
      <div className="booking-header">
        <img src={assets.logo} alt="logo" className="logo-image"></img>
        <div className="booking-description">
          Trao gửi yêu thương
          <br />
          Nâng niu tâm hồn bạn
        </div>
      </div>
      {isBooking ? (
        <div className="booking-success">Đặt lịch thành công</div>
      ) : (
        <BookingForm setIsBooking={setIsBooking} />
      )}
    </div>
  );
};

export default BookingPage;
