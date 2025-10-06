// src/components/Employees/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { employeeAPI } from '../../services/api';
import './Employee.css';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'IT',
    position: '',
    salary: '',
    dateOfJoining: '',
    status: 'Active',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await employeeAPI.getById(id);
      const employee = response.data;
      setFormData({
        ...employee,
        dateOfJoining: employee.dateOfJoining.split('T')[0]
      });
    } catch (error) {
      console.error('Error fetching employee:', error);
      setError('Failed to load employee data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        await employeeAPI.update(id, formData);
      } else {
        await employeeAPI.create(formData);
      }
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-form-container">
      <div className="employee-form-card">
        <h1>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="10-digit phone number"
                pattern="[0-9]{10}"
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="Enter position"
              />
            </div>

            <div className="form-group">
              <label>Salary *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                placeholder="Enter salary"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Date of Joining *</label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Enter street address"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                placeholder="Enter zip code"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Employee' : 'Add Employee'}
            </button>
            <Link to="/employees" className="btn-cancel">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;