import React, { useEffect, useState } from 'react';
import StatisticService from '../../services/StatisticServices';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Row, Col, Statistic, Typography, Spin } from 'antd';

const { Title } = Typography;

const AppointmentStats = () => {
  const [appointmentStats, setAppointmentStats] = useState(null);
  const COLORS = ["#34D399", "#FBBF24", "#EF4444"];

  useEffect(() => {
    fetchAppointmentStats();
  }, []);

  const fetchAppointmentStats = async () => {
    try {
      const response = await StatisticService.getAppointmentStatistics();
      setAppointmentStats(response);
    } catch (error) {
      console.error("Lỗi khi gọi API getAppointmentStatistics:", error);
    }
  };

  if (!appointmentStats) return (
    <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
      <Spin size="large" />
    </div>
  );

  return (
    <Card className="statistics-container" style={{ margin: '24px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Thống kê trạng thái khám bệnh
      </Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số ca khám"
              value={appointmentStats.total}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        {appointmentStats.statusStats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={stat.status}>
            <Card>
              <Statistic
                title={`Tỷ lệ ${stat.status}`}
                value={stat.rate}
                precision={2}
                suffix="%"
                valueStyle={{ color: COLORS[index] }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="chart-container">
        <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Biểu đồ phân bố trạng thái
        </Title>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={appointmentStats.statusStats.map(stat => ({
                name: stat.status,
                value: stat.rate
              }))}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(2)}%`}
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Card>
  );
};

export default AppointmentStats; 