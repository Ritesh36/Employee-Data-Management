# 👨‍💼 Employee Management System

A full-stack **Employee Management System** built with **React (frontend)** and **Node.js + Express (backend)**.  
It allows administrators to manage employee records efficiently — including login, registration, viewing, adding, and editing employee data.

---

## 🚀 Features

- 🔐 **User Authentication** (Register/Login)
- 👥 **Role-based Access** for admin and employees
- 📋 **Employee CRUD** (Create, Read, Update, Delete)
- 🧭 **Dashboard View** for managing employee data
- 🌐 **RESTful API** using Express.js
- 💾 **MongoDB** for data persistence

---

## 🧩 Tech Stack

**Frontend:**
- React.js  
- Context API  
- Axios  
- CSS / Tailwind  

**Backend:**
- Node.js  
- Express.js  
- MongoDB / Mongoose  
- JWT Authentication  
- dotenv  

## 📂 Project Structure

```text
employee-management-system/
│
├── backend/                          # Backend folder
│   ├── controllers/                  # Handles business logic
│   │   ├── authController.js         # Authentication logic (login/register)
│   │   └── employeeController.js     # Employee CRUD operations
│   │
│   ├── middleware/                   # Middleware for authentication, etc.
│   │   └── authMiddleware.js
│   │
│   ├── models/                       # Mongoose models (MongoDB schemas)
│   │   ├── User.js
│   │   └── Employee.js
│   │
│   ├── routes/                       # API routes
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   │
│   ├── .env                          # Environment variables
│   ├── package.json                  # Backend dependencies
│   └── server.js                     # Entry point for the Express server
│
└── frontend/                         # Frontend folder
    ├── public/
    │   └── index.html                # Main HTML file
    │
    ├── src/
    │   ├── components/               # Reusable UI components
    │   │   ├── Auth/                 # Login & Register components
    │   │   │   ├── Login.js
    │   │   │   ├── Register.js
    │   │   │   └── Auth.css
    │   │   │
    │   │   ├── Dashboard/            # Dashboard components
    │   │   │   ├── Dashboard.js
    │   │   │   └── Dashboard.css
    │   │   │
    │   │   ├── Employees/            # Employee management components
    │   │   │   ├── EmployeeList.js
    │   │   │   ├── EmployeeForm.js
    │   │   │   ├── EmployeeDetail.js
    │   │   │   └── Employee.css
    │   │   │
    │   │   └── Layout/               # Navigation bar and layout
    │   │       ├── Navbar.js
    │   │       └── Navbar.css
    │   │
    │   ├── context/                  # Context API for global state
    │   │   └── AuthContext.js
    │   │
    │   ├── services/                 # API service functions
    │   │   └── api.js
    │   │
    │   ├── App.js                    # Root component
    │   ├── App.css                   # Global styles
    │   └── index.js                  # React entry point
    │
    ├── .env                          # Frontend environment variables
    └── package.json                  # Frontend dependencies
```
## Output :-

<img width="1857" height="912" alt="Image" src="https://github.com/user-attachments/assets/b4b0e23d-0958-45d7-9b22-2be746caa519" />

<img width="1856" height="915" alt="Image" src="https://github.com/user-attachments/assets/748189e4-f567-4fd3-bb93-92952b4329fa" />

<img width="1855" height="910" alt="Image" src="https://github.com/user-attachments/assets/915b6fa4-e5af-4d37-834b-d97d0843bb80" />



