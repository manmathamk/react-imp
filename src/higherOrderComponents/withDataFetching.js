// src/hoc/withDataFetching.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const withDataFetching = (WrappedComponent, endpoint) => {
  return function DataFetchingWrapper(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      let isMounted = true;

      fetchData();

      return () => {
        isMounted = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint]);

    return (
      <WrappedComponent
        {...props}
        data={data}
        error={error}
        loading={loading}
        refetch={fetchData} // ✅ extra option for retry
      />
    );
  };
};

export default withDataFetching;



// ------------------------------------------------------------------------

// src/pages/UserList.js
// import React from "react";
// import withDataFetching from "../hoc/withDataFetching";

// const UserList = ({ data, loading, error, refetch }) => {
//   if (loading) return <p>Loading users...</p>;
//   if (error)
//     return (
//       <div>
//         <p style={{ color: "red" }}>{error}</p>
//         <button onClick={refetch}>Retry</button>
//       </div>
//     );

//   return (
//     <ul>
//       {data.map((user) => (
//         <li key={user.id}>
//           {user.name} ({user.email})
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default withDataFetching(UserList, "https://jsonplaceholder.typicode.com/users");

