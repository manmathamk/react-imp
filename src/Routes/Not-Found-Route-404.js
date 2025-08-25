// App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>Home Page</h2>;
}
function About() {
  return <h2>About Page</h2>;
}
function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Catch-all route (must be last) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
