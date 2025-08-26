// AuthContext.js
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (name) => setUser(name);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;


// Parent.js
// import AuthProvider from "./AuthContext";
// import Child from "./Child";

// const Parent = () => {
//   return (
//     <AuthProvider>
//       <Child />
//     </AuthProvider>
//   );
// };

// export default Parent;

// Child.js
// import { useAuth } from "./AuthContext";

// const Child = () => {
//   const { user, login, logout } = useAuth();

//   return (
//     <div>
//       <p>User: {user ? user : "No user logged in"}</p>
//       <button onClick={() => login("Manu")}>Login</button>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default Child;

