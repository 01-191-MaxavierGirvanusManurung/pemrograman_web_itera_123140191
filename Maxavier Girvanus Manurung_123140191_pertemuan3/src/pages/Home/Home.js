import React, { useState } from 'react';
import { useBookContext } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';

const Home = () => {
  const { books, addBook, updateBook, deleteBook } = useBookContext();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  // Logika Filter dan Search
  const filteredBooks = books.filter((book) => {
    const matchesStatus = filter === 'all' ? true : book.status === filter;
    const matchesSearch = 
      book.title.toLowerCase().includes(search.toLowerCase()) || 
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateOrUpdate = (formData) => {
    if (editingBook) {
      updateBook(editingBook.id, formData);
      setEditingBook(null);
    } else {
      addBook(formData);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manajemen Buku</h2>
      
      <BookForm 
        onSubmit={handleCreateOrUpdate} 
        initialData={editingBook}
        onCancel={editingBook ? () => setEditingBook(null) : null}
      />
      
      <BookFilter 
        filter={filter} 
        setFilter={setFilter} 
        search={search} 
        setSearch={setSearch} 
      />

      <BookList 
        books={filteredBooks} 
        onEdit={setEditingBook} 
        onDelete={deleteBook} 
      />
    </div>
  );
};

export default Home;