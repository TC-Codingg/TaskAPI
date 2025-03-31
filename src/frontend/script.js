const API_URL = "http://localhost:3000/tasks";

        async function fetchTasks() {
            const response = await fetch(API_URL);
            const tasks = await response.json();
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            tasks.forEach(task => {
                const item = document.createElement("li");
                item.innerHTML = `${task.title} - ${task.status} 
                    <button onclick="updateTask(${task.id})">Completar</button>
                    <button onclick="deleteTask(${task.id})">Eliminar</button>`;
                list.appendChild(item);
            });
        }

        async function addTask() {
            const title = document.getElementById("taskInput").value;
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title })
            });
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