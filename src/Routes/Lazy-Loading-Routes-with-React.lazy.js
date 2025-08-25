// App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Lazy imports
const Home = lazy(() => import("../components/Home"));
const About = lazy(() => import("../components/About"));
const Contact = lazy(() => import("../components/Company"));

export default function LazyLoading() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Suspense shows fallback until component loads */}
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
