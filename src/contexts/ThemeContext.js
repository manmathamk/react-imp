// src/contexts/ThemeContext.js
import React, { createContext, useState, useContext } from "react";

export const ThemeContext = createContext(); // ✅ Named export

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook (optional, for easier usage)
export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider; // ✅ Default export


// -----------------------------------------------------------------------------

// App.js
// import React from "react";
// import ThemeProvider, { useTheme } from "./contexts/ThemeContext";

// const ThemedComponent = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div
//       style={{
//         background: theme === "light" ? "#fff" : "#333",
//         color: theme === "light" ? "#000" : "#fff",
//         padding: "20px",
//         textAlign: "center",
//       }}
//     >
//       <h2>Current Theme: {theme}</h2>
//       <button onClick={toggleTheme}>
//         Switch to {theme === "light" ? "Dark" : "Light"} Theme
//       </button>
//     </div>
//   );
// };

// const App = () => (
//   <ThemeProvider>
//     <h1>Theme Context Example</h1>
//     <ThemedComponent />
//   </ThemeProvider>
// );

// export default App;
