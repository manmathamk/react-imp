// App.js
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const page = searchParams.get("page") || 1;

  const updateQuery = () => {
    setSearchParams({ category: "electronics", page: "3" });
  };

  return (
    <div>
      <h2>Products Page</h2>
      <p>Category: {category}</p>
      <p>Page: {page}</p>

      <button onClick={updateQuery}>Show Electronics - Page 3</button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/products?category=books&page=2">Books Page 2</Link>
      </nav>

      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}
