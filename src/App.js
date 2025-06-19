import './App.css';
import Page from './components/Page';
import About from './components/About';
import Recommend from './components/Recommend';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/about" element={<About />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
  );
}

export default App;
