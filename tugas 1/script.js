document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskCourseInput = document.getElementById('task-course');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const taskList = document.getElementById('task-list');
    const pendingTasksCountSpan = document.getElementById('pending-tasks-count');
    const searchInput = document.getElementById('search-input');
    const filterStatus = document.getElementById('filter-status');
    const filterCourse = document.getElementById('filter-course');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        updatePendingTasksCount();
        populateCourseFilter();
    }

    function renderTasks() {
        taskList.innerHTML = '';

        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterStatus.value;
        const courseFilter = filterCourse.value;

        const filteredTasks = tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm) ||
                                  task.course.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' ||
                                  (statusFilter === 'completed' && task.completed) ||
                                  (statusFilter === 'pending' && !task.completed);
            const matchesCourse = courseFilter === 'all' || task.course === courseFilter;
            return matchesSearch && matchesStatus && matchesCourse;
        });

        filteredTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.dataset.id = task.id;
            if (task.completed) {
                listItem.classList.add('completed');
            }

            listItem.innerHTML = `
                <div class="task-info">
                    <p class="task-name">${task.name}</p>
                    <p class="task-course">Mata Kuliah: ${task.course}</p>
                    <p class="task-deadline">Deadline: ${new Date(task.deadline).toLocaleString()}</p>
                </div>
                <div class="task-actions">
                    <button class="toggle-complete">${task.completed ? 'Batal Selesai' : 'Selesai'}</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Hapus</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    }

    function updatePendingTasksCount() {
        const pendingTasks = tasks.filter(task => !task.completed).length;
        pendingTasksCountSpan.textContent = pendingTasks;
    }

    function populateCourseFilter() {
        const courses = [...new Set(tasks.map(task => task.course))];
        filterCourse.innerHTML = '<option value="all">Semua Mata Kuliah</option>';
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course;
            filterCourse.appendChild(option);
        });
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = taskNameInput.value.trim();
        const course = taskCourseInput.value.trim();
        const deadline = taskDeadlineInput.value;

        if (!name) {
            alert('Nama tugas tidak boleh kosong!');
            return;
        }
        if (!course) {
            alert('Mata kuliah tidak boleh kosong!');
            return;
        }
        if (!deadline) {
            alert('Deadline harus diisi!');
            return;
        }
        if (new Date(deadline) < new Date()) {
            alert('Deadline tidak boleh di masa lalu!');
            return;
        }

        const newTask = {
            id: Date.now().toString(), 
            name,
            course,
            deadline,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();

        taskNameInput.value = '';
        taskCourseInput.value = '';
        taskDeadlineInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const listItem = target.closest('li');
        if (!listItem) return;

        const taskId = listItem.dataset.id;
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (target.classList.contains('toggle-complete')) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
        } else if (target.classList.contains('delete')) {
            if (confirm('Yakin ingin menghapus tugas ini?')) {
                tasks.splice(taskIndex, 1);
                saveTasks();
            }
        } else if (target.classList.contains('edit')) {
            const currentTask = tasks[taskIndex];
            const newName = prompt('Edit Nama Tugas:', currentTask.name);
            if (newName !== null && newName.trim() !== '') {
                const newCourse = prompt('Edit Mata Kuliah:', currentTask.course);
                if (newCourse !== null && newCourse.trim() !== '') {
                    const newDeadline = prompt('Edit Deadline (YYYY-MM-DDTHH:mm):', new Date(currentTask.deadline).toISOString().slice(0, 16));
                    if (newDeadline !== null && new Date(newDeadline) > new Date()) {
                        currentTask.name = newName.trim();
                        currentTask.course = newCourse.trim();
                        currentTask.deadline = newDeadline;
                        saveTasks();
                    } else if (newDeadline !== null) {
                        alert('Deadline tidak boleh kosong atau di masa lalu!');
                    }
                } else if (newCourse !== null) {
                    alert('Mata kuliah tidak boleh kosong!');
                }
            } else if (newName !== null) {
                alert('Nama tugas tidak boleh kosong!');
            }
        }
    });

    searchInput.addEventListener('input', renderTasks);
    filterStatus.addEventListener('change', renderTasks);
    filterCourse.addEventListener('change', renderTasks);


    saveTasks();
});