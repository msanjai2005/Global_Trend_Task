# Task Manager (MERN Stack)

A full-stack task management application built using the **MERN stack** with authentication, CRUD operations, and a responsive dashboard UI.

This project demonstrates real-world full-stack development practices including secure authentication, REST APIs, protected routes, and responsive design.

---

## 🚀 Features

- User authentication (Register / Login / Logout)
- JWT-based protected routes
- Create, update, delete tasks
- Mark tasks as **Pending** or **Completed**
- Task statistics (Total & Completed)
- Responsive dashboard (mobile + desktop)
- Secure environment variable handling
- Clean and maintainable React architecture

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Context API
- Axios
- CSS (Responsive, Dashboard-style UI)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---
client/
├── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── services/
│ ├── styles/
│ └── App.js

server/
├── controllers/
├── models/
├── routes/
├── middleware/
└── server.js


---

## ⚙️ Environment Variables

Create a `.env` file in the **server** directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


> ⚠️ Never commit `.env` files to GitHub.

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

2️⃣ Backend Setup
cd server
npm install
npm run dev


Server will start at:
http://localhost:5000

3️⃣ Frontend Setup
cd client
npm install
npm start


Client will start at:
http://localhost:3000

🔐 API Endpoints (Sample)
Auth

POST /auth/register

POST /auth/login

Tasks

GET /task/tasks

POST /task/tasks

PUT /task/tasks/:id

DELETE /task/tasks/:id

(All task routes are protected)
## 📁 Project Structure

