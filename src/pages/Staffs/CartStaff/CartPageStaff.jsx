// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../../services/CartServices";
import { Spin, Typography, Card, Tag, Space, message, Dropdown, Menu, Button } from "antd";
import { TableCustom } from "../AppointmentList/styles";
import CustomModal from "../../../components/CustomModal";

const { Text } = Typography;

const CartPageStaff = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempStatus, setTempStatus] = useState("");

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
        setModalVisible(false);
      } else {
        message.error("Cập nhật thất bại.");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái đơn hàng.", error);
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
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (orderCode) => <Text strong>{orderCode}</Text>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => <Text>{new Date(createdAt).toLocaleDateString()}</Text>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => (
        <Text style={{ color: "#52c41a" }}>{`${totalPrice.toLocaleString()} VND`}</Text>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => renderStatusTag(status, record._id, false),
    },
  ];

  return (
    <div className="cart-container">
      <Card className="cart-card">
        {loading ? (
          <div className="cart-loading">
            <Spin size="large" />
          </div>
        ) : orders.length === 0 ? (
          <Text className="cart-empty">Không có đơn hàng nào.</Text>
        ) : (
          <TableCustom
            columns={columns}
            dataSource={orders}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 5 }}
            bordered
            onRow={(record) => ({
              onClick: () => {
                setSelectedOrder(record);
                setTempStatus(record.status);
                setModalVisible(true);
              },
            })}
          />
        )}
      </Card>

      {/* 🟢 Modal chi tiết đơn hàng */}
      <CustomModal
        title="Chi tiết đơn hàng"
        width={400}
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
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
            <br />
            {tempStatus !== selectedOrder.status && (
              <Button
                onClick={() => handleUpdateStatus(selectedOrder._id, tempStatus)}
                style={{ marginTop: "10px" }}
              >
                Cập nhật
              </Button>
            )}
          </>
        )}
      </CustomModal>
    </div>
  );
};

export default CartPageStaff;
