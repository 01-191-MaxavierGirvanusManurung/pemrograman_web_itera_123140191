from abc import ABC, abstractmethod

# 1. ABSTRACTION
# Membuat abstract class LibraryItem sebagai blueprint
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        # 2. ENCAPSULATION
        # Menggunakan protected attributes (_) agar tidak diakses sembarangan dari luar
        self._item_id = item_id
        self._title = title
        self._is_available = True

    # 3. PROPERTY DECORATOR
    # Getter untuk mengakses attribute protected _title
    @property
    def title(self):
        return self._title
    
    # Getter untuk item_id
    @property
    def item_id(self):
        return self._item_id

    # Abstract method yang WAJIB diimplementasikan oleh subclass
    @abstractmethod
    def get_details(self):
        pass

# 4. INHERITANCE
# Class Book mewarisi LibraryItem
class Book(LibraryItem):
    def __init__(self, item_id, title, author, isbn):
        super().__init__(item_id, title)
        self._author = author
        self._isbn = isbn

    # 5. POLYMORPHISM
    # Implementasi method abstract dengan perilaku khusus untuk Buku
    def get_details(self):
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"[Buku] ID: {self._item_id} | Judul: {self._title} | Penulis: {self._author} | Status: {status}"

# Class Magazine mewarisi LibraryItem
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number, publisher):
        super().__init__(item_id, title)
        self._issue_number = issue_number
        self._publisher = publisher

    # Implementasi method abstract dengan perilaku khusus untuk Majalah
    def get_details(self):
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"[Majalah] ID: {self._item_id} | Judul: {self._title} | Edisi: {self._issue_number} | Status: {status}"

# Class Library untuk mengelola koleksi
class Library:
    def __init__(self):
        # ENCAPSULATION: Private attribute (__)
        # Hanya bisa diakses dari dalam class Library
        self.__items = []

    def add_item(self, item: LibraryItem):
        self.__items.append(item)
        print(f"Berhasil menambahkan: {item.title}")

    def display_items(self):
        print("\n--- Daftar Koleksi Perpustakaan ---")
        if not self.__items:
            print("Perpustakaan kosong.")
        else:
            for item in self.__items:
                # POLYMORPHISM: Memanggil get_details() tanpa perlu tahu tipe objeknya (Buku/Majalah)
                print(item.get_details())
        print("-" * 35)

    def search_item(self, keyword):
        print(f"\nMencari dengan kata kunci: '{keyword}'...")
        found_items = []
        
        keyword_str = str(keyword) 

        for item in self.__items:
            # Bandingkan menggunakan keyword yang sudah di-string-kan
            if keyword_str.lower() in item.title.lower() or str(item.item_id) == keyword_str:
                found_items.append(item)
        
        if found_items:
            for item in found_items:
                print(f"Ditemukan: {item.get_details()}")
        else:
            print("Item tidak ditemukan.")


if __name__ == "__main__":
    # Membuat objek Perpustakaan
    my_library = Library()

    # Membuat objek Buku dan Majalah
    buku1 = Book(101, "Belajar Python OOP", "Guido van Rossum", "123-456-789")
    buku2 = Book(102, "Harry Potter", "J.K. Rowling", "987-654-321")
    majalah1 = Magazine(201, "Tech Asia", "Nov 2023", "Tech Media")

    # Menambahkan item ke perpustakaan
    my_library.add_item(buku1)
    my_library.add_item(buku2)
    my_library.add_item(majalah1)

    # Menampilkan semua item
    my_library.display_items()

    # Mencari item berdasarkan Judul
    my_library.search_item("Python")

    # Mencari item berdasarkan ID
    my_library.search_item(201)

    # Mencari item yang tidak ada
    my_library.search_item("Masakan")
