import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../../services/CartServices";
import { Table, Button, message, Typography, Row, Tag, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CartPage = () => {
  const [cart, setCart] = useState(null); // State lưu thông tin giỏ hàng
  const [loading, setLoading] = useState(false); // State để hiển thị loading khi fetch dữ liệu
  const [updating, setUpdating] = useState(false); // State để hiển thị loading khi cập nhật số lượng
  const { user } = useSelector((state) => state.auth); // Lấy thông tin người dùng từ Redux store
  const accountId = user?.accountId; // Lấy accountId của người dùng
  const navigate = useNavigate(); // Hook để điều hướng

  // Fetch giỏ hàng khi component được mount hoặc accountId thay đổi
  useEffect(() => {
    if (accountId) fetchCart();
  }, [accountId]);

  // Hàm fetch giỏ hàng từ backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await CartServices.getCart({ accountId });
      if (response.success) {
        const pendingCart = response.data.find(cart => cart.status === "Pending"); // Tìm giỏ hàng có trạng thái "Pending"
        setCart(pendingCart || null); // Set giỏ hàng vào state
      }
    } catch (error) {
      message.error("Lỗi khi lấy giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (value, productId, stock) => {
    if (value > stock) {
      message.warning(`Chỉ còn ${stock} sản phẩm trong kho`);
      value = stock;
    }
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map(item => item.productId._id === productId ? { ...item, quantity: value } : item)
    }));
  };

  // Hàm xử lý khi người dùng nhập xong số lượng
  const handleQuantityBlur = async (productId, quantity, stock) => {
    if (quantity <= 0 || quantity > stock) {
      message.error(`Số lượng không hợp lệ!`);
      return;
    }
    setUpdating(true);
    try {
      await CartServices.updateCart({ cartId: cart._id, productId, quantity }); // Gọi API cập nhật số lượng
      fetchCart(); // Fetch lại giỏ hàng sau khi cập nhật
    } catch (error) {
      message.error("Lỗi khi cập nhật số lượng");
    } finally {
      setUpdating(false);
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (productId) => {
    try {
      await CartServices.removeFromCart({ accountId, productId }); // Gọi API xóa sản phẩm
      fetchCart(); // Fetch lại giỏ hàng sau khi xóa
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
    }
  };

  // Hàm xử lý thanh toán
  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      message.warning("Giỏ hàng trống!");
      return;
    }

    try {
      // Cập nhật số lượng sản phẩm trong giỏ hàng trước khi thanh toán
      for (const item of cart.items) {
        await CartServices.updateCart({
          cartId: cart._id,
          productId: item.productId._id,
          quantity: item.quantity,
        });
      }

      // Thanh toán giỏ hàng
      await CartServices.updateCart({ cartId: cart._id, status: "Paid" });
      message.success("Thanh toán thành công!");
      setCart(null); // Xóa giỏ hàng khỏi state
      setTimeout(() => navigate("/san-pham"), 1000); // Chuyển hướng về trang sản phẩm sau 1 giây
    } catch (error) {
      message.error("Lỗi khi thanh toán");
    }
  };

  // Tính tổng tiền giỏ hàng
  const totalPrice = useMemo(() => cart?.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0) || 0, [cart]);

  // Cấu hình các cột của bảng
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => record.productId.name, // Hiển thị tên sản phẩm
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
          onChange={(e) => handleQuantityChange(parseInt(e.target.value), record.productId._id, record.productId.stock)}
          onBlur={() => handleQuantityBlur(record.productId._id, record.quantity, record.productId.stock)}
          disabled={updating}
          style={{ width: "80px" }}
        />
      ), // Input để thay đổi số lượng
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_, record) => `${(record.productId.price * record.quantity).toLocaleString()} VND`, // Hiển thị giá
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleRemoveItem(record.productId._id)}>
          Xóa
        </Button>
      ), // Nút xóa sản phẩm
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Giỏ hàng của bạn</Title>
      {loading ? (
        <Spin size="large" /> // Hiển thị loading khi đang fetch dữ liệu
      ) : cart ? (
        <>
          <Tag color={cart.status === "Paid" ? "green" : "orange"}>{cart.status}</Tag> {/* Hiển thị trạng thái giỏ hàng */}
          <Table
            columns={columns}
            dataSource={cart.items}
            rowKey={(record) => record.productId._id}
            pagination={false}
          />
          <Row justify="end" style={{ marginTop: "16px" }}>
            <Title level={4}>Tổng tiền: {totalPrice.toLocaleString()} VND</Title> {/* Hiển thị tổng tiền */}
          </Row>
          {cart.status === "Pending" && (
            <Row justify="end" style={{ marginTop: "16px" }}>
              <Button type="primary" onClick={handleCheckout} loading={loading}>
                Thanh Toán
              </Button> {/* Nút thanh toán */}
            </Row>
          )}
        </>
      ) : (
        <Text>Giỏ hàng trống</Text> // Hiển thị thông báo nếu giỏ hàng trống
      )}
    </div>
  );
};

export default CartPage;