import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate()

        const isAuthenticated = localStorage.getItem("token")

        useEffect(() => {
            if (!isAuthenticated) {
                navigate("login")
            }
        }, [isAuthenticated, navigate])

        return isAuthenticated ? <WrappedComponent {...props} /> : null
    }
}

export default withAuth

// App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import withAuth from "./withAuth";
// import Dashboard from "./Dashboard";
// import Login from "./Login";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={withAuth(Dashboard)()} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
