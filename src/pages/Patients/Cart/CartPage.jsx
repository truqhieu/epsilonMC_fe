import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../../services/CartServices";
import { Table, Button, message, Typography, Row, Col, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;
  const navigate = useNavigate();

  useEffect(() => {
    if (accountId) {
      fetchCart();
    }
  }, [accountId]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await CartServices.getCart({ accountId });
      if (response.success) {
        const pendingCart = response.data.find(cart => cart.status === "Pending");
        setCart(pendingCart || null);
      } else {
        setCart(null);
      }
    } catch (error) {
      message.error("Lỗi khi lấy giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await CartServices.removeFromCart({ accountId, productId });
      fetchCart();
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
    }
  };
  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      message.error("Giỏ hàng của bạn đang trống!");
      return;
    }
    try {
      const response = await CartServices.updateCart({ cartId: cart._id, status: "Paid" });
      if (response.success) {
        message.success("Thanh toán thành công! 🎉");
        fetchCart();
        setTimeout(() => {
          navigate("/san-pham");
        }, 1000);
      }
    } catch (error) {
      message.error("Lỗi khi thanh toán");
    }
  };


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
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
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

  return (
    <div>
      <Title level={2}>Giỏ hàng của bạn</Title>
      {cart ? (
        <>
          <Tag color={cart.status === "Paid" ? "green" : "orange"}>{cart.status}</Tag>
          <Table
            columns={columns}
            dataSource={cart.items}
            rowKey={(record) => record.productId._id}
          />
          {cart.status === "Pending" && (
            <Row justify="end">
              <Button type="primary" onClick={handleCheckout} loading={loading}>
                Thanh Toán
              </Button>
            </Row>
          )}
        </>
      ) : (
        <Text>Giỏ hàng trống</Text>
      )}
    </div>
  );
};

export default CartPage;