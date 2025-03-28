import React, { useState, useEffect } from "react";
import { getAuthToken } from "../authService";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = await getAuthToken();
        if (!token) throw new Error("No authentication token");

        const [userResponse, postResponse] = await Promise.all([
          fetch("http://20.244.56.144/test/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://20.244.56.144/test/posts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!userResponse.ok || !postResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const userData = await userResponse.json();
        const postData = await postResponse.json();

        const users = userData.users || {};
        const posts = (postData.posts || []).map((post) => ({
          ...post,
          username: users[post.userid] || "Unknown",
        }));

        setPosts(posts.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.warn("Error fetching feed:", error.message);
        setPosts(mockPosts); // Fallback to mock data
      }
    };

    fetchFeed();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📰 Latest Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <p style={styles.postContent}>{post.content}</p>
            <span style={styles.postAuthor}>
              By: {post.username || "Unknown"}
            </span>
          </div>
        ))
      ) : (
        <p style={styles.noPosts}>No posts available.</p>
      )}
    </div>
  );
}

// Mock data for fallback
const mockPosts = [
  { id: 1, content: "Hello world!", userid: "1", username: "Alice" },
  { id: 2, content: "React is awesome!", userid: "2", username: "Bob" },
  {
    id: 3,
    content: "Mock data for the win!",
    userid: "3",
    username: "Charlie",
  },
];

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  postCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "15px",
    textAlign: "left",
  },
  postContent: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "8px",
  },
  postAuthor: {
    fontSize: "14px",
    color: "#007bff",
    fontWeight: "bold",
  },
  noPosts: {
    fontSize: "16px",
    color: "#777",
  },
};

export default Feed;
