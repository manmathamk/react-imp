// App.js
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const users = [
  { id: 1, name: "Manu" },
  { id: 2, name: "Arjun" },
  { id: 3, name: "Sneha" },
];

function Users() {
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetails() {
  const { id } = useParams();
  const user = users.find(u => u.id === Number(id));

  if (!user) return <h3>User not found</h3>;

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  );
}

export default function DynamicRouting() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}
