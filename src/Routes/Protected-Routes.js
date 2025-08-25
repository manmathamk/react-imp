// App.js
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

function Login({ setAuth }) {
  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => setAuth(true)}>Login</button>
    </div>
  );
}

function Profile({ setAuth }) {
  return (
    <div>
      <h2>Profile Page</h2>
      <button onClick={() => setAuth(false)}>Logout</button>
    </div>
  );
}

// ProtectedRoute wrapper
function ProtectedRoute({ auth, children }) {
  return auth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute auth={auth}>
              <Profile setAuth={setAuth} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
