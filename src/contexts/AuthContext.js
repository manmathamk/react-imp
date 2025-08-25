// AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;


// --------------------------------------

// App.js
// import React from "react";
// import AuthProvider, { useAuth } from "./AuthContext";

// const Profile = () => {
//   const { user, login, logout } = useAuth();

//   return (
//     <div>
//       {user ? (
//         <>
//           <h2>Welcome, {user.name} 👋</h2>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <button onClick={() => login({ name: "Manu", email: "manu@test.com" })}>
//           Login
//         </button>
//       )}
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <h1>Auth Context Example</h1>
//       <Profile />
//     </AuthProvider>
//   );
// };

// export default App;


// --------------------------------------------------------------------