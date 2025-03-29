// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import StatisticService from "../../services/StatisticServices";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Row, Col, Statistic, Typography, Spin } from "antd";

const { Title } = Typography;

const AppointmentStats = () => {
  const [appointmentStats, setAppointmentStats] = useState(null);
  const COLORS = {
    Completed: "#1890ff",
    Approved: "#34D399",
    Rejected: "#808080",
    Pending: "#FFD700",
    PendingPayment: "#FFA500",
    Cancelled: "#EF4444",
  };

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

  if (!appointmentStats)
    return (
      <div className="loading-container" style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );

  return (
    <Card className="statistics-container" style={{ margin: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        Thống kê trạng thái khám bệnh
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số ca khám"
              value={appointmentStats.total}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        {appointmentStats.statusStats.map((stat) => (
          <Col xs={24} sm={12} md={6} key={stat.status}>
            <Card>
              <Statistic
                title={`Tỷ lệ ${stat.status}`}
                value={`${stat.count} (${stat.rate.toFixed(2)}%)`}
                valueStyle={{ color: COLORS[stat.status] }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="chart-container">
        <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
          Biểu đồ phân bố trạng thái
        </Title>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={appointmentStats.statusStats.map((stat) => ({
                name: stat.status,
                value: stat.count,
                rate: stat.rate,
              }))}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ name, value, rate }) => `${name}: ${value} (${rate.toFixed(2)}%)`}
            >
              {appointmentStats.statusStats.map((stat, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[stat.status]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} (${props.payload.rate.toFixed(2)}%)`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Card>
  );
};

export default AppointmentStats;
