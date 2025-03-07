import BookingForm from "./components/BookingForm";
import { useEffect, useState } from "react";
import { BankOutlined, CheckOutlined, UserOutlined } from "@ant-design/icons";
import { ConfigProvider, Steps } from "antd";
import PaymentPage from "./components/PaymentPage";
import { BookingPageContainer } from "./styles";
import InvoiceServices from "../../services/InvoiceServices";
import ConfirmBooking from "./components/ConfirmBooking";
import { useSelector } from "react-redux";
import ReBookingForm from "./components/ReBookingForm";

const BookingPage = () => {
  const [current, setCurrent] = useState(0);
  const [amount, setAmount] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  const invoiceId = localStorage.getItem("invoiceId");
  const { user } = useSelector((state) => state.auth);

  const getInvoiceById = async (id, intervalId) => {
    try {
      const res = await InvoiceServices.getInvoiceById(id);
      console.log(res?.invoice?.status);
      if (res?.invoice?.status === "Paid") {
        setCurrent(2);
        clearInterval(intervalId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isBooking) {
      const intervalId = setInterval(() => {
        getInvoiceById(invoiceId, intervalId);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [invoiceId, isBooking]);

  const qr_url = `https://qr.sepay.vn/img?acc=67808082002&bank=TPBank&amount=${amount}&des=TKPEH ${invoiceId}`;

  return (
    <BookingPageContainer>
      <div className="booking-page">
        <div className="booking-form-title">Thông tin đặt khám</div>
        <ConfigProvider
          theme={{
            components: {
              Steps: {
                colorPrimary: "#1ab2c9",
              },
            },
          }}
        >
          <Steps
            current={current}
            items={[
              {
                title: "Thông tin đặt khám",
                icon: <UserOutlined style={{ color: "#1ab2c9" }} />,
              },
              {
                title: "Thanh toán phí khám",
                icon: <BankOutlined style={{ color: "#1ab2c9" }} />,
              },
              {
                title: "Hoàn thành đặt khám",
                icon: <CheckOutlined style={{ color: "#1ab2c9" }} />,
              },
            ]}
          />
        </ConfigProvider>

        <div className="steps-content">
          {current === 0 &&
            (user?.role === "patient" ? (
              <ReBookingForm
                setCurrent={setCurrent}
                setAmount={setAmount}
                setIsBooking={setIsBooking}
              />
            ) : (
              <BookingForm
                setCurrent={setCurrent}
                setAmount={setAmount}
                setIsBooking={setIsBooking}
              />
            ))}
          {current === 1 && <PaymentPage qr_url={qr_url} amount={amount} />}
          {current === 2 && <ConfirmBooking />}
        </div>
      </div>
    </BookingPageContainer>
  );
};

export default BookingPage;
