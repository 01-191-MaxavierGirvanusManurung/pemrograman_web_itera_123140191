import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Judul wajib diisi";
    if (!formData.author.trim()) tempErrors.author = "Penulis wajib diisi";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ title: '', author: '', status: 'milik' }); // Reset
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9' }} aria-label="book-form">
      <h3>{initialData ? 'Edit Buku' : 'Tambah Buku Baru'}</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Judul Buku"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.title && <small style={{ color: 'red' }}>{errors.title}</small>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Penulis"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.author && <small style={{ color: 'red' }}>{errors.author}</small>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="milik">Milik Sendiri</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <button type="submit" style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none' }}>
        Simpan
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px', padding: '8px 15px' }}>
          Batal
        </button>
      )}
    </form>
  );
};

export default BookForm;