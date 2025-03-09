import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../../services/CartServices";
import { Table, Button, InputNumber, message, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  const fetchCart = async () => {
    if (!accountId) return;
    try {
      setLoading(true);
      const response = await CartServices.getCart({ accountId });
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      message.error("Lỗi khi lấy giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [accountId]);

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await CartServices.updateCart({ accountId, productId, quantity });
      if (response.success) {
        // Cập nhật lại giỏ hàng với dữ liệu mới từ server
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.productId._id === productId ? { ...item, quantity } : item
          ),
        }));
        message.success("Cập nhật giỏ hàng thành công");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật giỏ hàng");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await CartServices.removeFromCart({ accountId, productId });
      if (response.success) {
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item.productId._id !== productId),
        }));
        message.success("Xóa sản phẩm khỏi giỏ hàng thành công");
      }
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const navigate = useNavigate(); // Thêm useNavigate để điều hướng

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      message.error("Giỏ hàng của bạn đang trống, không thể thanh toán!");
      return;
    }
  
    try {
      // Kiểm tra hàng tồn kho trước khi thanh toán
      const outOfStockItems = cart.items.filter((item) => item.quantity > item.productId.stock);
      if (outOfStockItems.length > 0) {
        message.error("Một số sản phẩm đã hết hàng, vui lòng kiểm tra lại!");
        return;
      }
  
      message.success("Thanh toán thành công! 🎉");
  
      await CartServices.clearCart({ accountId });
  
      setCart(null);
  
      setTimeout(() => {
        navigate("/san-pham");
      }, 1000);
    } catch (error) {
      message.error("Lỗi khi làm trống giỏ hàng sau khi thanh toán");
    }
  };
  
  
  
  
  
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productId",
      key: "product",
      render: (productId) => productId.name, // Giả sử productId có trường name
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleUpdateQuantity(record.productId._id, value)}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} VND`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleRemoveItem(record.productId._id)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Giỏ hàng của bạn</Title>
      {cart && cart.items && cart.items.length > 0 ? (
        <>
          <Table
            columns={columns}
            dataSource={cart.items}
            rowKey={(record) => record.productId._id}
          />
          <Row justify="end" style={{ marginTop: 24 }}>
            <Col>
              <Text strong>Tổng tiền: {calculateTotal()} VND</Text>
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: 16 }}>
            <Col>
              <Button type="primary" onClick={handleCheckout}>
                Thanh Toán
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Text>Giỏ hàng trống</Text>
      )}
    </div>
  );
};

export default CartPage;