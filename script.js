document.addEventListener("DOMContentLoaded", loadTasks());

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();  // trim() is used to remove whitespaces (blanks, tabs, newlines) from both ends of a string
    
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];  //JSON.parse() will convert string into array(object)

    const newTask = { id: Date.now(), text: taskText };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(newTask);
    taskInput.value = "";
}

function displayTask(newTask) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.setAttribute("data-id", newTask.id);
    
    li.innerHTML = `
        <span>${newTask.text}</span>
        <button class="edit-btn" onclick="editTask(${newTask.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${newTask.id})">Delete</button>
    `;
    
    taskList.appendChild(li);
}

function editTask(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskToEdit = tasks.find(newTask => newTask.id === id);
    
    const newTaskText = prompt("Edit task:", taskToEdit.text);
    if (newTaskText !== null) {
        taskToEdit.text = newTaskText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById("taskList").innerHTML = "";
        loadTasks();
    }
}

function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    document.getElementById("taskList").innerHTML = "";
    loadTasks();
}
