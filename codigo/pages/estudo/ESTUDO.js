const taskLists = [document.getElementById("taskList4")];
const taskInputs = [document.getElementById("taskInput4")];

function saveTasks() {
  const tasks = taskLists.map((list) => {
    return Array.from(list.children).map(
      (item) => item.querySelector("span").textContent
    );
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((tasks, index) => {
      tasks.forEach((taskText) => {
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
}

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
      saveTasks();
    }
  });
}

function editTask(button) {
  const li = button.parentElement;
  const span = li.querySelector("span");
  const newText = prompt("Editar tarefa: ", span.textContent);
  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
    saveTasks();
  }
}

function deleteTask(button, listIndex) {
  const li = button.parentElement;
  taskLists[listIndex].removeChild(li);
  saveTasks();
}

window.onload = loadTasks;
