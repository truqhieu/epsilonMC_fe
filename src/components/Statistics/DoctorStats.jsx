// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import StatisticService from "../../services/StatisticServices";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DoctorStats = () => {
  const [doctorStats, setDoctorStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchDoctorStats(selectedYear);
  }, [selectedYear]);

  const fetchDoctorStats = async (year) => {
    try {
      console.log("🔍 Đang lấy thống kê bác sĩ cho năm:", year);

      const yearNumber = parseInt(year);

      if (isNaN(yearNumber) || yearNumber > new Date().getFullYear()) {
        throw new Error("Không thể xem thống kê cho năm không hợp lệ");
      }

      const response = await StatisticService.getMonthlyAppointmentsByDoctor(yearNumber);

      if (response && Array.isArray(response) && response.length > 0) {
        console.log(" Dữ liệu hợp lệ, hiển thị biểu đồ.");
        setDoctorStats(response);
      } else {
        console.warn(" API trả về mảng rỗng hoặc dữ liệu không hợp lệ.");
        setDoctorStats([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thống kê bác sĩ:", error);
      setDoctorStats([]);
      alert("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Thống kê Bác sĩ</h1>

      <div className="chart-section">
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Chọn năm: </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div style={{ height: "500px", width: "100%" }}>
          <ResponsiveContainer>
            <BarChart data={doctorStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="doctorName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointmentCount" fill="#2563eb" name="Tổng số ca khám" />
              <Bar dataKey="completedCount" fill="#16a34a" name="Số ca hoàn thành" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DoctorStats;
