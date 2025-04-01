const API_URL = "http://localhost:3000/tasks";


async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const item = document.createElement("li");
        item.classList.add("flex", "justify-between", "items-center", "p-2", "bg-gray-200", "rounded-md");
        item.setAttribute('data-task-id', task.id);

        // Add status indicator with conditional styling
        const statusClass = task.status === "completed" 
            ? "bg-green-200 text-green-800" 
            : "bg-yellow-200 text-yellow-800";

        item.innerHTML = `
            <div class="flex items-center gap-2 flex-1">
                <span class="flex-1 ${task.status === "completed" ? "line-through text-gray-500" : ""}"
                      onclick="editTaskTitle(${task.id}, this)">
                    ${task.title}
                </span>
                <span class="status-badge px-2 py-1 rounded-full text-sm ${statusClass}">
                    ${task.status === "completed" ? "Completed" : "Pending"}
                </span>
            </div>
            <div class="flex gap-2 ml-2">
                <button onclick="editTaskTitle(${task.id}, this.parentElement.previousElementSibling.firstElementChild)" 
                        class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        title="Edit title">
                    ✏️
                </button>
                <button onclick="updateTask(${task.id})" 
                        class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        title="${task.status === "completed" ? "Mark as pending" : "Mark as completed"}">
                    ${task.status === "completed" ? "↩️" : "✅"}
                </button>
                <button onclick="deleteTask(${task.id})" 
                        class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        title="Delete task">
                    ❌
                </button>
            </div>
        `;

        list.appendChild(item);
    });
}


async function addTask() {
    const title = document.getElementById("taskInput").value.trim();
    if (!title) return alert("La tarea no puede estar vacía.");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    document.getElementById("taskInput").value = "";
    fetchTasks();
}


async function updateTask(id) {
    const currentTask = document.querySelector(`[data-task-id="${id}"]`);
    const newStatus = currentTask.querySelector('.status-badge').textContent.trim() === "Pending" 
        ? "completed" 
        : "pending";

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
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
                // Send the updated title to the backend
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: newTitle })
                });

                if (!response.ok) {
                    throw new Error('Failed to update title');
                }

                // Update the DOM directly without refreshing the entire list
                element.textContent = newTitle;
                if (input.parentNode) {
                    input.parentNode.replaceChild(element, input);
                }
            } catch (error) {
                console.error('Error updating title:', error);
                if (input.parentNode) {
                    input.parentNode.replaceChild(element, input);
                }
            }
        } else {
            // Revert if the title is empty or unchanged
            if (input.parentNode) {
                input.parentNode.replaceChild(element, input);
            }
        }
    };

    const cancelEdit = () => {
        // Revert to the original title
        if (input.parentNode) {
            input.parentNode.replaceChild(element, input);
        }
    };

    // Handle Enter and Escape keys
    input.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
            await saveChanges();
        }
        if (e.key === 'Escape') {
            cancelEdit();
        }
    });

    // Save changes when the input loses focus
    input.addEventListener('blur', saveChanges);

    // Replace the span with the input field and focus it
    if (element.parentNode) {
        element.parentNode.replaceChild(input, element);
        input.focus();
    }
}

fetchTasks();
