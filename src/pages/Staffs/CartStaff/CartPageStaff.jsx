// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../../services/CartServices";
import { Table, Spin, Typography, Card, Tag, Space, message, Dropdown, Menu, Modal } from "antd";

const { Title, Text } = Typography;

const CartPageStaff = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempStatus, setTempStatus] = useState(""); // 🔹 Trạng thái tạm thời

  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  useEffect(() => {
    if (accountId) fetchOrders();
  }, [accountId]);

  // 🟢 Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { success, data } = await CartServices.viewAllCart({ accountId });
      if (success) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const { success } = await CartServices.updateOrderStatus({
        accountId,
        cartId: orderId,
        status: newStatus,
      });

      if (success) {
        message.success("Cập nhật trạng thái thành công!");

        // 🔹 Cập nhật UI
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        // 🔹 Cập nhật trạng thái trong modal nếu đơn hàng đang được chọn
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        message.error("Cập nhật thất bại.");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái đơn hàng.");
    }
  };

  // 🟢 Hiển thị trạng thái (Dropdown chỉ hiển thị trong Modal)
  const renderStatusTag = (status, orderId, isModal = false) => {
    const color = status === "Shipped" ? "green" : status === "Paid" ? "blue" : "red";

    // 🟡 Nếu ở Modal và trạng thái là "Paid" → Hiển thị dropdown
    if (isModal && status === "Paid") {
      return (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="Shipped" onClick={() => setTempStatus("Shipped")}>
                Shipped
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Tag color={color} style={{ cursor: "pointer" }}>
            {status} ▼
          </Tag>
        </Dropdown>
      );
    }

    // 🟢 Ở màn hình chính → Chỉ hiển thị tag, không có dropdown
    return <Tag color={color}>{status}</Tag>;
  };

  // 🟢 Cấu hình cột bảng
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <Space direction="vertical">
          {record?.items?.map((item, index) => (
            <Text key={index}>{item?.productId?.name || "Không xác định"}</Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Space direction="vertical">
          {record?.items?.map((item, index) => (
            <Text key={index}>{item.quantity}</Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "orderTotal",
      key: "orderTotal",
      render: (_, record) => {
        const total = record.items.reduce(
          (sum, item) => sum + item.quantity * (item.productId?.price || 0),
          0
        );
        return (
          <Text strong style={{ color: "#52c41a" }}>
            {`${total.toLocaleString()} VND`}
          </Text>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => renderStatusTag(status, record._id, false), // ❌ Không hiển thị dropdown
    },
  ];

  return (
    <div className="cart-container">
      <Card className="cart-card">
        <Title level={2} className="cart-title">
          Trạng Thái Đơn Hàng
        </Title>

        {loading ? (
          <div className="cart-loading">
            <Spin size="large" />
          </div>
        ) : orders.length === 0 ? (
          <Text className="cart-empty">Không có đơn hàng nào.</Text>
        ) : (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 5 }}
            bordered
            onRow={(record) => ({
              onClick: () => {
                setSelectedOrder(record);
                setTempStatus(record.status); // 🔹 Lưu trạng thái hiện tại vào tempStatus
                setModalVisible(true);
              },
            })}
          />
        )}
      </Card>

      {/* 🟢 Modal chi tiết đơn hàng */}
      <Modal
        title="Chi tiết đơn hàng"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          if (tempStatus !== selectedOrder.status) {
            handleUpdateStatus(selectedOrder._id, tempStatus); // 🔹 Cập nhật trạng thái khi ấn OK
          }
          setModalVisible(false);
        }}
      >
        {selectedOrder && (
          <>
            <Text strong>Trạng thái:</Text> {renderStatusTag(tempStatus, selectedOrder._id, true)}{" "}
            {/* 🟢 Dropdown chỉ hiển thị trong modal */}
            <br />
            <Text strong>Sản phẩm:</Text>
            <Space direction="vertical" style={{ display: "block", marginTop: 5 }}>
              {selectedOrder.items.map((item, index) => (
                <Text key={index}>
                  {item?.productId?.name || "Không xác định"} - {item.quantity} cái
                </Text>
              ))}
            </Space>
            <br />
            <Text strong>Tổng tiền:</Text>{" "}
            <Text style={{ color: "#52c41a" }}>
              {`${selectedOrder.totalPrice.toLocaleString()} VND`}
            </Text>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CartPageStaff;
