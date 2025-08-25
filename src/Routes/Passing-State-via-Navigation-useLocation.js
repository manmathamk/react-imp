// App.js
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Phone", price: 30000 },
  { id: 3, name: "Headphones", price: 2000 },
];

function Products() {
  const navigate = useNavigate();

  const goToDetails = (product) => {
    // Pass product as state while navigating
    navigate("/details", { state: product });
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ₹{p.price}{" "}
            <button onClick={() => goToDetails(p)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Details() {
  const location = useLocation();
  const product = location.state;

  if (!product) return <h3>No product data passed</h3>;

  return (
    <div>
      <h2>Product Details</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
}

export default function PassStateviaNavigation() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}
