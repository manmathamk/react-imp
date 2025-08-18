import React from "react";

const withLoader = (WrappedComponent, LoaderUI = null) => {
    return function LoaderWrapper(props) {
        const { data, loading } = props

        if (loading) {
            return (
                LoaderUI || (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <div className="spinner" />
                        <p>Loading...</p>
                        <style>
                            {`
                .spinner {
                  border: 4px solid #f3f3f3;
                  border-top: 4px solid #3498db;
                  border-radius: 50%;
                  width: 30px;
                  height: 30px;
                  animation: spin 1s linear infinite;
                  margin: 0 auto 10px;
                }
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
                        </style>
                    </div>
                )
            )
        }

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return <p style={{ textAlign: "center" }}>No data available</p>;
        }
        return <WrappedComponent {...props} />
    }
}

export default withLoader


// App.js
// import React, { useEffect, useState } from "react";
// import withLoader from "./withLoader";
// import UserList from "./UserList";

// const UserListWithLoader = withLoader(UserList);

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     setTimeout(() => {
//       setUsers([
//         { id: 1, name: "Alice" },
//         { id: 2, name: "Bob" },
//       ]);
//       setLoading(false);
//     }, 2000); // fake API delay
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>
//       <UserListWithLoader data={users} loading={loading} />
//     </div>
//   );
// }

// export default App;
