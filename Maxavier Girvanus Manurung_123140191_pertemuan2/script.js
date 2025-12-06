// --- 1. Implementasi Class (ES6) ---
class TaskManager {
    constructor() {
        // Mengambil data dari localStorage saat inisialisasi
        const storedTasks = localStorage.getItem('myTasks');
        this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Method untuk menyimpan ke LocalStorage
    save() {
        localStorage.setItem('myTasks', JSON.stringify(this.tasks));
    }

    // Method Menambah Data
    add(taskName) {
        if (!taskName) return alert("Tugas tidak boleh kosong!");
        
        const newTask = {
            id: Date.now(), // Unique ID
            name: taskName
        };
        
        this.tasks.push(newTask);
        this.save();
        this.render();
    }

    // Method Menghapus Data
    delete(id) {
        // Arrow Function #1 (Filter)
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.render();
    }

    // Method Mengedit Data
    edit(id) {
        // Mencari task
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const newName = prompt("Edit tugas:", task.name);
            if (newName) {
                task.name = newName;
                this.save();
                this.render();
            }
        }
    }

    // Method Render ke HTML
    render() {
        const listContainer = document.getElementById('taskList');
        listContainer.innerHTML = ''; // Clear list

        // Arrow Function #2 (ForEach)
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            
            // Penggunaan Template Literals untuk rendering dinamis
            // 'app' merujuk pada instance global yang kita buat di bawah
            li.innerHTML = `
                <span>${task.name}</span>
                <div class="actions">
                    <button class="btn-edit" onclick="app.edit(${task.id})">Edit</button>
                    <button class="btn-delete" onclick="app.delete(${task.id})">Hapus</button>
                </div>
            `;
            listContainer.appendChild(li);
        });
    }
}

// --- 2. Inisialisasi Objek Global ---
// Kita gunakan 'var' atau properti window agar bisa diakses oleh onclick di HTML string
var app = new TaskManager();

// Render awal saat halaman dimuat
app.render();

// --- 3. Event Listeners ---
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

// Arrow Function #3 (Event Listener)
addBtn.addEventListener('click', () => {
    app.add(input.value);
    input.value = ''; // Reset input
});

// Fitur tambahan: Tekan Enter untuk menambah
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        app.add(input.value);
        input.value = '';
    }
});

// --- 4. Fungsi Waktu (Realtime Clock) ---
const updateClock = () => {
    const now = new Date();
    // Template literal untuk format waktu
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    document.getElementById('clock').textContent = timeString;
};

// Jalankan interval setiap 1 detik
setInterval(updateClock, 1000);
updateClock(); // Panggil sekali agar tidak delay

// --- 5. Fungsi Asinkron (Async/Await) ---
// Simulasi mengambil data cuaca dari API
const getWeather = async () => {
    const weatherEl = document.getElementById('weather');
    
    try {
        // Simulasi delay jaringan (2 detik)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Data simulasi (Mock Data)
        const mockData = {
            temp: 29,
            condition: "Cerah Berawan",
            location: "Jakarta"
        };

        // Template Literals
        weatherEl.innerHTML = `📍 ${mockData.location} | ${mockData.temp}°C ${mockData.condition}`;
    } catch (error) {
        weatherEl.textContent = "Gagal memuat cuaca.";
        console.error(error);
    }
};

// Jalankan fungsi async
getWeather();