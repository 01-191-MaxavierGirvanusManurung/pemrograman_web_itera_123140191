import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('my-books', []);

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: Date.now().toString() }]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => (book.id === id ? { ...book, ...updatedBook } : book)));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};