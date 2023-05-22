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
  projectListTag,
  workerFinder,
  searchInput,
} = window;

// data

const workerList = localStorage.getItem('workerList')
  ? JSON.parse(localStorage.getItem('workerList'))
  : {};

const projectList = getProjectListFromLocalStorage();

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

// Entrega todos los trabajadores del proyecto que la llama
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

// recupera los projectos del localStorage y los entrega a Project para reasignarles los metodos
function getProjectListFromLocalStorage() {
  if (localStorage.getItem('projectList')) {
    const temp = JSON.parse(localStorage.getItem('projectList'));
    const projectList = Object.values(temp).map((project) => {
      return new Project(project.projectName, project._workers, project.id);
    });
    return projectList;
  } else {
    return {};
  }
}

// Muestra en el formulario de proyectos los trabajadores registrados que no se han asigmado a ningun proyecto
function createWorkersSelectorOnDOM() {
  let checkboxInputs = '';

  const workers = Object.values(workerList);
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

// Muestra los proyectos creados
function createProjectListOnDOM() {
  let projects = '';

  const projectListArr = Object.values(projectList);
  console.log(projectListArr);
  if (projectListArr.length === 0) {
    projectListTag.innerHTML = 'No hay proyectos creados';
    return;
  }

  projectListArr.forEach((project) => {
    let workersPrint = '';

    console.log(project.__proto__);
    const workers = project.getAllWorkers();

    Object.values(workers).forEach((worker) => {
      workersPrint += `<li>${worker.name} (${worker.job})</li>`;
    });
    projects += `
    <p>Nombre del proyecto: ${project.projectName}</p>\n
    <p>Trabajadores asignados: </p>
    <ul>${workersPrint}</ul>
    <br>
    <hr>
    <br>
    `;
  });

  projectListTag.innerHTML = projects;
}

function generateId(name) {
  return name + String(Math.floor(Math.random() * 100000000));
}

function getWorkerByName(name) {
  const workers = Object.values(workerList);
  const worker = workers.find((worker) => worker.name.toLowerCase() === name);
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
  // arreglo con los ids de los trabajadores selecionados en el formulario
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
  console.log(projectList);
  localStorage.setItem('projectList', JSON.stringify(projectList));
  console.log(JSON.parse(localStorage.getItem('projectList')));
  nameProject.value = '';

  createWorkersSelectorOnDOM();
  createProjectListOnDOM();
});

workerFinder.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(searchInput.value);
  const name = searchInput.value.trim().toLowerCase();

  const worker = getWorkerByName(name);

  if (!worker) {
    alert('No se ha encontrado el trabajador');
    return;
  }
  const asignedProject =
    projectList[worker.projectId].projectName || 'no tiene proyecto asignado';

  alert(`
  nombre: ${worker.name}\n
  rut: ${worker.rut}\n   
  cargo: ${worker.job}\n
  Proyecto asignado: ${asignedProject}`);
});

// start
createWorkersSelectorOnDOM();
createProjectListOnDOM();
console.log(projectList);
