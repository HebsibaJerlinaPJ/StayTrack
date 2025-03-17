import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Statistics.css';

const Dashboard = () => {
  // Data for 3D-like Pie Chart
  const pieData = {
    labels: ['Agoda', 'Walk-in', 'Trivago', 'Other Websites'],
    datasets: [
      {
        data: [10, 16, 56, 20],
        backgroundColor: ['#3498db', '#e67e22', '#e74c3c', '#2ecc71'],
        hoverBackgroundColor: ['#2980b9', '#d35400', '#c0392b', '#27ae60'],
        borderColor: '#fff',
        borderWidth: 2,
        borderJoinStyle: 'miter',
        borderRadius: 10,
        hoverOffset: 10,
        borderAlign: 'inner',
        spacing: 5,
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels: ['Maintenance', 'Salary', 'Electric Bills', 'External Services'],
    datasets: [
      {
        label: 'Hotel Expense',
        data: [8.94, 10.49, 19.3, 21.45],
        backgroundColor: ['#8e44ad', '#3498db', '#f1c40f', '#bdc3c7'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="chart-section">
        {/* Pie Chart */}
        <div className="pie-chart-container">
          <h2>Bookings Stats According to Platforms</h2>
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false,
              cutout: '0%',
              plugins: { legend: { position: 'top' } },
              elements: {
                arc: {
                  borderWidth: 2,
                  borderColor: '#fff',
                  borderAlign: 'inner',
                  spacing: 5,
                },
              },
            }}
          />
        </div>

        {/* Bar Chart */}
        <div className="bar-chart-container">
          <h2>Hotel Expense</h2>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Calendar Section */}
      <div className="calendar-container">
        <h2>Reserved Room on Different Days</h2>
        <div className="calendar-grid">
          {Array.from({ length: 12 }).map((_, monthIndex) => (
            <div key={monthIndex} className="calendar-month">
              <div className="month-label">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex]}
              </div>
              <div className="days-grid">
                {Array.from({ length: 31 }).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`day-cell ${Math.random() > 0.8 ? 'reserved' : ''}`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
