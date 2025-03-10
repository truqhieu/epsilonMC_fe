import { TableCustom } from "../../Staffs/AppointmentList/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HistoryCartServices from "../../../services/HistoryCartServices";
import { Typography, Tag, Spin, Empty, Card } from "antd";

const { Title, Text } = Typography;

function HistoryCart() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy accountId từ Redux
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  useEffect(() => {
    if (accountId) {
      fetchHistory();
    }
  }, [accountId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await HistoryCartServices.getHistoryCart(accountId);
      if (response.success) {
        setHistory(response.data);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử mua hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => <Text strong>{index + 1}</Text>,
    },
    {
      title: "Ngày mua",
      dataIndex: "purchasedAt",
      key: "purchasedAt",
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
      title: "Sản phẩm",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Text strong>{item.productId?.name || "Không có tên"}</Text> - {item.quantity} sản phẩm
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => <Text strong>{`${price.toLocaleString()} VND`}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: () => <Tag color="green">Paid</Tag>, // Luôn hiển thị Paid
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center">Lịch sử mua hàng</Title>
      {loading ? (
        <div className="text-center py-5">
          <Spin size="large" />
        </div>
      ) : history.length === 0 ? (
        <Card className="text-center p-6">
          <Empty description="Không có đơn hàng nào" />
        </Card>
      ) : (
        <TableCustom
          columns={columns}
          dataSource={history}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
}

export default HistoryCart;