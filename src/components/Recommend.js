import './recommend.css';
import Navbar from './Navbar';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

function Recommend() {
  const [searchParams] = useSearchParams();
  const handle = searchParams.get("handle");
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [loading, setLoading] = useState(true);

  const tagsList = [
    'All', 'Greedy', 'Dynamic Programming', 'Binary Search', 'Math', 'Graphs',
    'Strings', 'Trees', 'Brute Force', 'Sorting', 'Bitmasks', 'Number Theory',
    'Data Structures', 'Two Pointers', 'DSU', 'Constructive Algorithms',
    'Implementation', 'Combinatorics', 'Dfs and Similar', 'Shortest paths',
    'Devide and Conquer', 'Games'
  ];

  useEffect(() => {
    if (handle) {
      setLoading(true);
      axios
        .post('https://cf-recommender-backend-6.onrender.com/recommend', { handle })
        .then((res) => {
          const dataWithTags = res.data.map(p => ({
            ...p,
            tags: p.tags || []  // in case tags are missing
          }));
          setProblems(dataWithTags);
          setFilteredProblems(dataWithTags);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching recommendations:', err);
          setLoading(false);
        });
    }
  }, [handle]);

  const filterByTag = (tag) => {
    setSelectedTag(tag);
    if (tag === 'All') {
      setFilteredProblems(problems);
    } else {
      const filtered = problems.filter((prob) =>
        prob.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
      setFilteredProblems(filtered);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>🧠 Your Personalized Codeforces Recommendations</h1>
        <p className="tagline">Handpicked problems just for your skill level</p>

        {/* 🔖 Tag Filter Section */}
        <div className="topics-section">
          <h2>📚 Filter by Topics</h2>
          <div className="topic-tags">
            {tagsList.map((tag) => (
              <span
                key={tag}
                className={`tag ${selectedTag === tag ? 'active-tag' : ''}`}
                onClick={() => filterByTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 🧩 Problem List */}
        <div className="recommendations-list">
          {loading ? (
            <Spinner />
          ) : filteredProblems.length === 0 ? (
            <p className="no-results">No problems found for "{selectedTag}"</p>
          ) : (
            filteredProblems.map((prob, idx) => (
              <div key={idx} className="problem-card">
                <h2>{prob.name}</h2>
                <p><strong>Rating:</strong> {prob.rating}</p>
                <p><strong>Contest:</strong> {prob.contestId}{prob.index}</p>
                <p><strong>Probability:</strong> {(prob.adjusted_prob * 100).toFixed(1)}%</p>
                <a
                  href={`https://codeforces.com/problemset/problem/${prob.contestId}/${prob.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Problem
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
