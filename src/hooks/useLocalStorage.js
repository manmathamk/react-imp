// src/hooks/useLocalStorage.js
import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

// -----------------------------------------------------------------------------------

// src/components/ThemeToggle.js
// import React from "react";
// import useLocalStorage from "../hooks/useLocalStorage";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useLocalStorage("theme", "light");

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

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
//         Switch to {theme === "light" ? "Dark 🌙" : "Light ☀️"}
//       </button>
//     </div>
//   );
// };

// export default ThemeToggle;

// -------------------------------------------------------------------------------

// import React from "react";
// import ThemeToggle from "./components/ThemeToggle";

// function App() {
//   return (
//     <div>
//       <h1>useLocalStorage Hook Example</h1>
//       <ThemeToggle />
//     </div>
//   );
// }

// export default App;
