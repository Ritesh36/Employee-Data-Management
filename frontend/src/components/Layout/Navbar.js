// src/components/Layout/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">👥</span>
          <h2>Employee MS</h2>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/employees" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Employees
            </NavLink>
          </li>
        </ul>

        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar">
              {getInitials(user?.username)}
            </div>
            <div className="user-details">
              <div className="user-name">{user?.username}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;