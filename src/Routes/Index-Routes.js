// App.js
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

function BlogLayout() {
  return (
    <div>
      <h1>Blog</h1>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="">Home</Link>
        <Link to="posts">Posts</Link>
        <Link to="authors">Authors</Link>
      </nav>
      <hr />
      <Outlet /> {/* Nested content */}
    </div>
  );
}

function BlogHome() {
  return <h2>Welcome to the Blog Home 📖</h2>;
}
function Posts() {
  return <h2>All Blog Posts</h2>;
}
function Authors() {
  return <h2>Blog Authors</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogHome />} /> {/* default nested route */}
          <Route path="posts" element={<Posts />} />
          <Route path="authors" element={<Authors />} />
        </Route>
      </Routes>
    </Router>
  );
}
