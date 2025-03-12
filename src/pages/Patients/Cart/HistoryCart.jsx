import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Descriptions, Modal, Tag, Card, Empty } from "antd";
import CartServices from "../../../services/CartServices"; // Import service để gọi API
import { useSelector } from "react-redux"; // Sử dụng useSelector để lấy thông tin người dùng từ Redux
import { CartContainer } from "./style"; // Import style nếu có

const { Title, Text } = Typography;

const HistoryCart = () => {
  const { user } = useSelector((state) => state.auth); // Lấy thông tin người dùng từ Redux
  const accountId = user?.accountId; // Lấy accountId từ user
  const [orders, setOrders] = useState([]); // State để lưu trữ danh sách đơn hàng
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu đơn hàng được chọn
  const [isModalVisible, setIsModalVisible] = useState(false); // State để quản lý hiển thị Modal

  // Hàm để lấy lịch sử mua hàng
  const fetchPurchaseHistory = async () => {
    try {
      setLoading(true);
      const { success, data } = await CartServices.getPurchaseHistory({ accountId });
      if (success) {
        setOrders(data); // Lưu dữ liệu đơn hàng vào state
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử mua hàng:", error);
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    if (accountId) {
      fetchPurchaseHistory();
    }
  }, [accountId]);

  // Hàm để hiển thị chi tiết đơn hàng trong Modal
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true); // Hiển thị Modal
  };

  // Hàm để đóng Modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null); // Reset đơn hàng được chọn
  };

  // Cột cho bảng đơn hàng
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => <Text strong>{index + 1}</Text>,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Ngày mua",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        if (!date) return <Text type="secondary">Chưa cập nhật</Text>;
        const formattedDate = new Date(date).toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return <Text>{formattedDate}</Text>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="green">{status}</Tag>, // Luôn hiển thị Paid
    },
  ];

  // Hiển thị loading nếu đang tải dữ liệu
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <CartContainer>
      <div className="container-cart">
        <div className="title-cart">Lịch sử mua hàng</div>
        {orders.length === 0 ? (
          <Card className="text-center p-6">
            <Empty description="Không có đơn hàng nào" />
          </Card>
        ) : (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey={(record) => record._id}
            onRow={(record) => ({
              onClick: () => handleOrderClick(record), // Xử lý khi click vào một đơn hàng
            })}
            pagination={{ pageSize: 5 }}
          />
        )}

        {/* Modal hiển thị chi tiết đơn hàng */}
        <Modal
          title="Lịch sử mua hàng" // Tiêu đề Modal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          {selectedOrder && (
            <div>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Mã đơn hàng">
                  {selectedOrder.orderCode}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày mua">
                  {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color="green">{selectedOrder.status}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Sản phẩm">
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {selectedOrder.items.map((item) => (
                      <li key={item.productId._id}>
                        <Text strong>{item.productId.name}</Text> - Giá:{" "}
                        {item.price.toLocaleString()} VND
                      </li>
                    ))}
                  </ul>
                </Descriptions.Item>
                <Descriptions.Item label="Số lượng">
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {selectedOrder.items.map((item) => (
                      <li key={item.productId._id}>
                        <Text strong>{item.quantity}</Text>
                      </li>
                    ))}
                  </ul>
                </Descriptions.Item>
                <Descriptions.Item label="Tổng giá tiền">
                  {selectedOrder.totalPrice.toLocaleString()} VND
                </Descriptions.Item>
              </Descriptions>
            </div>
          )}
        </Modal>
      </div>
    </CartContainer>
  );
};

export default HistoryCart;