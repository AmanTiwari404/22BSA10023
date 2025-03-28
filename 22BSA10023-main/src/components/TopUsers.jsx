import React, { useState, useEffect } from "react";
import { getAuthToken } from "../authService";

function TopUsers() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
       
        const token = await getAuthToken();
        if (!token) throw new Error("Failed to obtain token");

        
        const response = await fetch("http://20.244.56.144/test/top-users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch top users");

        const data = await response.json();
        setTopUsers(data.users || []);
      } catch (error) {
        console.warn("Error fetching top users:", error.message);
        setTopUsers(mockTopUsers);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏆 Top Users</h2>
      {topUsers.length > 0 ? (
        <ul style={styles.userList}>
          {topUsers.map((user, index) => (
            <li key={user.id} style={styles.userItem}>
              <span style={styles.rank}>{index + 1}.</span>
              <span style={styles.userName}>{user.name}</span>
              <span style={styles.postCount}>📌 {user.postCount} Posts</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noUsers}>No top users available.</p>
      )}
    </div>
  );
}


const mockTopUsers = [
  { id: 1, name: "Alice", postCount: 120 },
  { id: 2, name: "Bob", postCount: 100 },
  { id: 3, name: "Charlie", postCount: 85 },
  { id: 4, name: "David", postCount: 75 },
  { id: 5, name: "Eve", postCount: 65 },
];

const styles = {
  container: {
    width: "100%",
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
  userList: {
    listStyleType: "none",
    padding: 0,
  },
  userItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  rank: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#ff9800",
    marginRight: "10px",
  },
  userName: {
    fontSize: "16px",
    color: "#333",
    flexGrow: 1,
    textAlign: "left",
  },
  postCount: {
    fontSize: "14px",
    color: "#007bff",
    fontWeight: "bold",
  },
  noUsers: {
    fontSize: "16px",
    color: "#777",
  },
};

export default TopUsers;
