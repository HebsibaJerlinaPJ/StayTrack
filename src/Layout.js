import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <h1 className="logo">LuxeStay</h1>
            <span className="logo-subtext">HOTEL & RESORTS</span>
          </div>
          
          <nav className="desktop-nav">
            <Link to="/" className="nav-link">Home</Link> {/* Added Home link */}
            <Link to="/book" className="nav-link">Booking</Link>
            <Link to="/dine" className="nav-link">Dining</Link>
            <Link to="/spa" className="nav-link">SPA</Link>
            <Link to="/feedback" className="nav-link">Feedback</Link>
            <Link to="/about" className="nav-link">AboutUS</Link>
            <Link to="/exp" className="nav-link">Experience</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </nav>
          
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <Link to="/" className="mobile-nav-link">Home</Link> {/* Added Home link */}
            <Link to="/book" className="mobile-nav-link">Booking</Link>
            <Link to="/dine" className="mobile-nav-link">Dining</Link>
            <Link to="/spa" className="mobile-nav-link">SPA</Link>
            <Link to="/feedback" className="mobile-nav-link">Feedback</Link>
            <Link to="/about" className="mobile-nav-link">AboutUS</Link>
            <Link to="/exp" className="mobile-nav-link">Experience</Link>
            <Link to="/login" className="mobile-nav-link">Login</Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

export default Layout;