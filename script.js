// Get references to DOM elements
const taskListContainer = document.getElementById("list-container");
// Get reference to the "input-box" text element
const taskInputBox = document.getElementById("input-box");
// Get reference to the "All" text element
const showAllText = document.getElementById("show-all-text");
// Get reference to the "Uncompleted" text element
const uncompletedText = document.getElementById("uncompleted-text");
// Get reference to the "Completed" text element
const completedText = document.getElementById("completed-text");


// Function to add a task to the list
function addTask() {
    if ((taskInputBox.value === "")) {
        alert("Please enter any text before submit!");
    } else {
        const newTask = document.createElement("li");
        newTask.textContent = taskInputBox.value;
        taskListContainer.appendChild(newTask);

        const deleteButton = document.createElement("span");
        deleteButton.textContent = "\u00d7"; // '** (Unicode symbol)
        deleteButton.style.right = "0px";
        newTask.appendChild(deleteButton);
    } 

    // Clear the input box after adding the task
    taskInputBox.value = "";
    saveTasks();
    updateTasksLeft(document.querySelectorAll('#list-container li:not(.checked)').length);
}
// Function to display all tasks (both checked and unchecked)
function displayAllTasks() {
    const allTasks = document.querySelectorAll("#list-container li");
    
    allTasks.forEach((task) => {
        if (task.classList.contains("checked")) {
            task.style.display = ""; // Show checked tasks
        } else {
            task.style.display = ""; // show unchecked tasks
        }
    });

    // Update the count of remaining tasks
    updateTasksLeft(document.querySelectorAll('#list-container li:not(.checked)').length);
}

// Function to update the counter
function updateTasksLeft(count) {
    const tasksLeftElement = document.getElementById("items-left");
    tasksLeftElement.textContent = `${count} tasks left`;
}
// Function to save the current task list to localStorage
function saveTasks() {
    localStorage.setItem("tasks", taskListContainer.innerHTML);
    // updateCounter();
    updateTasksLeft(document.querySelectorAll('#list-container li:not(.checked)').length);
}

// Function to display the saved task List from LocalStorage
function loadTasks() {
    taskListContainer.innerHTML = localStorage.getItem("tasks") || "";
    // updateCounter();
    updateTasksLeft(document.querySelectorAll('#list-container li:not(.checked)').length);
}

// Function to display only unchecked tasks
function displayUncompletedTasks() {
    const allTasks = document.querySelectorAll("#list-container li");
    
    allTasks.forEach((task) => {
        if (task.classList.contains("checked")) {
            task.style.display = "none"; // Hide checked tasks
        } else {
            task.style.display = ""; // Show unchecked tasks
        }
    });

    // Update the count of remaining tasks
    updateTasksLeft(document.querySelectorAll('#list-container li:not(.checked)').length);
}

// Function to display only checked tasks
function displayCompletedTasks() {
    const allTasks = document.querySelectorAll("#list-container li");
    
    allTasks.forEach((task) => {
        if (task.classList.contains("checked")) {
            task.style.display = ""; // Show checked tasks
        } else {
            task.style.display = "none"; // Hide unchecked tasks
        }
    });

    // Update the count of remaining tasks
    updateTasksLeft(document.querySelectorAll('#list-container li:not(.checked)').length);
}

// Event Listener to "Complete All Tasks" text
const completeAllText = document.getElementById("complete-all-text");

completeAllText.addEventListener("click", () => {
    const allTasks = document.querySelectorAll("#list-container li");

    allTasks.forEach((task) => {
        if (!task.classList.contains("checked")) {
            task.classList.add("checked");
        }
    });

    saveTasks();
    updateTasksLeft(0); // Since all tasks are now completed
});

// Event Listener to "Clear Completed" text
const clearCompletedText = document.getElementById("clear-completed-text");

clearCompletedText.addEventListener("click", () => {
    const completedTasks = document.querySelectorAll("#list-container li.checked");

    completedTasks.forEach((task) => {
        task.remove();
    });

    saveTasks();
    const remainingTasks = document.querySelectorAll('#list-container li:not(.checked)').length;
    updateTasksLeft(remainingTasks); // Update counter to show remaining tasks
});

// Event Listener to "All" text
showAllText.addEventListener("click", displayAllTasks);

// Event Listener to "Completed" text
completedText.addEventListener("click", displayCompletedTasks);

// Event Listener to "Uncompleted" text
uncompletedText.addEventListener("click", displayUncompletedTasks);

// Event Listener to handle task click events (toggle or delete)
taskListContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        if (!e.target.classList.contains("checked")) {
            e.target.classList.add("checked");
            saveTasks();
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks();
    }
    updateTasksLeft(document.querySelectorAll('#list-container li:not(.checked)').length);
});

// Event Listener to add task when "Enter" key is pressed
taskInputBox.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        addTask();
    }

});

// Display tasks on page load
loadTasks();