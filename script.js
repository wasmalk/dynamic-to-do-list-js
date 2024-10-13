// Wait for the DOM content to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select the "Add Task" button and input field for entering tasks
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = []; // Array to hold the current list of tasks

    // Function to load tasks from Local Storage and populate the task list
    const loadTasks = () => {
        // Retrieve and parse the tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Populate the tasks array and the task list on the page
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates no further Local Storage update
    };

    // Function to add a new task to the task list
    const addTask = (taskText, save = true) => {
        // If called without a taskText, retrieve it from the input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task."); // Prompt the user to enter a task
            return; // Exit the function if the input is empty
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText; // Set the text of the list item

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set button text
        removeButton.className = 'remove-btn'; // Assign class name for styling

        // Define the onclick event for the remove button
        removeButton.onclick = () => {
            taskList.removeChild(li); // Remove the list item from the task list
            tasks = tasks.filter(task => task !== taskText); // Update tasks array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(li);

        // If saving is enabled, update Local Storage
        if (save) {
            tasks.push(taskText); // Update the tasks array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to Local Storage
        }

        // Clear the input field for new entries
        taskInput.value = ""; 
    };

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Add event listener to call addTask when the button is clicked
    addButton.addEventListener('click', () => addTask());

    // Allow task addition by pressing the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask if Enter is pressed
        }
    });
});
