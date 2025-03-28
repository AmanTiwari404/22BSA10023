import React, { useState, useEffect } from "react";
import TopUsers from "./components/TopUsers";
import Feed from "./components/Feed";
import TrendingPosts from "./components/TrendingPosts";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("feed");

  return (
    <div className="app">
      <nav className="navbar">
        <button
          onClick={() => setCurrentPage("feed")}
          className={currentPage === "feed" ? "active" : ""}
        >
          Feed
        </button>
        <button
          onClick={() => setCurrentPage("topUsers")}
          className={currentPage === "topUsers" ? "active" : ""}
        >
          Top Users
        </button>
        <button
          onClick={() => setCurrentPage("trendingPosts")}
          className={currentPage === "trendingPosts" ? "active" : ""}
        >
          Trending Posts
        </button>
      </nav>

      <div className="content">
        {currentPage === "feed" && <Feed />}
        {currentPage === "topUsers" && <TopUsers />}
        {currentPage === "trendingPosts" && <TrendingPosts />}
      </div>
    </div>
  );
}

export default App;
