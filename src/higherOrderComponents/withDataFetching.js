// src/hoc/withDataFetching.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const withDataFetching = (WrappedComponent, endpoint) => {
  return (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(endpoint);
        setData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [endpoint]);

    return (
      <WrappedComponent
        {...props}
        data={data}
        loading={loading}
        error={error}
        refetch={fetchData}
      />
    );
  };
};

export default withDataFetching;


// src/pages/UserList.js
// import React from "react";
// import withDataFetching from "../hoc/withDataFetching";

// const UserList = ({ data, loading, error, refetch }) => {
//   if (loading) return <p>Loading users...</p>;
//   if (error) return (
//     <div>
//       <p style={{ color: "red" }}>{error}</p>
//       <button onClick={refetch}>Retry</button>
//     </div>
//   );

//   return (
//     <ul>
//       {data.map(({ id, name, email }) => (
//         <li key={id}>{name} ({email})</li>
//       ))}
//     </ul>
//   );
// };

// export default withDataFetching(UserList, "https://jsonplaceholder.typicode.com/users");
