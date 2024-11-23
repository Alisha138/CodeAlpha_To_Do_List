function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();  // trim() is used to remove whitespaces (blanks, tabs, newlines) from both ends of a string
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),            //Date.now() gives unique id for each task
        text: taskText,
    };

    // Save task to local storage
    saveTask(task);
    taskInput.value = '';
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);    //pushing element in array
    localStorage.setItem('tasks', JSON.stringify(tasks));  //setItem() will store data in localstorage
    //JSON.stringify(tasks) will convert array into string 
    renderTasks();
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');   //setItem() will get data from localstorage
    return tasks ? JSON.parse(tasks) : [];    //JSON.parse(tasks) will convert string into array(object)
}

function renderTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.text} <button data-id="${task.id}">Delete</button>`;
        taskList.appendChild(li);
    });
}

function deleteTask(e) {
    if (e.target.tagName === 'BUTTON') {
        const taskId = e.target.getAttribute('data-id');
        const tasks = getTasks().filter(task => task.id != taskId);  //filter() will return new array with all elements that pass the test implemented by the provided function
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});
