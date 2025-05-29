import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Import images from src/assets/
import rest1 from './assets/rest1.jpg';
import rest2 from './assets/rest2.jpg';
import rest3 from './assets/rest3.jpg';
import roomService from './assets/room-service.jpg';
import diningService from './assets/dining-service.jpg';
import spaService from './assets/spa-service.jpg';
import testimonial1 from './assets/testimonial1.jpg';
import testimonial2 from './assets/testimonial2.jpg';
import testimonial3 from './assets/testimonial3.jpg';

function Home() {
  const [currentBg, setCurrentBg] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  // Array of background images
  const backgrounds = [rest1, rest2, rest3];

  // Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Business Traveler",
      quote: "Absolutely stunning experience! The staff went above and beyond to make my stay comfortable.",
      rating: 5,
      image: testimonial1,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Family Vacation",
      quote: "Perfect for our family vacation. Kids loved the activities and we enjoyed the fine dining options.",
      rating: 5,
      image: testimonial2,
    },
    {
      id: 3,
      name: "Emma Williams",
      position: "Honeymoon Stay",
      quote: "The romantic package exceeded our expectations. Beautiful views and exceptional service.",
      rating: 5,
      image: testimonial3,
    },
  ];

  return (
    <div className="container">
      {/* Hero Section with rotating backgrounds */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgrounds[currentBg]})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h2 className="hero-subtitle">THE LUXURY HOTEL</h2>
            <h1 className="hero-title">Experience Luxury Like Never Before</h1>
            <div className="button-group">
              <button className="primary-button">Explore Our Rooms</button>
              <button className="secondary-button">View Packages</button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-section">
        <div className="booking-form">
          <h3 className="booking-title">Book Your Stay</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="form-input"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>
            <button className="book-now-button">Check Availability</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">Our Exclusive Services</h2>
          <p className="section-subtitle">Experience the pinnacle of luxury hospitality</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-image-container">
              <img src={roomService} alt="Luxury Accommodation" className="service-image" />
              <div className="service-overlay"></div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Luxury Accommodation</h3>
              <p className="service-description">
                Experience comfort in our elegantly designed rooms and suites with premium amenities
              </p>
              <Link to="/book" className="service-link">Discover More →</Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-image-container">
              <img src={diningService} alt="Fine Dining" className="service-image" />
              <div className="service-overlay"></div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Fine Dining</h3>
              <p className="service-description">
                Savor exquisite cuisine prepared by award-winning chefs in our restaurants
              </p>
              <Link to="/dine" className="service-link">Discover More →</Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-image-container">
              <img src={spaService} alt="Premium Spa" className="service-image" />
              <div className="service-overlay"></div>
            </div>
            <div className="service-content">
              <h3 className="service-title">Premium Spa</h3>
              <p className="service-description">
                Rejuvenate your senses with our world-class spa treatments and therapies
              </p>
              <Link to="/spa" className="service-link">Discover More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">Hear from our valued guests about their experiences</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <div>
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-position">{testimonial.position}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay Updated with Exclusive Offers</h2>
          <p className="newsletter-description">
            Subscribe to our newsletter and be the first to know about special offers and events
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">LuxeStay</h3>
            <p className="footer-description">
              Providing exceptional hospitality and memorable experiences for our valued guests.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">🐦</a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/book" className="footer-link">Rooms & Suites</Link></li>
              <li><Link to="/dine" className="footer-link">Dining</Link></li>
              <li><Link to="/spa" className="footer-link">Spa & Wellness</Link></li>
              <li><Link to="/feedback" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="contact-info">
              <span className="contact-icon">📍</span> 123 Resort Avenue, Paradise City
            </p>
            <p className="contact-info">
              <span className="contact-icon">📞</span> +1 (555) 123-4567
            </p>
            <p className="contact-info">
              <span className="contact-icon">✉️</span> info@luxestay.com
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2025 LuxeStay Hotel & Resorts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;