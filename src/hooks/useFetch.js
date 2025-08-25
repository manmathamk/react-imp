// src/hooks/useFetch.js
import { useEffect, useRef, useState } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchOnceRef = useRef(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchOnceRef.current) {
      fetchData();
      fetchOnceRef.current = true; // ensures one-time fetch
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;

// -----------------------------------------------------------------------------------

// src/components/UserList.js
// import React from "react";
// import useFetch from "../hooks/useFetch";

// const UserList = () => {
//   const { data, loading, error, refetch } = useFetch(
//     "https://jsonplaceholder.typicode.com/users"
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

//   return (
//     <div>
//       <h2>User List</h2>
//       <button onClick={refetch}>🔄 Refresh</button>
//       <ul>
//         {data?.map((user) => (
//           <li key={user.id}>
//             {user.name} ({user.email})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

// -------------------------------------------------------------------------------

// import React from "react";
// import UserList from "./components/UserList";

// function App() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>useFetch Hook Example</h1>
//       <UserList />
//     </div>
//   );
// }

// export default App;
