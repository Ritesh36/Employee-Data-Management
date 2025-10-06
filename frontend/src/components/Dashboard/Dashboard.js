// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await employeeAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.username}!</h1>
        <p>Here's an overview of your employee management system</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">👥</div>
          <h3>Total Employees</h3>
          <div className="stat-value">{stats?.totalEmployees || 0}</div>
          <p>All registered employees</p>
        </div>

        <div className="stat-card active">
          <div className="stat-icon">✅</div>
          <h3>Active Employees</h3>
          <div className="stat-value">{stats?.activeEmployees || 0}</div>
          <p>Currently working</p>
        </div>

        <div className="stat-card departments">
          <div className="stat-icon">🏢</div>
          <h3>Departments</h3>
          <div className="stat-value">{stats?.departmentStats?.length || 0}</div>
          <p>Active departments</p>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Department Overview</h2>
        {stats?.departmentStats && stats.departmentStats.length > 0 ? (
          <div className="department-stats">
            {stats.departmentStats.map((dept) => (
              <div key={dept._id} className="department-item">
                <h4>{dept._id}</h4>
                <p>{dept.count} employees</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No department data available</p>
        )}

        <div className="quick-actions">
          <Link to="/employees/new" className="action-btn">
            ➕ Add New Employee
          </Link>
          <Link to="/employees" className="action-btn">
            📋 View All Employees
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;