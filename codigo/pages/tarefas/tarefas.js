const localStorageKey = "toDoList-gn";

function validateNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById("inputNewTask").value;
  let exists = values.find((x) => x.name === inputValue);
  return !!exists;
}

function saveName() {
  const name = document.getElementById("inputNewTask").value;
  localStorage.setItem("userName", name);
  window.location.href = "../dashboard/dashboard.html";
}

function newTask() {
  let input = document.getElementById("inputNewTask");
  input.style.border = "";

  // Validação
  if (!input.value) {
    input.style.border = "1px solid red";
    alert("Digite algo para inserir na sua lista");
  } else if (validateNewTask()) {
    alert("Já existe uma tarefa com esse nome");
  } else {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({ name: input.value, done: false });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
  input.value = "";
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let list = document.getElementById("toDoList");
  list.innerHTML = "";
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `
            <li style="text-decoration: ${
              values[i].done ? "line-through" : "none"
            };">
                ${values[i].name}
                <button class='btn-delete' onclick='removeItem("${
                  values[i].name
                }")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg></button>
                <button class='btn-ok' onclick='markAsDone("${
                  values[i].name
                }")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
              </svg></button>
              <button class='btn-edit' onclick='editItem("${values[i].name}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2L2 11.207V13h1.793L14 4.793 11.207 2z"/>
                    </svg>
                  </button>
            </li>`;
  }
}

function removeItem(taskName) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name === taskName);
  if (index !== -1) {
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
}

function markAsDone(taskName) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name === taskName);
  if (index !== -1) {
    values[index].done = !values[index].done; // Toggle the done status
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
}

function editItem(taskName) {
  let newTaskName = prompt("Edit task name:", taskName);
  if (newTaskName !== null && newTaskName.trim() !== "") {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex((x) => x.name === taskName);
    if (index !== -1) {
      values[index].name = newTaskName;
      localStorage.setItem(localStorageKey, JSON.stringify(values));
      showValues();
    }
  }
}

showValues();

//GRAFICO
let estudoDiario = JSON.parse(localStorage.getItem('estudoDiario')) || {};
let chart = null;

document.getElementById('estudoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const materia = document.getElementById('materia').value.trim().toLowerCase();
  const horas = parseInt(document.getElementById('horas').value);

  // Inicializar array para a matéria se não existir
  if (!estudoDiario[materia]) {
    estudoDiario[materia] = [];
  }

  // Adicionar as horas ao array da matéria correspondente
  estudoDiario[materia].push(horas);

  // Armazenar de volta no localStorage
  localStorage.setItem('estudoDiario', JSON.stringify(estudoDiario));

  // Atualizar gráfico e lista de matérias
  atualizarGrafico(estudoDiario);
  atualizarListaMaterias(estudoDiario);
});

function atualizarGrafico(estudoDiario) {
  const ctx = document.getElementById('grafico').getContext('2d');

  // Obter nomes das matérias e somas das horas
  const materias = Object.keys(estudoDiario);
  const horasEstudo = materias.map(materia => estudoDiario[materia].reduce((a, b) => a + b, 0));

  // Se já houver um gráfico, destrua-o antes de criar um novo
  if (chart) {
    chart.destroy();
  }

  // Dados do gráfico
  const data = {
    labels: materias,
    datasets: [{
      label: 'Horas de Estudo',
      data: horasEstudo,
      backgroundColor: '#f79494',
      borderColor: 'black',
      borderWidth: 1
    }]
  };

  // Configurações do gráfico
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // Renderizar gráfico
  chart = new Chart(ctx, config);
}

function atualizarListaMaterias(estudoDiario) {
  const materiaList = document.getElementById('materiaList');
  materiaList.innerHTML = '';

  for (let materia in estudoDiario) {
    const listItem = document.createElement('li');
    listItem.textContent = `${materia} - ${estudoDiario[materia].reduce((a, b) => a + b, 0)} horas`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.className = 'btn-remove';
    removeButton.onclick = () => removerMateria(materia);

    listItem.appendChild(removeButton);
    materiaList.appendChild(listItem);
  }
}

function removerMateria(materia) {
  delete estudoDiario[materia];
  localStorage.setItem('estudoDiario', JSON.stringify(estudoDiario));
  atualizarGrafico(estudoDiario);
  atualizarListaMaterias(estudoDiario);
}

function removerTudo() {
  estudoDiario = {};
  localStorage.setItem('estudoDiario', JSON.stringify(estudoDiario));
  atualizarGrafico(estudoDiario);
  atualizarListaMaterias(estudoDiario);
}

// Inicializar gráfico e lista de matérias com dados do localStorage
document.addEventListener('DOMContentLoaded', () => {
  estudoDiario = JSON.parse(localStorage.getItem('estudoDiario')) || {};
  atualizarGrafico(estudoDiario);
  atualizarListaMaterias(estudoDiario);
});