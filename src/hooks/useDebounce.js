// src/hooks/useDebounce.js
import { useRef, useEffect } from "react";

const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);

  const debouncedFunc = (...args) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFunc;
};

export default useDebounce;

// ----------------------------------------------------------------------

// src/components/Search.js
// import React, { useState } from "react";
// import useDebounce from "../hooks/useDebounce";

// const Search = () => {
//   const [query, setQuery] = useState("");

//   // Debounced search function
//   const debouncedSearch = useDebounce((value) => {
//     console.log("API call with:", value);
//     // fake API call
//   }, 500);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     debouncedSearch(value);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🔍 Debounced Search</h2>
//       <input
//         type="text"
//         placeholder="Type to search..."
//         value={query}
//         onChange={handleChange}
//         style={{ padding: "8px", width: "200px" }}
//       />
//     </div>
//   );
// };

// export default Search;

// -----------------------------------------------------------------------------------

// import React from "react";
// import Search from "./components/Search";

// function App() {
//   return (
//     <div>
//       <h1>useDebounce Hook Example</h1>
//       <Search />
//     </div>
//   );
// }

// export default App;
