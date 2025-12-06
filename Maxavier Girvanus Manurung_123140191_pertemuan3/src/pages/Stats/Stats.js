import React from 'react';
import { useBookContext } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { Link } from 'react-router-dom';

const Stats = () => {
  const { books } = useBookContext();
  const { total, owned, reading, wishlist } = useBookStats(books);

  const cardStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    width: '150px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Statistik Perpustakaan</h2>
      <Link to="/" style={{ marginBottom: '20px', display: 'block' }}>&larr; Kembali ke Home</Link>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{...cardStyle, background: '#f0f0f0'}}>
          <h3>{total}</h3>
          <p>Total Buku</p>
        </div>
        <div style={{...cardStyle, background: '#e3f2fd'}}>
          <h3>{owned}</h3>
          <p>Dimiliki</p>
        </div>
        <div style={{...cardStyle, background: '#fff3e0'}}>
          <h3>{reading}</h3>
          <p>Sedang Dibaca</p>
        </div>
        <div style={{...cardStyle, background: '#fce4ec'}}>
          <h3>{wishlist}</h3>
          <p>Ingin Dibeli</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;