// src/components/Employees/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeAPI } from '../../services/api';
import './Employee.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll(filters);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  return (
    <div className="employee-list-container">
      <div className="employee-list-header">
        <h1>Employee Management</h1>
        <div className="header-actions">
          <Link to="/employees/new" className="btn-add">
            ➕ Add Employee
          </Link>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            name="search"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>Department</label>
          <select name="department" value={filters.department} onChange={handleFilterChange}>
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      <div className="employee-table">
        {employees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{`${employee.firstName} ${employee.lastName}`}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/employees/${employee._id}`} className="btn-view">
                        View
                      </Link>
                      <Link to={`/employees/edit/${employee._id}`} className="btn-edit">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <p>No employees found. Add your first employee to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;