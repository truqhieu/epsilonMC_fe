// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Descriptions, Tag, Card, Empty } from "antd";
import CartServices from "../../../services/CartServices";
import { useSelector } from "react-redux";
import { CartContainer } from "./style";
import CustomModal from "../../../components/CustomModal";

const { Text } = Typography;

const HistoryCart = () => {
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm để lấy lịch sử mua hàng
  const fetchPurchaseHistory = async () => {
    try {
      setLoading(true);
      const { success, data } = await CartServices.getPurchaseHistory({ accountId });
      if (success) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử mua hàng:", error);
    } finally {
      setLoading(false);
    }
  };

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
      render: (status) => <Tag color="green">{status}</Tag>,
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
        <CustomModal
          title="Thông tin đơn hàng"
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          {selectedOrder && (
            <div>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Mã đơn hàng">{selectedOrder.orderCode}</Descriptions.Item>
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
        </CustomModal>
      </div>
    </CartContainer>
  );
};

export default HistoryCart;
