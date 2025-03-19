document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a valid task.");
        return;
    }

    let taskList = document.getElementById("tasks");

    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✖</button>
        </div>
    `;

    li.classList.add("fade-in");
    taskList.appendChild(li);

    saveTask(taskText);

    taskInput.value = "";

    // Add event listeners for complete and delete buttons
    li.querySelector(".complete-btn").addEventListener("click", function() {
        li.classList.toggle("complete");
        updateLocalStorage();
    });

    li.querySelector(".delete-btn").addEventListener("click", function() {
        li.classList.add("fade-out");
        setTimeout(() => {
            li.remove();
            updateLocalStorage();
        }, 300);
    });
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("tasks");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;

        if (task.completed) {
            li.classList.add("complete");
        }

        li.classList.add("fade-in");
        taskList.appendChild(li);

        // Add event listeners for buttons
        li.querySelector(".complete-btn").addEventListener("click", function() {
            li.classList.toggle("complete");
            updateLocalStorage();
        });

        li.querySelector(".delete-btn").addEventListener("click", function() {
            li.classList.add("fade-out");
            setTimeout(() => {
                li.remove();
                updateLocalStorage();
            }, 300);
        });
    });
}

function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#tasks li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").textContent,
            completed: li.classList.contains("complete")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
