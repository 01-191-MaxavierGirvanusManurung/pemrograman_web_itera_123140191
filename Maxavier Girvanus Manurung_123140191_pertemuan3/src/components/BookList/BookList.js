import React from 'react';

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return <p>Tidak ada buku yang ditemukan.</p>;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'milik': return '#e3f2fd'; // Biru muda
      case 'baca': return '#fff3e0';  // Oranye muda
      case 'beli': return '#fce4ec';  // Pink muda
      default: return '#fff';
    }
  };

  return (
    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
      {books.map((book) => (
        <div key={book.id} style={{ 
          border: '1px solid #ccc', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: getStatusColor(book.status)
        }}>
          <h4 style={{ margin: '0 0 5px 0' }}>{book.title}</h4>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: '#666' }}>{book.author}</p>
          <span style={{ 
            display: 'inline-block', 
            padding: '2px 8px', 
            borderRadius: '10px', 
            fontSize: '0.8em', 
            border: '1px solid #999',
            marginBottom: '10px'
          }}>
            {book.status.toUpperCase()}
          </span>
          
          <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book.id)} style={{ color: 'red' }}>Hapus</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;