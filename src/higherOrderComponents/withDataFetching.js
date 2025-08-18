import React, { useEffect, useState } from "react";
import axios from "axios";

const withDataFetching = (wrappedComponent, endpoint) => {
    return function DataFetchingWrapper(props) {
        const [data, setData] = useState([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)

        useEffect(() => {
            let isMounted = true;

            setLoading(true)

            axios.get(endpoint)
                .then((res) => {
                    if (isMounted) {
                        setData(res.data)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    if (isMounted) {
                        setError(err.message || "Something went wrong")
                    }
                })

            return () => {
                isMounted = false
            }

        }, [endpoint])

        return <wrappedComponent {...props} data={data} error={error} loading={loading} />
    }
}

export default withDataFetching


// App.js
// import React from "react";
// import withDataFetching from "./withDataFetching";
// import PostList from "./PostList";

// const PostListWithData = withDataFetching(
//   PostList,
//   "https://jsonplaceholder.typicode.com/posts"
// );

// function App() {
//   return (
//     <div>
//       <h1>Posts</h1>
//       <PostListWithData />
//     </div>
//   );
// }

// export default App;
