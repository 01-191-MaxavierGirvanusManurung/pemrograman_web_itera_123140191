import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

describe('BookForm Component', () => {
  
  // Test 1: Rendering Form
  test('renders form inputs correctly', () => {
    render(<BookForm onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText(/Judul Buku/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Penulis/i)).toBeInTheDocument();
    expect(screen.getByText(/Simpan/i)).toBeInTheDocument();
  });

  // Test 2: Validasi Error (Input Kosong)
  test('shows error message when submitting empty form', () => {
    render(<BookForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByText(/Simpan/i));
    
    expect(screen.getByText(/Judul wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Penulis wajib diisi/i)).toBeInTheDocument();
  });

  // Test 3: Input State Update
  test('updates input values when typing', () => {
    render(<BookForm onSubmit={() => {}} />);
    const titleInput = screen.getByPlaceholderText(/Judul Buku/i);
    
    fireEvent.change(titleInput, { target: { value: 'Harry Potter' } });
    expect(titleInput.value).toBe('Harry Potter');
  });

  // Test 4: Submit Data yang Valid
  test('calls onSubmit with correct data when form is valid', () => {
    const mockSubmit = jest.fn();
    render(<BookForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Judul Buku/i), { target: { value: 'Bumi' } });
    fireEvent.change(screen.getByPlaceholderText(/Penulis/i), { target: { value: 'Tere Liye' } });
    fireEvent.click(screen.getByText(/Simpan/i));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Bumi',
      author: 'Tere Liye',
      status: 'milik'
    }));
  });

  // Test 5: Mode Edit (Initial Data)
  test('populates form with initial data in edit mode', () => {
    const initialData = { title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'baca' };
    render(<BookForm onSubmit={() => {}} initialData={initialData} />);
    
    expect(screen.getByDisplayValue('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Andrea Hirata')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sedang Dibaca')).toBeInTheDocument(); // Select option text
  });

});