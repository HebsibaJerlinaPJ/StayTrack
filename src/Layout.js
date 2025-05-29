import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
            <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
            <NavLink to="/book" className="nav-link" activeClassName="active">Booking</NavLink>
            <NavLink to="/dine" className="nav-link" activeClassName="active">Dining</NavLink>
            <NavLink to="/spa" className="nav-link" activeClassName="active">SPA</NavLink>
            <NavLink to="/feedback" className="nav-link" activeClassName="active">Feedback</NavLink>
            <NavLink to="/about" className="nav-link" activeClassName="active">AboutUS</NavLink>
            <NavLink to="/exp" className="nav-link" activeClassName="active">Experience</NavLink>
            <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
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
            <NavLink to="/" className="mobile-nav-link" activeClassName="active">Home</NavLink>
            <NavLink to="/book" className="mobile-nav-link" activeClassName="active">Booking</NavLink>
            <NavLink to="/dine" className="mobile-nav-link" activeClassName="active">Dining</NavLink>
            <NavLink to="/spa" className="mobile-nav-link" activeClassName="active">SPA</NavLink>
            <NavLink to="/feedback" className="mobile-nav-link" activeClassName="active">Feedback</NavLink>
            <NavLink to="/about" className="mobile-nav-link" activeClassName="active">AboutUS</NavLink>
            <NavLink to="/exp" className="mobile-nav-link" activeClassName="active">Experience</NavLink>
            <NavLink to="/login" className="mobile-nav-link" activeClassName="active">Login</NavLink>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

export default Layout;