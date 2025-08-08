import React, { useEffect, useState } from "react";

export default function PostList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Network Error");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Failed to load posts</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
