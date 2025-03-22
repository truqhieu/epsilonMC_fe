import React, { useEffect, useState } from "react";
import StatisticService from "../../services/StatisticServices";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./style/dashboard.css";

const StatisticsDashboard = () => {
  const [appointmentStats, setAppointmentStats] = useState(null);
  const [doctorStats, setDoctorStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAppointmentStats();
    fetchDoctorStats(selectedYear);
  }, [selectedYear]);

  const fetchAppointmentStats = async () => {
    try {
      const response = await StatisticService.getAppointmentStatistics();

      setAppointmentStats(response); // Xóa .data đi
    } catch (error) {
      console.error(" Lỗi khi gọi API getAppointmentStatistics:", error);
    }
  };

  const fetchDoctorStats = async (year) => {
    try {
      console.log(
        `🔍 Đang gọi API getMonthlyAppointmentsByDoctor với year: ${year}...`
      );
      const response = await StatisticService.getMonthlyAppointmentsByDoctor(
        year
      );
      console.log("✅ API getMonthlyAppointmentsByDoctor trả về:", response);
      setDoctorStats(response); // Xóa .data đi
    } catch (error) {
      console.error(
        " Lỗi khi gọi API getMonthlyAppointmentsByDoctor:",
        error
      );
    }
  };

  const COLORS = ["#34D399", "#FBBF24", "#EF4444"];

  return (
    <div className="dashboard-container">
      <h1>Thống kê Quản lý</h1>

      {appointmentStats && (
        <div className="dashboard-cards">
          <div className="card">
            <h3>Tổng số ca khám</h3>
            <p>{appointmentStats.total}</p>
          </div>
          <div className="card">
            <h3>Tỷ lệ hoàn thành</h3>
            <p>{appointmentStats.completedRate.toFixed(2)}%</p>
          </div>
          <div className="card">
            <h3>Tỷ lệ bị từ chối</h3>
            <p>{appointmentStats.rejectedRate.toFixed(2)}%</p>
          </div>
          <div className="card">
            <h3>Tỷ lệ bị hủy</h3>
            <p>{appointmentStats.cancelledRate.toFixed(2)}%</p>
          </div>
        </div>
      )}

      <div className="charts-container">
        {appointmentStats && (
          <div className="pie-chart">
            <h2>Tỷ lệ các trạng thái khám bệnh</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Hoàn thành",
                      value: appointmentStats.completedRate,
                    },
                    {
                      name: "Bị từ chối",
                      value: appointmentStats.rejectedRate,
                    },
                    { name: "Bị hủy", value: appointmentStats.cancelledRate },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="line-chart">
          <h2>Số lượng ca khám theo tháng</h2>
          <div style={{ marginBottom: "10px" }}>
            <label>Chọn năm:</label>
            <select
              value={selectedYear}
              onChange={(e) => {
                console.log(`🔄 Thay đổi năm thành: ${e.target.value}`);
                setSelectedYear(e.target.value);
              }}
            >
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={doctorStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="doctorName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="appointmentCount"
                fill="#2563eb"
                name="Số lượng ca khám"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
