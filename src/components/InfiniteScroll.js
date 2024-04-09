import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api?page=${page}`
        );
        const newData = response.data.nodes.map((node) => ({
          title: node.node.title,
          imageUrl: node.node.field_photo_image_section,
          path: node.node.path,
          date: moment.unix(node.node.last_update).format("LLLL"),
          id: node.node.nid,
        }));
        setArticles((prevArticles) => [...prevArticles, ...newData]);
        setHasMore(response.data.nodes.length > 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    if (hasMore) {
      fetchArticles();
    }
  }, [page, hasMore]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(articles);
  return (
    <div className="App">
      <h1>Infinite Scroll Example</h1>
      <div className="container article-list">
        {articles.map((article) => (
          <div key={article.id} className="article">
            <div>
              <img src={article.imageUrl} alt={article.title} />
            </div>
            <div className="article-details">
              <h2 style={{ fontFamily: "monospace", fontSize: "x-large" }}>
                {article.title}
              </h2>
              <h3 style={{ fontFamily: "monospace", fontSize: "large" }}>
                {article.date}
              </h3>
              <a href={article.path}>Read More</a>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
