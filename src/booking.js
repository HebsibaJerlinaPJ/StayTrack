import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoomDashboard.css";

const RoomBookingForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [roomType, setRoomType] = useState("Single");
  const [formData, setFormData] = useState([
    { name: "", age: "", gender: "", aadhar: "", phone: "" },
  ]);

  const roomCapacity = {
    Single: 1,
    Double: 2,
    Family: 4,
    "Master Suite": 5,
    "Connecting Rooms": 6,
  };

  const handleRoomTypeChange = (e) => {
    const selectedType = e.target.value;
    setRoomType(selectedType);
    setFormData(
      Array.from({ length: roomCapacity[selectedType] }, () => ({
        name: "",
        age: "",
        gender: "",
        aadhar: "",
        phone: "",
      }))
    );
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...formData];
    updatedData[index][name] = value;
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://staytrack.onrender.com/api/book-room", {
        roomType,
        members: formData.length,
        guests: formData,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Failed to book room. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Home Button */}
      

      <h2 className="text-center">Room Booking Form</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
        <div className="mb-3">
          <label className="form-label">Room Type</label>
          <select className="form-select" value={roomType} onChange={handleRoomTypeChange}>
            {Object.keys(roomCapacity).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {formData.map((person, index) => (
          <div key={index} className="border p-3 mb-3 rounded">
            <h5>Guest {index + 1}</h5>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={person.name} onChange={(e) => handleChange(index, e)} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" name="age" value={person.age} onChange={(e) => handleChange(index, e)} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Gender</label>
              <select className="form-select" name="gender" value={person.gender} onChange={(e) => handleChange(index, e)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Aadhar Number</label>
              <input type="text" className="form-control" name="aadhar" value={person.aadhar} onChange={(e) => handleChange(index, e)} required />
            </div>
            <div className="mb-2">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-control" name="phone" value={person.phone} onChange={(e) => handleChange(index, e)} required />
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-success w-100">Submit</button>
      </form>
    </div>
  );
};

export default RoomBookingForm;
