import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <div style={{ width: "250px", minHeight: "100vh", position: "fixed" }}>
        <Sidebar />
      </div>

      {/* Dashboard content shifted to the right */}
      <div className="p-4" style={{ marginLeft: "250px", width: "100%" }}>
        <h2 className="mb-4">Hotel Dashboard</h2>
        <div className="row g-3">
          {[
            { label: "Total Rooms", value: stats.totalRooms },
            { label: "Booked Rooms", value: stats.bookedRooms },
            { label: "Available Rooms", value: stats.availableRooms },
            { label: "Checked In", value: stats.checkedIn },
            { label: "Reservations", value: stats.totalBookings },
            { label: "Employees", value: stats.totalEmployees },
            { label: "Complaints", value: stats.totalComplaints },
          ].map((item, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="border shadow-sm p-3 rounded text-center">
                <h3>{item.value}</h3>
                <p className="text-muted">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <h5>Bookings by Country</h5>
            <PieChart width={300} height={250}>
              <Pie
                data={stats.bookingsByCountry}
                dataKey="count"
                nameKey="country"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {stats.bookingsByCountry.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="col-md-6">
            <h5>Monthly Booking</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { month: "Jan", bookings: 20 },
                { month: "Feb", bookings: 15 },
                { month: "Mar", bookings: 22 },
                { month: "Apr", bookings: 30 },
                { month: "May", bookings: 25 },
                { month: "Jun", bookings: 35 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <h5>Bookings Bary Room Type</h5>
            <PieChart width={300} height={250}>
              <Pie
                data={stats.bookingsPerRoomType}
                dataKey="count"
                nameKey="type"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {stats.bookingsPerRoomType.map((entry, index) => (
                  <Cell key={`room-type-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="col-md-6">
            <h5>Monthly Revenue</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="row mt-4 text-center">
          <div className="col-md-6">
            <div className="p-3 border shadow-sm">
              <h4>₹ {stats.earnings}</h4>
              <p className="text-muted">Total Earnings</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border shadow-sm">
              <h4>₹ {stats.pendingPayments}</h4>
              <p className="text-muted">Pending Payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
