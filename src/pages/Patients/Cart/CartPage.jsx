// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../../services/CartServices";
import { Table, Button, message, Typography, Row, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PaymentPage from "./components/PaymentPage";
import { CartContainer } from "./style";
import InvoiceServices from "../../../services/InvoiceServices";
import ConfirmBooking from "./components/ConfirmBooking";

const { Title, Text } = Typography;

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;
  const navigate = useNavigate();
  const invoiceId = localStorage.getItem("invoiceId");

  useEffect(() => {
    if (accountId) fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { success, data } = await CartServices.getCart({ accountId });
      if (success) {
        setCart(data.find((cart) => cart.status === "Pending") || null);
      }
    } catch (error) {
      message.error("Lỗi khi lấy giỏ hàng", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartId, productId, quantity) => {
    if (quantity <= 0) return message.error("Số lượng không hợp lệ!");

    setUpdating(true);
    try {
      await CartServices.updateCart({ cartId, productId, quantity });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.productId._id === productId ? { ...item, quantity } : item
        ),
      }));
    } catch (error) {
      message.error("Lỗi khi cập nhật số lượng", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleQuantityChange = (value, productId, stock) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.productId._id === productId ? { ...item, quantity: Math.min(value, stock) } : item
      ),
    }));
  };

  const handleRemoveItem = async (productId) => {
    try {
      await CartServices.removeFromCart({ accountId, productId });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId._id !== productId),
      }));
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm", error);
    }
  };

  const getInvoiceById = async (id, intervalId) => {
    try {
      const res = await InvoiceServices.getInvoiceById(id);
      console.log(res?.invoice?.status);
      if (res?.invoice?.status === "Paid") {
        clearInterval(intervalId);
        setOpenModalPayment(true);
        setOpenModal(false);
        handleCheckout();
        localStorage.removeItem("invoiceId");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getInvoiceById(invoiceId, intervalId);
    }, 5000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId]);

  const handleCheckout = async () => {
    if (!cart?.items.length) return message.warning("Giỏ hàng trống!");

    try {
      await Promise.all(
        cart.items.map((item) =>
          CartServices.updateCart({
            cartId: cart._id,
            productId: item.productId._id,
            quantity: item.quantity,
          })
        )
      );
      await CartServices.updateCart({ cartId: cart._id, status: "Paid" });
      message.success("Thanh toán thành công!");
      setCart(null);
      setTimeout(() => navigate("/san-pham"), 1000);
    } catch (error) {
      message.error("Lỗi khi thanh toán", error);
    }
  };

  const handlePayment = async () => {
    if (!cart?.items.length) return message.warning("Giỏ hàng trống!");
    try {
      const res = await InvoiceServices.createInvoice({
        cartId: cart._id,
        patient: accountId,
        amount: totalPrice,
      });
      if (res.success) {
        localStorage.setItem("invoiceId", res.invoiceId);
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán", error);
    }
  };

  const totalPrice = useMemo(
    () => cart?.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0) || 0,
    [cart]
  );

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => record.productId.name,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Input
          type="number"
          min={1}
          max={record.productId.stock}
          value={record.quantity}
          onChange={(e) =>
            handleQuantityChange(
              parseInt(e.target.value),
              record.productId._id,
              record.productId.stock
            )
          }
          onBlur={() => updateCartItem(cart._id, record.productId._id, record.quantity)}
          disabled={updating}
          style={{ width: "80px" }}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => `${(record.productId.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleRemoveItem(record.productId._id)}>
          Xóa
        </Button>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <CartContainer>
      <div className="container-cart">
        <div className="title-cart">Giỏ hàng</div>
        {cart ? (
          <>
            <Table
              columns={columns}
              dataSource={cart.items}
              rowKey={(record) => record.productId._id}
              pagination={false}
            />
            <Row justify="end" style={{ marginTop: "16px" }}>
              <Title level={4}>Tổng tiền: {totalPrice.toLocaleString()} VND</Title>
            </Row>
            {cart.status === "Pending" && (
              <Row justify="end" style={{ marginTop: "16px" }}>
                <Button type="primary" onClick={handlePayment} loading={updating}>
                  Thanh Toán
                </Button>
              </Row>
            )}
          </>
        ) : (
          <Text>Giỏ hàng trống</Text>
        )}
        {openModal && (
          <PaymentPage
            open={openModal}
            onCancel={() => setOpenModal(false)}
            amount={totalPrice}
            invoiceId={invoiceId}
          />
        )}
        {openModalPayment && (
          <ConfirmBooking open={openModalPayment} onCancel={() => setOpenModalPayment(false)} />
        )}
      </div>
    </CartContainer>
  );
};

export default CartPage;
