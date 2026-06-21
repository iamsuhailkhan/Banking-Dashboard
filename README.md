# Banking Dashboard

A full-stack banking dashboard application built with **MongoDB, Express, React, and Node.js**. This project includes user authentication, role-based admin and user panels, transaction management, theming, and responsive UI.

## 🚀 Key Features
- Email/password signup and login with JWT authentication
- Role-based access control for users and admins
- User dashboard with personal transactions and expense chart
- Admin dashboard with all transactions, user management, and status controls
- Admin actions: mark transactions completed, delete transactions, delete users
- Responsive layout with dark/light theme support
- Backend API protected using middleware and admin-only routes

## 🧱 Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- Frontend: React, Vite, Redux Toolkit, React Router, SASS
- Charts: Chart.js via `react-chartjs-2`
- Styling: SASS + CSS variables for themes

## 📁 Project Structure
```
Banking-Dashboard/
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 Setup Instructions

### 1. Backend Setup
1. Open the `Backend` folder in a terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `.env` with:
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=yourJwtSecret
   ADMIN_SECRET=admin@1
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open the `Frontend` folder in a terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at the URL shown by Vite (usually `http://localhost:5173`).

## 🧑‍💼 Admin Usage
- Use the admin signup route or the signup page with the `Admin secret` value set to the same secret defined in `.env`.
- Default `ADMIN_SECRET` in the repository is `admin@1`.
- Admin users can access `/admin` and manage:
  - all transactions
  - transaction status (`Mark Completed`)
  - transaction deletion
  - user deletion

## 🔐 Authentication Flow
- Users sign up or log in through the frontend forms.
- The backend returns a JWT, stored in Redux and localStorage.
- Protected API requests send `Authorization: Bearer <token>`.

## ✅ Available Scripts

### Backend
- `npm start` - start the backend server

### Frontend
- `npm run dev` - start the local frontend dev server
- `npm run build` - build the frontend for production
- `npm run preview` - preview the production build

## 💡 Notes
- The backend uses `process.env.MONGO_URI` to connect to MongoDB.
- The frontend is configured with React Router for protected page routing.
- Admin-only backend routes are protected with `adminOnly` middleware.

---

Feel free to update the README with your project name, repository links, and any additional deployment instructions for GitHub.