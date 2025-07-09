import { useState, useEffect } from "react";
import "./Complaints.css"; // Import the CSS file

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState("");
  const [reply, setReply] = useState({ id: "", text: "" });

  useEffect(() => {
    fetch("https://staytrack.onrender.com/complaints/")
      .then((res) => res.json())
      .then((data) => setComplaints(data));
  }, []);

  const submitComplaint = async () => {
    await fetch("https://staytrack.onrender.com/complaints/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "user123", description: newComplaint }),
    });
    window.location.reload();
  };

  const submitReply = async (id) => {
    await fetch("https://staytrack.onrender.com/complaints/reply", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaint_id: id, admin_reply: reply.text }),
    });
    window.location.reload();
  };

  const submitRating = async (id, value) => {
    await fetch("https://staytrack.onrender.com/complaints/rate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaint_id: id, rating: value }),
    });
    window.location.reload();
  };

  return (
    <div className="complaints-container">
      <div className="complaints-box">
        <h2 className="title">Complaints Management</h2>

        {/* Complaint Input Section */}
        <div className="complaint-input-box">
          <h3>Submit a Complaint</h3>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your complaint..."
              value={newComplaint}
              onChange={(e) => setNewComplaint(e.target.value)}
              className="complaint-input"
            />
            <button onClick={submitComplaint} className="submit-btn">
              Submit
            </button>
          </div>
        </div>

        {/* Complaints List */}
        <ul className="complaints-list">
          {complaints.map((complaint) => (
            <li key={complaint._id} className="complaint-card">
              <p className="complaint-text">{complaint.description}</p>
              <p className="status">
                Status: <span>{complaint.status}</span>
              </p>

              {/* Admin Reply Section */}
              {complaint.admin_reply && (
                <div className="admin-reply-box">
                  <p>
                    <strong>Admin Reply:</strong> {complaint.admin_reply}
                  </p>
                </div>
              )}

              {/* Reply Input Section */}
              {!complaint.admin_reply && (
                <div className="reply-section">
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    onChange={(e) => setReply({ id: complaint._id, text: e.target.value })}
                    className="reply-input"
                  />
                  <button onClick={() => submitReply(complaint._id)} className="reply-btn">
                    Reply
                  </button>
                </div>
              )}

              {/* Rating Section */}
              {complaint.admin_reply && !complaint.rating && (
                <div className="rating-section">
                  <p>Rate the response:</p>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => submitRating(complaint._id, star)}
                        className="star"
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}