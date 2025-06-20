import './recommend.css';
import Navbar from './Navbar';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

function Recommend() {
  const [searchParams] = useSearchParams();
  const handle = searchParams.get("handle");

  const [recommendations, setRecommendations] = useState({});
  const [tagsList, setTagsList] = useState(['all']);  // ⚠️ Default 'all'
  const [selectedTag, setSelectedTag] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (handle) {
      setLoading(true);
      axios
        .post('http://localhost:5000/recommend', { handle })
        .then((res) => {
          setRecommendations(res.data);
          setTagsList(Object.keys(res.data)); 
          const tags = Object.keys(res.data).filter(tag => tag !== 'all').sort();
          setTagsList(['all', ...tags]);
          setSelectedTag('all');              
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching recommendations:', err);
          setLoading(false);
        });
    }
  }, [handle]);

  const filteredProblems = recommendations[selectedTag] || [];

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
                onClick={() => setSelectedTag(tag)}
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
