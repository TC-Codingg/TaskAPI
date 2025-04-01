const API_URL = "http://localhost:3000/tasks";

// Task Template with enhanced visual elements
const createTaskElement = (task) => {
    const statusClass = task.status === "completed" 
        ? "bg-green-100 border-green-300 text-green-800" 
        : "bg-amber-100 border-amber-300 text-amber-800";

    const item = document.createElement("li");
    item.classList.add(
        "group",
        "bg-white/90",
        "backdrop-blur-sm",
        "rounded-xl",
        "p-4",
        "flex",
        "items-center",
        "gap-4",
        "shadow-sm",
        "hover:shadow-md",
        "transition-all",
        "animate__animated",
        "animate__fadeIn"
    );
    item.setAttribute('data-task-id', task.id);

    item.innerHTML = `
        <div class="flex items-center gap-3 flex-1">
            <span class="flex-1 text-lg ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-700"}"
                  onclick="editTaskTitle(${task.id}, this)">
                ${task.title}
            </span>
            <span class="status-badge px-3 py-1.5 rounded-full text-sm font-medium border ${statusClass}">
                ${task.status === "completed" ? "Completed" : "Pending"}
            </span>
        </div>
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <button onclick="editTaskTitle(${task.id}, this.parentElement.previousElementSibling.firstElementChild)" 
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit title">
                <i class="ph-pencil-simple text-lg"></i>
            </button>
            <button onclick="updateTask(${task.id})" 
                    class="p-2 ${task.status === "completed" ? "text-amber-600 hover:bg-amber-50" : "text-green-600 hover:bg-green-50"} rounded-lg transition-colors"
                    title="${task.status === "completed" ? "Mark as pending" : "Mark as completed"}">
                <i class="ph-${task.status === "completed" ? "arrow-counter-clockwise" : "check-circle"} text-lg"></i>
            </button>
            <button onclick="deleteTask(${task.id})" 
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group/delete"
                    title="Delete task">
                <i class="ph-trash text-lg group-hover/delete:animate-bounce"></i>
            </button>
        </div>
    `;

    return item;
};

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        const list = document.getElementById("taskList");
        
        list.innerHTML = "";
        tasks.forEach(task => list.appendChild(createTaskElement(task)));
        
        if (tasks.length === 0) {
            list.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="ph-clipboard-text text-4xl mb-2"></i>
                    <p>No tasks yet. Add one above!</p>
                </div>
            `;
        }
    } catch (error) {
        showNotification('Failed to load tasks', 'error');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg animate__animated animate__fadeInRight ${
        type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' :
        'bg-red-100 border-l-4 border-red-500 text-red-700'
    }`;
    notification.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="ph-${type === 'success' ? 'check-circle' : 'x-circle'}"></i>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.replace('animate__fadeInRight', 'animate__fadeOutRight');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

async function addTask() {
    const title = document.getElementById("taskInput").value.trim();
    if (!title) return alert("La tarea no puede estar vacía.");

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });

        document.getElementById("taskInput").value = "";
        fetchTasks();
        showNotification('Task added successfully');
    } catch (error) {
        showNotification('Failed to add task', 'error');
    }
}

async function updateTask(id) {
    const currentTask = document.querySelector(`[data-task-id="${id}"]`);
    const newStatus = currentTask.querySelector('.status-badge').textContent.trim() === "Pending" 
        ? "completed" 
        : "pending";

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        fetchTasks();
        showNotification('Task status updated successfully');
    } catch (error) {
        showNotification('Failed to update task status', 'error');
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchTasks();
        showNotification('Task deleted successfully');
    } catch (error) {
        showNotification('Failed to delete task', 'error');
    }
}

async function editTaskTitle(id, element) {
    const currentTitle = element.textContent.trim();
    const input = document.createElement('input');
    input.value = currentTitle;
    input.className = 'p-1 border rounded w-full focus:outline-none focus:border-blue-500';

    const saveChanges = async () => {
        const newTitle = input.value.trim();
        if (newTitle && newTitle !== currentTitle) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: newTitle })
                });

                if (!response.ok) {
                    throw new Error('Failed to update title');
                }

                element.textContent = newTitle;
                if (input.parentNode) {
                    input.parentNode.replaceChild(element, input);
                }
                showNotification('Task title updated successfully');
            } catch (error) {
                console.error('Error updating title:', error);
                if (input.parentNode) {
                    input.parentNode.replaceChild(element, input);
                }
                showNotification('Failed to update task title', 'error');
            }
        } else {
            if (input.parentNode) {
                input.parentNode.replaceChild(element, input);
            }
        }
    };

    const cancelEdit = () => {
        if (input.parentNode) {
            input.parentNode.replaceChild(element, input);
        }
    };

    input.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
            await saveChanges();
        }
        if (e.key === 'Escape') {
            cancelEdit();
        }
    });

    input.addEventListener('blur', saveChanges);

    if (element.parentNode) {
        element.parentNode.replaceChild(input, element);
        input.focus();
    }
}

fetchTasks();
