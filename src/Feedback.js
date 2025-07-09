import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import './Feedback.css';

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comments: ''
  });
  const [reviews, setReviews] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://staytrack.onrender.com/User');
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      name: formData.name,
      email: formData.email,
      comment: formData.comments,
      rating: rating
    };

    try {
      const response = await axios.post('https://staytrack.onrender.com/User', newReview);
      setReviews([response.data, ...reviews]);

      const submittedName = formData.name;
      setShowSnackbar(submittedName);
      setTimeout(() => setShowSnackbar(false), 3000);

      setFormData({ name: '', email: '', comments: '' });
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container-fluid review-container">
      {showSnackbar && (
        <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: 9999 }}>
          <div className="toast show bg-success text-white shadow-lg">
            <div className="toast-body fw-semibold px-4 py-3 fs-6 d-flex align-items-center">
              <FaStar className="me-2" />
              Thank you for your review, {showSnackbar}!
            </div>
          </div>
        </div>
      )}

      <div className="row g-4" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Review Form */}
        <div className="col-lg-6">
          <div className="review-card h-100">
            <h3 className="review-title">Write a Review</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-medium">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Rating</label>
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          style={{ display: 'none' }}
                        />
                        <FaStar
                          size={28}
                          color={currentRating <= (hover || rating) ? '#D4AF37' : '#e4e5e9'}
                          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(0)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Comments</label>
                <textarea
                  className="form-control"
                  name="comments"
                  value={formData.comments}
                  rows="4"
                  onChange={handleChange}
                  required />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success fw-bold py-2">
                  <FaStar className="me-2" />
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Review List */}
        <div className="col-lg-6">
          <div className="review-card h-100">
            <h3 className="review-title text-dark">Customer Reviews</h3>
            <div className="overflow-auto pe-3" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {reviews.length === 0 ? (
                <div className="text-center py-4">
                  <FaStar size={48} color="#e4e5e9" className="mb-3" />
                  <p className="text-muted fs-5">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                reviews.map((rev, idx) => (
                  <div key={idx} className="review-list-card">
                    <div>
                      <h5 className="card-title mb-1">{rev.name}</h5>
                      <p className="mb-1 text-muted small">{rev.email}</p>
                      <div className="mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < rev.rating ? '#D4AF37' : '#e4e5e9'}
                            className="me-1"
                          />
                        ))}
                      </div>
                      <p className="card-text mt-2">{rev.comment}</p>
                      <div className="text-end mt-2">
                        <small className="text-muted">
                          {new Date().toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;