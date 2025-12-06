import os

# ==========================================
# 1. DATA MAHASISWA (Minimal 5 Data Awal)
# ==========================================
data_mahasiswa = [
    {"nama": "Andi Saputra", "nim": "10115001", "uts": 80, "uas": 85, "tugas": 80},
    {"nama": "Budi Santoso", "nim": "10115002", "uts": 60, "uas": 60, "tugas": 70},
    {"nama": "Citra Lestari", "nim": "10115003", "uts": 90, "uas": 95, "tugas": 90},
    {"nama": "Dewi Anggraini", "nim": "10115004", "uts": 50, "uas": 45, "tugas": 50},
    {"nama": "Eko Pratama", "nim": "10115005", "uts": 75, "uas": 70, "tugas": 75}
]

# ==========================================
# 2. FUNGSI PERHITUNGAN
# ==========================================
def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir: 30% UTS + 40% UAS + 30% Tugas"""
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)

def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

# ==========================================
# 3. FUNGSI TAMPILAN & LOGIKA
# ==========================================
def tampilkan_tabel(data, judul="DAFTAR NILAI MAHASISWA"):
    """Menampilkan data dalam format tabel rapi"""
    print(f"\n--- {judul} ---")
    # Header Tabel
    print(f"{'No':<4} | {'NIM':<10} | {'Nama':<20} | {'UTS':<5} | {'UAS':<5} | {'Tgs':<5} | {'Akhir':<6} | {'Grade':<5}")
    print("-" * 80)
    
    if not data:
        print("Tidak ada data.")
        return

    for i, mhs in enumerate(data, 1):
        n_akhir = hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        grade = tentukan_grade(n_akhir)
        
        print(f"{i:<4} | {mhs['nim']:<10} | {mhs['nama']:<20} | {mhs['uts']:<5} | {mhs['uas']:<5} | {mhs['tugas']:<5} | {n_akhir:<6.1f} | {grade:<5}")
    print("-" * 80)

def cari_nilai_ekstrem(data):
    """Mencari mahasiswa dengan nilai tertinggi dan terendah"""
    if not data:
        print("Data kosong.")
        return

    # Inisialisasi
    tertinggi = None
    terendah = None
    max_score = -1
    min_score = 101

    for mhs in data:
        score = hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        
        # Cek Tertinggi
        if score > max_score:
            max_score = score
            tertinggi = mhs.copy()
            tertinggi['score'] = score
        
        # Cek Terendah
        if score < min_score:
            min_score = score
            terendah = mhs.copy()
            terendah['score'] = score

    print("\n>>> Analisis Nilai Ekstrem")
    print(f"Nilai Tertinggi : {tertinggi['nama']} ({tertinggi['score']:.1f})")
    print(f"Nilai Terendah  : {terendah['nama']} ({terendah['score']:.1f})")

def input_mahasiswa_baru():
    """Fitur input data mahasiswa baru"""
    print("\n>>> Input Data Mahasiswa Baru")
    try:
        nama = input("Masukkan Nama  : ")
        nim = input("Masukkan NIM   : ")
        uts = float(input("Nilai UTS      : "))
        uas = float(input("Nilai UAS      : "))
        tugas = float(input("Nilai Tugas    : "))
        
        baru = {"nama": nama, "nim": nim, "uts": uts, "uas": uas, "tugas": tugas}
        data_mahasiswa.append(baru)
        print("Data berhasil ditambahkan!")
    except ValueError:
        print("Error: Nilai harus berupa angka!")

def filter_by_grade(target_grade):
    """Filter mahasiswa berdasarkan grade tertentu"""
    hasil_filter = []
    for mhs in data_mahasiswa:
        n_akhir = hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
        grade = tentukan_grade(n_akhir)
        if grade == target_grade.upper():
            hasil_filter.append(mhs)
    
    if hasil_filter:
        tampilkan_tabel(hasil_filter, f"HASIL FILTER GRADE {target_grade.upper()}")
    else:
        print(f"\nTidak ada mahasiswa dengan grade {target_grade.upper()}.")

def hitung_rata_rata_kelas():
    """Menghitung rata-rata nilai akhir seluruh kelas"""
    if not data_mahasiswa:
        return 0
    
    total = 0
    for mhs in data_mahasiswa:
        total += hitung_nilai_akhir(mhs['uts'], mhs['uas'], mhs['tugas'])
    
    rata_rata = total / len(data_mahasiswa)
    print(f"\n>>> Rata-rata Nilai Kelas: {rata_rata:.2f}")

# ==========================================
# 4. MAIN PROGRAM (MENU)
# ==========================================
def main():
    while True:
        print("\n==================================")
        print(" SISTEM PENGELOLAAN NILAI MAHASISWA")
        print("==================================")
        print("1. Tampilkan Semua Data")
        print("2. Tambah Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi & Terendah")
        print("4. Filter Berdasarkan Grade")
        print("5. Hitung Rata-rata Kelas")
        print("6. Keluar")
        
        pilihan = input("Pilih menu (1-6): ")

        if pilihan == '1':
            tampilkan_tabel(data_mahasiswa)
        elif pilihan == '2':
            input_mahasiswa_baru()
        elif pilihan == '3':
            cari_nilai_ekstrem(data_mahasiswa)
        elif pilihan == '4':
            gr = input("Masukkan Grade yang dicari (A/B/C/D/E): ")
            filter_by_grade(gr)
        elif pilihan == '5':
            hitung_rata_rata_kelas()
        elif pilihan == '6':
            print("Terima kasih, program selesai.")
            break
        else:
            print("Pilihan tidak valid, silakan coba lagi.")

if __name__ == "__main__":
    main()
