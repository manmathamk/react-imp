import React from "react";

const withRoleCheck = (WrappedComponent, allowedRoles = []) => {
    return (props) => {
        const useRole = localStorage.getItem("role")

        if (allowedRoles.includes(useRole)) {
            return <WrappedComponent {...props} />
        }

        return <h2>Access Denied</h2>
    }
}


export default withRoleCheck


// App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import withRoleCheck from "./withRoleCheck";
// import AdminPanel from "./AdminPanel";
// import Dashboard from "./Dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* Only admins can see this */}
//         <Route path="/admin" element={withRoleCheck(AdminPanel, ["admin"])()} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
