import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

function App() {
  return (
    <BookProvider>
      <Router>
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
          <nav style={{ padding: '15px', background: '#333', color: 'white', display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>MyBooks</Link>
            <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</Link>
            <Link to="/stats" style={{ color: '#ccc', textDecoration: 'none' }}>Statistik</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;