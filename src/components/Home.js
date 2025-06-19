import './home.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Home(){
    const [handle, setHandle] = useState('');
    const navigate = useNavigate();
    const getRecommendations = () => {
        if (!handle.trim()) return;
        navigate(`/recommend?handle=${handle}`);
    };
    return(
        <div className="home">
            <div className="container">
                <h1 className='ht'>Welcome to Codeforces Problem Recommender</h1>
                <p class="tagline">Smarter practice. Faster growth. Smarter contests.</p>

                <div class="form-area">
                <input type="text" placeholder="Enter your Codeforces handle" value={handle}
                onChange={(e) => setHandle(e.target.value)}/>
                <button onClick={getRecommendations} class="recommend-button">Get Problems</button>
                </div>

                
            </div>
            <div className='container1'>
                <div className='info'>
                    <h2>🚀 How It Works</h2>
                    <p>
                        This smart recommender analyzes your Codeforces submissions and identifies key areas where you can improve.
                        It uses machine learning and your personal performance data to suggest a curated set of 10 problems at a time — carefully balanced to target your weak spots, optimize learning, and boost rating gains.

                        If any recommended problem remains unsolved, it will reappear in future sessions until you crack it — ensuring focused, efficient, and consistent practice.
                    </p>
                </div>
            </div>
            <div className='container2'>
                <div class="info-section">

                <h2>🎯 Why Use This Tool?</h2>
                <ul>
                    <li>🔍 Pinpoints your weak areas using tag-wise analysis</li>
                    <li>⚖️ Balances easy, medium, and challenging problems</li>
                    <li>📈 Designed to improve performance in rated contests</li>
                    <li>🧠 Helps avoid repeating mistakes by tracking wrong submissions</li>
                    <li>🛠️ Future support for tracking, login, and skill graphs</li>
                </ul>

                </div>
            </div>
            <div className='container3'>
                <div class="cta">
                    <h3>Practice with precision. Train like a pro. 🚀</h3>
                </div>
            </div>
        </div>
    )
}
export default Home;