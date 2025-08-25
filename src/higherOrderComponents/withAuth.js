// src/hoc/withAuth.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Higher Order Component for authentication
const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem("token");

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login"); // ✅ use absolute path
      }
    }, [isAuthenticated, navigate]);

    // Render component only if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;

// ----------------------------------------------------------------
// src/pages/Dashboard.js
// import React from "react";
// import withAuth from "../hoc/withAuth";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Welcome to Dashboard 🎉</h1>
//       <p>Only authenticated users can see this.</p>
//     </div>
//   );
// };

// export default withAuth(Dashboard);


// ----------------------------------------------------

// src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";

// const LoginPage = () => {
//   const handleLogin = () => {
//     localStorage.setItem("token", "dummy_token"); // Fake token for demo
//     window.location.href = "/dashboard"; // redirect
//   };

//   return (
//     <div>
//       <h2>Login Page</h2>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
