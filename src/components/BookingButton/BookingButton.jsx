import { useSelector } from "react-redux";
import "./BookingButton.css";
import { Link } from "react-router-dom";

const BookingButton = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <button className="booking-button">
      <Link to="/dat-lich" style={{ color: "white", textDecoration: "none" }}>
        {user ? "Đặt lịch tái khám →" : "Đặt hẹn ngay →"}
      </Link>
    </button>
  );
};

export default BookingButton;
