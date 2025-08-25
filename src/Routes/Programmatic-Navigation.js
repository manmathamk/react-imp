// App.js
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Normally you'd validate user credentials here
    navigate("/dashboard"); // programmatic redirect
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function Dashboard() {
  return <h2>Dashboard Page</h2>;
}

export default function ProgramaticNavigation() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
