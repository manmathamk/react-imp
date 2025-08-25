// App.js
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
      <h1>Public Site 🌍</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <hr />
      <Outlet /> {/* Public pages render here */}
    </div>
  );
}

function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "150px", borderRight: "1px solid gray" }}>
        <ul>
          <li><Link to="/dashboard">Main</Link></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
        </ul>
      </aside>
      <main style={{ padding: "10px" }}>
        <h1>Dashboard Area 📊</h1>
        <Outlet /> {/* Dashboard pages render here */}
      </main>
    </div>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}
function About() {
  return <h2>About Page</h2>;
}
function DashboardMain() {
  return <h2>Dashboard Main</h2>;
}
function DashboardSettings() {
  return <h2>Dashboard Settings</h2>;
}

export default function MultipleLayuts() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardMain />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
