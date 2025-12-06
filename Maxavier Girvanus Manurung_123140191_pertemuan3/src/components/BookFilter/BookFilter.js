import React from 'react';

const BookFilter = ({ filter, setFilter, search, setSearch }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      
      <select 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: '5px' }}
      >
        <option value="all">Semua Status</option>
        <option value="milik">Dimiliki</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
    </div>
  );
};

export default BookFilter;