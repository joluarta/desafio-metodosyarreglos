const nuevaTareaInput = document.querySelector("input");
const tbody = document.querySelector("tbody");
const btn = document.querySelector("button");
const [totalSpan, realizadasSpan, pendientesSpan] = document.querySelectorAll(
  ".resumen span"
);
const tareas = [];   

let resumen = {
  total: 0,
  realizadas: 0,
  pendientes: 0
};

btn.addEventListener("click", () => {
  const { value: nuevaTarea } = nuevaTareaInput;
  if (nuevaTarea) {
    addTask(nuevaTarea);
    refresh();
  } else alert("Debe escribir nueva tarea");
});

const addTask = (nuevaTarea) => {
  const id = Math.floor(Math.random() * 99);
  const tarea = {
    id,
    tarea: nuevaTarea,
    check: false
  };
  tareas.push(tarea);
  nuevaTareaInput.value = "";
};

const checkInput = (id) => {
  const tarea = tareas.find((tarea) => tarea.id === id);
  const { check } = tarea;
  tarea.check = !check;
  refresh();
};

const editTask = (id) => {
  const tarea = tareas.find((tarea) => tarea.id === id);
  const { tarea: tareaDescription } = tarea;
  const nuevaDescripcion = prompt("Editar tarea:", tareaDescription);
  tarea.tarea = nuevaDescripcion;
  refresh();
};

const deleteTask = (id) => {
  const decision = confirm("¿Seguro que quieres eliminar?");
  if (decision) {
    const index = tareas.findIndex((tarea) => tarea.id === id);
    tareas.splice(index, 1);
    refresh();
  }
};

const fillTable = () => {
  tareas.forEach(({ id, tarea, check }) => {
    const row = `
    <tr>
      <td>${id}</td>
      <td>${tarea}</td>
      <td class="x-delete">
          <input onchange="checkInput(${id})" 
            ${check ? "checked" : ""} type="checkbox"/>
          <span onclick="editTask(${id})">✏</span>
          <span onclick="deleteTask(${id})">❌</span>
      </td>
    </tr>
    `;
    tbody.innerHTML += row;
  });
};

const clearTable = () => (tbody.innerHTML = "");

const calculateResumen = () => {
  const { length: total } = tareas;
  const { length: realizadas } = tareas.filter(({ check }) => check);
  const { length: pendientes } = tareas.filter(({ check }) => !check);
  const newResumen = { total, realizadas, pendientes };
  resumen = { ...newResumen };
};

const updateResumen = () => {
  const { total, realizadas, pendientes } = resumen;
  totalSpan.innerHTML = total;
  realizadasSpan.innerHTML = realizadas;
  pendientesSpan.innerHTML = pendientes;
};

const refresh = () => {
  clearTable();
  fillTable();
  calculateResumen();
  updateResumen();
};

