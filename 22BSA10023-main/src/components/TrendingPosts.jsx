import React, { useState, useEffect } from "react";
import { getAuthToken } from "../authService";

function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const token = await getAuthToken();
        if (!token) throw new Error("No authentication token");

        const response = await fetch(
          "http://20.244.56.144/test/trending-posts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch trending posts");

        const data = await response.json();
        setTrendingPosts(data.posts || []);
      } catch (error) {
        console.warn("Error fetching trending posts:", error.message);
        setTrendingPosts(mockTrendingPosts);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🔥 Trending Posts</h2>
      {trendingPosts.length > 0 ? (
        trendingPosts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <p style={styles.postContent}>{post.content}</p>
            <span style={styles.commentCount}>
              💬 {post.commentCount} Comments
            </span>
          </div>
        ))
      ) : (
        <p style={styles.noPosts}>No trending posts available.</p>
      )}
    </div>
  );
}

// Mock data for fallback
const mockTrendingPosts = [
  { id: 1, content: "🚀 Excited about the new tech update!", commentCount: 12 },
  { id: 2, content: "AI is changing the world! 🤖", commentCount: 10 },
  {
    id: 3,
    content: "Just finished a 100-day coding challenge! 🎉",
    commentCount: 9,
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
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  postContent: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  commentCount: {
    fontSize: "14px",
    color: "#007bff",
    fontWeight: "bold",
  },
  noPosts: {
    fontSize: "16px",
    color: "#777",
  },
};

export default TrendingPosts;
