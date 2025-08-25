// App.js
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <nav style={{ marginRight: "20px" }}>
        <ul>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>

      {/* Nested routes will render here */}
      <div style={{ border: "1px solid gray", padding: "10px" }}>
        <Outlet />
      </div>
    </div>
  );
}

function Dashboard() {
  return <h2>Welcome to Dashboard</h2>;
}
function Profile() {
  return <h3>Profile Page</h3>;
}
function Settings() {
  return <h3>Settings Page</h3>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Default child route */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
