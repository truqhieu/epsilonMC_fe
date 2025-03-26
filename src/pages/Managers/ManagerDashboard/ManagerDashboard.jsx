import React, { useState } from 'react';
import './style/managerDashboard.css';
import ProductRevenue from '../../../components/Statistics/ProductRevenue';
import AppointmentRevenue from '../../../components/Statistics/AppointmentRevenue';
import AppointmentStats from '../../../components/Statistics/AppointmentStats';
import DoctorStats from '../../../components/Statistics/DoctorStats.jsx';
import { FaChartPie, FaUserMd, FaShoppingCart, FaStethoscope } from 'react-icons/fa';

const ManagerDashboard = () => {
  const [selectedStat, setSelectedStat] = useState(null);

  const renderStatComponent = () => {
    switch (selectedStat) {
      case 'appointment':
        return <AppointmentStats />;
      case 'doctor':
        return <DoctorStats />;
      case 'product':
        return <ProductRevenue />;
      case 'revenue':
        return <AppointmentRevenue />;
      default:
        return null;
    }
  };

  return (
    <div>
      {!selectedStat ? (
        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => setSelectedStat('appointment')}>
            <h2>Thống kê trạng thái khám bệnh</h2>
            <div className="dashboard-card-content">
              <FaChartPie className="dashboard-icon" />
            </div>
          </div>
          <div className="dashboard-card" onClick={() => setSelectedStat('doctor')}>
            <h2>Thống kê bác sĩ</h2>
            <div className="dashboard-card-content">
              <FaUserMd className="dashboard-icon" />
            </div>
          </div>
          <div className="dashboard-card" onClick={() => setSelectedStat('product')}>
            <h2>Doanh thu bán hàng</h2>
            <div className="dashboard-card-content">
              <FaShoppingCart className="dashboard-icon" />
            </div>
          </div>
          <div className="dashboard-card" onClick={() => setSelectedStat('revenue')}>
            <h2>Doanh thu khám bệnh</h2>
            <div className="dashboard-card-content">
              <FaStethoscope className="dashboard-icon" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setSelectedStat(null)}
            style={{
              margin: '20px',
              padding: '10px 20px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Quay lại
          </button>
          {renderStatComponent()}
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;