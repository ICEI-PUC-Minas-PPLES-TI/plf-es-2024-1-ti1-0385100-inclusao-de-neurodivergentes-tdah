const taskLists = [document.getElementById("taskList4")];
const taskInputs = [document.getElementById("taskInput4")];
const titleInputs = [document.getElementById("taskTitleInput4")];

function saveTasks() {
  const tasks = taskLists.map((list) => {
    return Array.from(list.children).map((item) => {
      return {
        title: item.querySelector(".taskTitle").textContent,
        content: item.querySelector(".taskContent").textContent,
      };
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((tasks, index) => {
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="taskTitle">${task.title}</span>
          <span class="taskContent">${task.content}</span>
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
    const taskTitle = titleInputs[index].value.trim();
    const taskText = input.value.trim();
    if (taskTitle !== "" && taskText !== "") {
      const maxText = taskText.substring(0, 35);
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="taskTitle">${taskTitle}</span>
        <span class="taskContent">${maxText}</span>
        <button class="editButton" onClick="editTask(this)">Editar</button>
        <button class="deleteButton" onClick="deleteTask(this, ${index})">Remover</button>
      `;
      taskLists[index].appendChild(li);
      titleInputs[index].value = "";
      input.value = "";
      saveTasks();
    }
  });
}

function editTask(button) {
  const li = button.parentElement;
  const titleSpan = li.querySelector(".taskTitle");
  const contentSpan = li.querySelector(".taskContent");
  const newTitle = prompt("Editar título: ", titleSpan.textContent);
  const newText = prompt("Editar tarefa: ", contentSpan.textContent);
  if (
    newTitle !== null &&
    newTitle.trim() !== "" &&
    newText !== null &&
    newText.trim() !== ""
  ) {
    titleSpan.textContent = newTitle.trim();
    contentSpan.textContent = newText.trim();
    saveTasks();
  }
}

function deleteTask(button, listIndex) {
  const li = button.parentElement;
  taskLists[listIndex].removeChild(li);
  saveTasks();
}

window.onload = loadTasks;
