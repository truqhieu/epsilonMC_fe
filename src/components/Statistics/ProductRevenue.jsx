import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Spin, Table, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import StatisticServices from '../../services/StatisticServices';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ProductRevenue = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    orders: []
  });
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  
  const { user } = useSelector((state) => state.auth);
  const accountId = user?.accountId;

  useEffect(() => {
    if (accountId) {
      fetchRevenueData();
    }
  }, [accountId]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const [startDate, endDate] = dateRange;
      
      console.log('Fetching revenue data with params:', {
        accountId,
        startDate: startDate?.format('YYYY-MM-DD'),
        endDate: endDate?.format('YYYY-MM-DD')
      });

      const response = await StatisticServices.getDetailedRevenueStatistics(
        accountId,
        startDate,
        endDate
      );
      
      console.log('API Response:', response);

      // Kiểm tra response theo cấu trúc mới từ backend
      if (response && response.success !== false && response.data) {
        setRevenueData({
          totalRevenue: response.data.totalRevenue || 0,
          orders: Array.isArray(response.data.orders) ? response.data.orders : []
        });
      } else {
        throw new Error(response?.message || "Dữ liệu trả về không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API thống kê doanh thu:", error);
      message.error(error.message || "Lỗi khi tải dữ liệu thống kê");
      setRevenueData({
        totalRevenue: 0,
        orders: []
      });
    } finally {
      setLoading(false);
    }
  };


  const handleDateChange = (dates) => {
    setDateRange(dates || []);
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Bệnh nhân',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'productPrice',
      key: 'productPrice',
      render: (price) => `${price?.toLocaleString() || 0} VNĐ`,
      align: 'right',
    },
    {
      title: 'Số lượng',
      dataIndex: 'productQuantity',
      key: 'productQuantity',
      align: 'right',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalOrderPrice',
      key: 'totalOrderPrice',
      render: (price) => <Text strong>{`${price?.toLocaleString() || 0} VNĐ`}</Text>,
      align: 'right',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status) => (
        <Text 
          style={{
            color: status === 'Paid' ? '#10B981' : status === 'Shipped' ? '#3B82F6' : '#EF4444'
          }}
        >
          {status === 'Paid' ? 'Đã thanh toán' : status === 'Shipped' ? 'Đã giao hàng' : 'Không xác định'}
        </Text>
      ),
    },
  ];

  if (loading && !revenueData) return (
    <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
      <Spin size="large" />
    </div>
  );

  return (
    <Card className="statistics-container" style={{ margin: '24px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Thống kê doanh thu sản phẩm
      </Title>

      <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
        <RangePicker 
          style={{ width: '300px' }}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
        />
        <Button 
          type="primary" 
          onClick={fetchRevenueData}
          loading={loading}
        >
          Lọc dữ liệu
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={revenueData.totalRevenue || 0}
              precision={0}
              suffix="VNĐ"
              valueStyle={{ color: '#3B82F6' }}
              formatter={(value) => value.toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Tổng số đơn hàng"
              value={revenueData.orders?.length || 0}
              valueStyle={{ color: '#10B981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Số sản phẩm đã bán"
              value={revenueData.orders?.reduce((sum, order) => sum + (order.productQuantity || 0), 0) || 0}
              valueStyle={{ color: '#EC4899' }}
            />
          </Card>
        </Col>
      </Row>
      <Card className="chart-container">
        <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Chi tiết đơn hàng
        </Title>
        <Table 
          columns={columns} 
          dataSource={revenueData.orders || []} 
          rowKey="orderCode"
          scroll={{ x: true }}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
          locale={{
            emptyText: 'Không có dữ liệu đơn hàng'
          }}
        />
      </Card>
    </Card>
  );
};

export default ProductRevenue;