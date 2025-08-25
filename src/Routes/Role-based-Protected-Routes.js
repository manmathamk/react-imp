// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

function Login({ setRole }) {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => setRole("admin")}>Login as Admin</button>
      <button onClick={() => setRole("user")}>Login as User</button>
    </div>
  );
}

function AdminPage() {
  return <h2>Welcome, Admin 👑</h2>;
}

function UserPage() {
  return <h2>Welcome, User 🙌</h2>;
}

// Role-based guard
function RoleProtectedRoute({ role, allowedRole, children }) {
  return role === allowedRole ? children : <Navigate to="/login" replace />;
}

export default function RolebasedRoutes() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute role={role} allowedRole="admin">
              <AdminPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <RoleProtectedRoute role={role} allowedRole="user">
              <UserPage />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
