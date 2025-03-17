import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBed, FaClipboardList, FaUserFriends, FaComments, FaCheckCircle } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h5 className="text-muted">Dashboard</h5>
        <div className="row g-3">
          {[
            { icon: <FaBed />, value: 21, label: "TOTAL ROOMS" },
            { icon: <FaClipboardList />, value: 8, label: "RESERVATIONS" },
            { icon: <FaUserFriends />, value: 13, label: "STAFFS" },
            { icon: <FaComments />, value: 4, label: "COMPLAINTS" },
            { icon: <FaBed />, value: 5, label: "BOOKED ROOMS" },
            { icon: <FaCheckCircle />, value: 16, label: "AVAILABLE ROOMS" },
            { icon: <FaCheckCircle />, value: 2, label: "CHECKED IN" },
            { icon: <MdOutlinePayments />, value: 5, label: "TOTAL PENDING PAYMENTS" },
          ].map((item, index) => (
            <div className="col-md-3" key={index}>
              <div className="p-3 border rounded shadow-sm text-center">
                <div className="fs-2 text-primary">{item.icon}</div>
                <h3>{item.value}</h3>
                <p className="mb-0 text-muted">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-4">
          <div className="col-md-6 text-center">
            <div className="p-3 border rounded shadow-sm">
              <h4>Rs. 52,500</h4>
              <p className="text-muted">TOTAL EARNINGS</p>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <div className="p-3 border rounded shadow-sm">
              <h4>Rs. 38,500</h4>
              <p className="text-muted">PENDING PAYMENT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;