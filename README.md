# Simple Order Management System (MERN)

This is a simple order management system built using the MERN (MongoDB, Express, React, Node.js) stack. It provides user authentication, order management, and a clean frontend for managing orders efficiently.

## 🚀 Features

- User authentication (JWT-based token authentication)
- Order management with CRUD operations
- REST API with Express.js
- MongoDB as the database
- React frontend for order handling
- Robust state management with Redux
- Form validation and error handling
- Pagination for orders
- Test cases for both frontend and backend

## 📦 Tech Stack

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Testing:** Jest, React Testing Library

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yadu247/order-management-system.git
cd order-management-system
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the `backend` directory and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4️⃣ Run the Project

#### Start Backend

```bash
cd server
npm run dev
```

#### Start Frontend

```bash
cd client
npm run dev
```

## 📌 API Documentation

### User Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Order Routes

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

## 🤖 AI Usage

AI was used in the project for:

- Debugging token storage and Redux state issues.
- Generating test cases for authentication and order management.
- Writing structured documentation.

## 👤 Author

Developed by **Yadu Krishnan**

---
