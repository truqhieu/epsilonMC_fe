import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Table, 
  Button, 
  message,
  Empty,
  Tag,
  Space,
  Select,
  DatePicker
} from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import StatisticServices from '../../services/StatisticServices';

const { Title, Text } = Typography;
const { Option } = Select;

const AppointmentRevenue = () => {
  const [statsData, setStatsData] = useState({
    summary: {
      totalRevenue: 0,
      totalAppointments: 0,
      totalDoctors: 0,
      averageRevenuePerDoctor: 0
    },
    doctors: []
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [timeRangeType, setTimeRangeType] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [selectedYear, setSelectedYear] = useState(moment());

  const { user } = useSelector((state) => state.auth);

  const fetchRevenueData = async () => {
    try {
      let startDate, endDate;
      
      if (timeRangeType === 'month') {
        startDate = selectedMonth.startOf('month');
        endDate = selectedMonth.endOf('month');
      } else { // year
        startDate = selectedYear.startOf('year');
        endDate = selectedYear.endOf('year');
      }

      setLoading(true);
      setHasSearched(true);

      const response = await StatisticServices.getDoctorAppointmentRevenueStatistics({
        accountId: user.accountId,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD")
      });

      if (response?.success) {
        setStatsData(response.data);
        if (response.data.doctors.length === 0) {
          message.info("Không tìm thấy dữ liệu trong khoảng thời gian này");
        }
      } else {
        throw new Error(response?.message || "Dữ liệu không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      message.error(error.message || "Lỗi khi tải dữ liệu");
      setStatsData({
        summary: {
          totalRevenue: 0,
          totalAppointments: 0,
          totalDoctors: 0,
          averageRevenuePerDoctor: 0
        },
        doctors: []
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value).replace('₫', 'VNĐ');
  };

  const columns = [
    {
      title: 'Bác sĩ',
      dataIndex: 'doctorName',
      key: 'doctorName',
      render: (text) => <Text strong>{text || 'Không xác định'}</Text>
    },
    {
      title: 'Số ca khám',
      dataIndex: 'appointmentCount',
      key: 'appointmentCount',
      align: 'center',
      sorter: (a, b) => a.appointmentCount - b.appointmentCount,
      render: (count) => <Tag color="blue">{count}</Tag>
    },
    {
      title: 'Tổng doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      align: 'right',
      render: (value) => <Text type="success">{formatCurrency(value)}</Text>,
      sorter: (a, b) => a.totalRevenue - b.totalRevenue
    },
    {
      title: 'Doanh thu trung bình',
      dataIndex: 'averageRevenue',
      key: 'averageRevenue',
      align: 'right',
      render: (value) => formatCurrency(Math.round(value))
    }
  ];

  return (
    <Card className="statistics-container" style={{ margin: 16 }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        Thống kê doanh thu ca khám theo bác sĩ
      </Title>

      <Space direction="vertical" size="middle" style={{ marginBottom: 24, width: '100%' }}>
        <Space>
          <Select
            style={{ width: 120 }}
            value={timeRangeType}
            onChange={(value) => setTimeRangeType(value)}
          >
            <Option value="month">Theo tháng</Option>
          </Select>
          
          {timeRangeType === 'month' ? (
            <DatePicker
              picker="month"
              format="MM/YYYY"
              value={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              style={{ width: 150 }}
            />
          ) : (
            <DatePicker
              picker="year"
              format="YYYY"
              value={selectedYear}
              onChange={(date) => setSelectedYear(date)}
              style={{ width: 120 }}
            />
          )}
        </Space>

        <Button
          type="primary"
          onClick={fetchRevenueData}
          loading={loading}
        >
          Xem thống kê
        </Button>
      </Space>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={statsData.summary.totalRevenue}
              precision={0}
              suffix="VNĐ"
              valueStyle={{ color: '#3f8600' }}
              formatter={(value) => value.toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số ca khám"
              value={statsData.summary.totalAppointments}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Số bác sĩ"
              value={statsData.summary.totalDoctors}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Doanh thu trung bình"
              value={statsData.summary.averageRevenuePerDoctor}
              precision={0}
              suffix="VNĐ"
              valueStyle={{ color: '#13c2c2' }}
              formatter={(value) => Math.round(value).toLocaleString()}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title={<Text strong>Chi tiết doanh thu theo bác sĩ</Text>}
        loading={loading}
      >
        <Table
          columns={columns}
          dataSource={statsData.doctors}
          rowKey="doctorId"
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
          locale={{
            emptyText: hasSearched ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Không có dữ liệu trong khoảng thời gian này"
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={`Vui lòng chọn ${timeRangeType === 'month' ? 'tháng' : 'năm'} và nhấn 'Xem thống kê'`}
              />
            )
          }}
        />
      </Card>
    </Card>
  );
};

export default AppointmentRevenue;