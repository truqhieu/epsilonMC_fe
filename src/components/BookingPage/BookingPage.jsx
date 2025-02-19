import BookingForm from "./components/BookingForm";
import { useState } from "react";
import { BankOutlined, CheckOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Steps } from "antd";
import PaymentPage from "./components/PaymentPage";
import { BookingPageContainer } from "./styles";

const BookingPage = () => {
  const [current, setCurrent] = useState(0);
  const [amount, setAmount] = useState(0);

  const invoiceId = localStorage.getItem("invoiceId");

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
          {current === 0 && (
            <BookingForm next={next} setAmount={setAmount} amount={amount} />
          )}
          {current === 1 && <PaymentPage qr_url={qr_url} amount={amount} />}
          {current === 2 && <div>Step 3 Content</div>}
        </div>

        <div className="steps-action">
          <Button disabled={current === 0} onClick={() => prev()}>
            Previous
          </Button>
          <Button type="primary" onClick={() => next()}>
            {current === 2 ? "Done" : "Next"}
          </Button>
        </div>
      </div>
    </BookingPageContainer>
  );
};

export default BookingPage;
