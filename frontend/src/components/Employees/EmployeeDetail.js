// src/components/Employees/EmployeeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { employeeAPI } from '../../services/api';
import './Employee.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await employeeAPI.getById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        navigate('/employees');
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return <div className="loading">Loading employee details...</div>;
  }

  if (!employee) {
    return (
      <div className="employee-detail-container">
        <div className="no-data">Employee not found</div>
      </div>
    );
  }

  return (
    <div className="employee-detail-container">
      <Link to="/employees" className="btn-back">
        ← Back to Employee List
      </Link>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <h1>{`${employee.firstName} ${employee.lastName}`}</h1>
            <p className="subtitle">{employee.position} - {employee.department}</p>
          </div>
          <div className="detail-actions">
            <Link to={`/employees/edit/${employee._id}`} className="btn-edit">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>Email</label>
            <div className="value">{employee.email}</div>
          </div>

          <div className="detail-item">
            <label>Phone</label>
            <div className="value">{employee.phone}</div>
          </div>

          <div className="detail-item">
            <label>Department</label>
            <div className="value">{employee.department}</div>
          </div>

          <div className="detail-item">
            <label>Position</label>
            <div className="value">{employee.position}</div>
          </div>

          <div className="detail-item">
            <label>Salary</label>
            <div className="value">{formatCurrency(employee.salary)}</div>
          </div>

          <div className="detail-item">
            <label>Date of Joining</label>
            <div className="value">{formatDate(employee.dateOfJoining)}</div>
          </div>

          <div className="detail-item">
            <label>Status</label>
            <div className="value">
              <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                {employee.status}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <label>Created By</label>
            <div className="value">
              {employee.createdBy?.username || 'N/A'} ({employee.createdBy?.email || 'N/A'})
            </div>
          </div>

          {employee.address && (employee.address.street || employee.address.city) && (
            <div className="detail-item full-width">
              <label>Address</label>
              <div className="value">
                {employee.address.street && <div>{employee.address.street}</div>}
                {(employee.address.city || employee.address.state || employee.address.zipCode) && (
                  <div>
                    {employee.address.city && `${employee.address.city}, `}
                    {employee.address.state && `${employee.address.state} `}
                    {employee.address.zipCode}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="detail-item">
            <label>Created At</label>
            <div className="value">{formatDate(employee.createdAt)}</div>
          </div>

          <div className="detail-item">
            <label>Last Updated</label>
            <div className="value">{formatDate(employee.updatedAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;