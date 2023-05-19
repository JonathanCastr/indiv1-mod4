// DOM elements
const {
  registerWorker,
  nameworker,
  rut,
  corporatejob,
  formRegisterNewProject,
  nameProject,
  workers,
  workersSelector,
} = window;

// data

const workerList = localStorage.getItem('workerList')
  ? JSON.parse(localStorage.getItem('workerList'))
  : {};

const projectList = localStorage.getItem('projectList')
  ? JSON.parse(localStorage.getItem('projectList'))
  : {};

// constructor functions

function Worker(name, rut, job) {
  this.name = name;
  this.rut = rut;
  this.job = job;
  this.id = generateId(name);
  this.projectId = undefined;
}

function Project(projectName, workers, id) {
  this.projectName = projectName;
  this._workers = workers;
  this.id = id;

  Object.defineProperty(this, 'workers', {
    get: function () {
      return this._workers;
    },
    set: function (workers) {
      this._workers = workers;
    },
  });
}

Project.prototype.getAllWorkers = function () {
  return this.workers;
};

// Esta funcion no se ocupara por ahora porque buscaremos trabajadores en toda la empresa, no en un proyecto
Project.prototype.getWorkerByName = function (name) {
  const workers = Object.values(this.workers);
  const worker = workers.find((worker) => worker.name === name);
  return worker;
};

// functions

function createWorkersSelectorOnDOM() {
  let checkboxInputs = '';

  const workers = Object.values(workerList);
  console.log(workers);
  workers.forEach((worker) => {
    const { id, name, job, projectId } = worker;
    if (projectId) return; // no muestra el trabajador si ya esta asociado a un proyecto
    checkboxInputs += `
    <div>
      <input type="checkbox" id="${id}" name="${name}" class="checkboxInput">
      <label for="${id}">${name} (${job})</label>
    </div>
    `;
  });
  if (workers.length === 0) {
    workersSelector.innerHTML = '<p>No hay trabajadores registrados</p>';
    return;
  }
  if (checkboxInputs === '') {
    workersSelector.innerHTML =
      '<p>Todos los trabajadores registrados han sido asignados a un proyecto</p>';
    return;
  }
  workersSelector.innerHTML = checkboxInputs;
}

function generateId(name) {
  return name + String(Math.floor(Math.random() * 100000000));
}

function getWorkerByName(name) {
  const workers = Object.values(workerList);
  const worker = workers.find((worker) => worker.name === name);
  return worker;
}

// forms listeners

registerWorker.addEventListener('submit', (e) => {
  e.preventDefault();

  const worker = new Worker(nameworker.value, rut.value, corporatejob.value);
  workerList[worker.id] = worker;
  localStorage.setItem('workerList', JSON.stringify(workerList));
  createWorkersSelectorOnDOM();

  // limpia formulario
  nameworker.value = '';
  rut.value = '';
  corporatejob.value = '';
});

formRegisterNewProject.addEventListener('submit', (e) => {
  e.preventDefault();
  // arreglo con los ids de los trabajadores selecionados
  let selectedWorkersIds = [];
  const inputs = document.querySelectorAll('.checkboxInput');
  inputs.forEach((input) => {
    const { id, checked } = input;
    if (checked) {
      selectedWorkersIds.push(id);
    }
  });

  // genera un id para el proyecto. Lo generamos antes para poder setearlo en los trabajadores asignados
  const projectId = generateId(nameProject.value);

  // asigna el id del proyecto a la propiedad projectId de cada trabajador asignado al proyecto
  selectedWorkersIds.forEach((id) => {
    workerList[id].projectId = projectId;
    localStorage.setItem('workerList', JSON.stringify(workerList));
  });

  // objeto con los trabajadores seleccionados indexados por id
  const selectedWorkers = selectedWorkersIds.reduce(
    (acc, id) => ({ ...acc, [id]: workerList[id] }),
    {}
  );

  const project = new Project(nameProject.value, selectedWorkers, projectId);

  // agrega el proyecto al objeto projectList con un key equivalente al id del proyecto
  projectList[project.id] = project;

  localStorage.setItem('projectList', JSON.stringify(projectList));

  nameProject.value = '';

  createWorkersSelectorOnDOM();
});

// start
createWorkersSelectorOnDOM();
