const taskLists = [
    document.getElementById("taskList1"),
    document.getElementById("taskList2"),
    document.getElementById("taskList3"),
    document.getElementById("taskList4")
];

const taskInputs = [
    document.getElementById("taskInput1"),
    document.getElementById("taskInput2"),
    document.getElementById("taskInput3"),
    document.getElementById("taskInput4")
];

const localStorageKey = 'TaskList';

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    taskInputs.forEach((input, index) => {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        const taskText = input.value.trim();
        
        if (taskText !== "") {
            const maxText = taskText.substring(0, 35);
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${maxText}</span>
                <button class="editButton" onClick="editTask(this)">Editar</button>
                <button class="deleteButton" onClick="deleteTask(this, ${index})">Remover</button>
            `;
            taskLists[index].appendChild(li);
            input.value = "";
            saveTasks();
        }
    });
}

function editTask(button) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    const li = button.parentElement;
    const span = li.querySelector('span');
    const newText = prompt("Editar tarefa: ", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks();
    }
}

function deleteTask(button, listIndex) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    const li = button.parentElement;
    taskLists[listIndex].removeChild(li);
    saveTasks();
}

function saveTasks() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    const tasks = taskLists.map(list => {
        const items = [];
        list.querySelectorAll('li span').forEach(span => {
            items.push(span.textContent);
        });
        return items;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
   let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    tasks.forEach((taskArray, index) => {
        taskArray.forEach(taskText => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="editButton" onClick="editTask(this)">Editar</button>
                <button class="deleteButton" onClick="deleteTask(this, ${index})">Remover</button>
            `;
            taskLists[index].appendChild(li);
        });
    });
}
