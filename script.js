const apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // URL de la API para tareas
const taskList = document.getElementById('task-list'); // Obtiene el elemento de la lista de tareas
const taskForm = document.getElementById('task-form'); // Obtiene el formulario de tareas
const taskInput = document.getElementById('task-input'); // Obtiene el campo de entrada de tareas

// Función para obtener y mostrar tareas desde la API
async function fetchTasks() {
    try {
        const response = await fetch(`${apiUrl}?_limit=10`); // Limita a 10 tareas
        const tasks = await response.json();
        displayTasks(tasks); // Muestra las tareas en la lista
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Función para mostrar tareas en la lista
function displayTasks(tasks) {
    taskList.innerHTML = ''; // Limpia la lista de tareas actual
    tasks.forEach(task => addTaskToDOM(task));
}

// Función para crear y añadir un elemento de tarea en el DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `<p>${task.title}</p>`;
    
    // Botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteTask(task.id, li);
    
    // Agregar botón y tarea al DOM
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Maneja la sumisión del formulario para agregar una nueva tarea
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    const taskTitle = taskInput.value.trim(); // Obtiene y limpia el valor del campo de entrada
    if (taskTitle) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: taskTitle, completed: false }),
            });
            const newTask = await response.json();
            addTaskToDOM(newTask); // Agrega la nueva tarea al DOM
            taskInput.value = ''; // Limpia el campo de entrada
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});

// Función para eliminar una tarea
async function deleteTask(taskId, listItem) {
    try {
        await fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' });
        taskList.removeChild(listItem); // Elimina la tarea del DOM
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Carga las tareas al cargar la página
fetchTasks();
