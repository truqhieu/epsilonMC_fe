import "./BookingButton.css";
import { Link } from "react-router-dom";

const BookingButton = () => {
  return (
    <button className="booking-button">
      <Link to="/dat-lich" style={{ color: "white", textDecoration: "none" }}>
        Đặt hẹn ngay →
      </Link>
    </button>
  );
};

export default BookingButton;
