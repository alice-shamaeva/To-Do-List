let tasks = [];
let currentFilter = 'all';

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskContainer = document.querySelector("#task-container");
const completedTasksBtn = document.querySelector("#completed-filter");
const uncompletedTasksBtn = document.querySelector("#uncompleted-filter");
const allTasksBtn = document.querySelector("#all-filter");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = input.value.trim();
    if (inputValue !== "") {
        const taskObject = {
            id: Date.now(),
            title: inputValue,
            completed: false,
        }

        tasks.push(taskObject);
        saveTasks();
        renderAllTasks();

        console.log(tasks);
        input.value = "";
    }
})

function renderTasks(taskObj) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.completed;
    li.classList.toggle("completed", taskObj.completed);

    checkbox.addEventListener("change", () => {
        taskObj.completed = checkbox.checked;
        saveTasks();
        renderAllTasks();
    });

    deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex(task => task.id === taskObj.id);

        if (index > -1) {
            tasks.splice(index, 1);
        }
        saveTasks();
        renderAllTasks();
    });

    deleteBtn.textContent = "Удалить";
    li.textContent = taskObj.title;
    li.append(deleteBtn);
    li.prepend(checkbox);
    taskContainer.append(li);
}

function renderAllTasks() {
    taskContainer.replaceChildren();

    let tasksToRender = tasks;

    if (currentFilter === "completed") {
        tasksToRender = tasks.filter(task => task.completed);
    } else if (currentFilter === "uncompleted") {
        tasksToRender = tasks.filter(task => !task.completed);
    }

    tasksToRender.forEach(task => {
        renderTasks(task);
    })
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(savedTasks);

    if (savedTasks !== null) {
        tasks = savedTasks;
        renderAllTasks();
    } else {
        fetchTasks();
    }
}

async function fetchTasks() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        tasks = await response.json();
        saveTasks();
        renderAllTasks();
    } catch (e) {
        console.error(e);
    }
}

completedTasksBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderAllTasks();
})

uncompletedTasksBtn.addEventListener("click", () => {
    currentFilter = "uncompleted";
    renderAllTasks();
})

allTasksBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderAllTasks();
})

loadTasks();
