# 5610 Final Project

This project is a full-stack web application that integrates a React-based frontend with a Node.js/Express backend. The backend leverages MongoDB for data persistence, providing a robust solution for user management and status updates.

---

## Features

### Frontend
- Built with React and `vite` for efficient development.
- Includes reusable components like `NavBar`, `LoginPage`, `SignUpPage`, and more.
- Styled with modular CSS for better maintainability.
- Communicates with the backend using RESTful API calls.

### Backend
- Powered by Node.js and Express for API handling.
- MongoDB database with Mongoose for schema modeling.
- Secure authentication using `bcrypt` for hashing passwords and `jsonwebtoken` for token-based sessions.
- Implements structured routing for users and statuses.

---

## Requirements

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB database with access credentials.

### Environment Variables
Ensure you have `.env` files for both backend and frontend configurations:

#### Backend `.env`
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority JWT_SECRET=your_secret_key PORT=3000
```

#### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:3000
```

---

## Local Development

### 1. Clone the Repository
```
git clone <repository-url>
cd Qiyuan-Zhu-Liangyou-Xu-project3-main
```

### 2. Install Dependencies

Install the necessary dependencies for both the backend and frontend.

#### Backend:
Navigate to the `backend` directory and run:
```bash
cd backend
npm install
```
#### Frontend:
Navigate to the `frontend` directory and run:
```bash
cd frontend
npm install
```

### 3. Run the Application
`Run the backend server`
```
npm start
```

`Run the frontend server`
```
npm run dev
```

### 4. Folder Structure
```
Qiyuan-Zhu-Liangyou-Xu-project3-main/
├── backend/
│   ├── models/            # Mongoose schemas for User and Status
│   ├── routes/            # API routes
│   ├── db.js              # Database connection setup
│   ├── server.js          # Main server file
├── frontend/
│   ├── src/
│   │   ├── component/     # React components
│   │   ├── pages/         # React pages
│   │   ├── styling/       # CSS/Styling files
│   ├── public/            # Static files
│   ├── .env               # Frontend environment variables
├── .env                   # Backend environment variables
├── package.json           # Project dependencies
```
