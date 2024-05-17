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

function addTask() {
    taskInputs.forEach((input, index) => {
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
        }
    });
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector('span');
    const newText = prompt("Editar tarefa: ", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

function deleteTask(button, listIndex) {
    const li = button.parentElement;
    taskLists[listIndex].removeChild(li);
}