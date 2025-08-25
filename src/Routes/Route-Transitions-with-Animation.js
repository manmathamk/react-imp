// App.js
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  return <PageWrapper><h2>Home Page 🏠</h2></PageWrapper>;
}

function About() {
  return <PageWrapper><h2>About Page 📖</h2></PageWrapper>;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <AnimatedRoutes />
    </Router>
  );
}
