import React from "react";
// import withDataFetching from "./withDataFetching";
import PostList from "./PostList";
import withDataFetching from "../higherOrderComponents/withDataFetching";

const PostListWithData = withDataFetching(
    PostList,
    "https://jsonplaceholder.typicode.com/posts"
);

function HigherOrder() {
    return (
        <div>
            <h1>Posts</h1>
            <PostListWithData />
        </div>
    );
}

export default HigherOrder;
