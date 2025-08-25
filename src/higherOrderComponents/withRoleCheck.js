// src/hoc/withRoleCheck.js
import React from "react";

const withRoleCheck = (WrappedComponent, allowedRoles = []) => {
  return function RoleCheckWrapper(props) {
    const userRole = localStorage.getItem("role");

    if (allowedRoles.includes(userRole)) {
      return <WrappedComponent {...props} />;
    }

    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <h2>🚫 Access Denied</h2>
        <p>You don’t have permission to view this page.</p>
      </div>
    );
  };
};

export default withRoleCheck;

// ------------------------------------------------------------------------------------------

// src/pages/AdminPage.js
// import React from "react";
// import withRoleCheck from "../hoc/withRoleCheck";

// const AdminPage = () => {
//   return (
//     <div>
//       <h1>Welcome, Admin 🎉</h1>
//       <p>You have full access to this page.</p>
//     </div>
//   );
// };

// // Only "admin" role can see this
// export default withRoleCheck(AdminPage, ["admin"]);


// ---------------------------------------------------------------------------

// src/App.js
// import React from "react";
// import AdminPage from "./pages/AdminPage";

// function App() {
//   const setRole = (role) => {
//     localStorage.setItem("role", role);
//     window.location.reload();
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Role-Based Access Example</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={() => setRole("admin")}>Set Role: Admin</button>
//         <button onClick={() => setRole("user")}>Set Role: User</button>
//         <button onClick={() => setRole("guest")}>Set Role: Guest</button>
//       </div>

//       <AdminPage />
//     </div>
//   );
// }

// export default App;
