const API_URL = "http://localhost:3000/tasks";


async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const item = document.createElement("li");
        item.classList.add("flex", "justify-between", "items-center", "p-2", "bg-gray-200", "rounded-md");

        item.innerHTML = `
            <span class="flex-1 ${task.status === "completada" ? "line-through text-gray-500" : ""}">
                ${task.title}
            </span>
            <button onclick="updateTask(${task.id})" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                ✅
            </button>
            <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                ❌
            </button>
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
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completada" })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}


fetchTasks();
