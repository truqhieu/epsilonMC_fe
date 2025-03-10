import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../../services/CartServices";
import { Table, Spin, Typography, Card, Tag, Space } from "antd";
import "./CartPageStaff.css";

const { Title, Text } = Typography;

const CartPageStaff = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  useEffect(() => {
    if (accountId) fetchOrders();
  }, [accountId]);

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

  const renderStatusTag = (status) => {
    const color = status === "Đã gửi hàng" ? "green" : "red";
    return <Tag color={color}>{status}</Tag>;
  };

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
      title: "Đơn giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => (
        <Space direction="vertical">
          {record?.items?.map((item, index) => (
            <Text key={index} strong style={{ color: "#fa541c" }}>
              {`${(item.quantity * (item.productId?.price || 0)).toLocaleString()} VND`}
            </Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "statusStaff",
      key: "statusStaff",
      render: (status) => <>{renderStatusTag(status)}</>,
    },
    {
      title: "Tổng tiền đơn hàng",
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
          />
        )}
      </Card>
    </div>
  );
};

export default CartPageStaff;
