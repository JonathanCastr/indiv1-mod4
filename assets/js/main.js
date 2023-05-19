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
  : [];

const projectList = localStorage.getItem('projectList')
  ? JSON.parse(localStorage.getItem('projectList'))
  : [];

// constructor functions

function Worker(name, rut, job) {
  this.name = name;
  this.rut = rut;
  this.job = job;
  this.id = String(Math.floor(Math.random() * 100000000));
}

function Project(projectName, workers) {
  this.projectName = projectName;
  this._workers = workers;

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

// functions

function createWorkersSelectorOnDOM() {
  let checkboxInputs = '';
  workerList.forEach((worker) => {
    const { id, name, job } = worker;
    checkboxInputs += `
    <div>
      <input type="checkbox" id="${id}" name="${name}" class="checkboxInput">
      <label for="${id}">${name} (${job})</label>
    </div>
    `;
  });
  if (checkboxInputs === '') {
    workersSelector.innerHTML = '<p>No hay trabajajadores registrados</p>';
  } else {
    workersSelector.innerHTML = checkboxInputs;
  }
}

// forms listeners

registerWorker.addEventListener('submit', (e) => {
  e.preventDefault();

  const worker = new Worker(nameworker.value, rut.value, corporatejob.value);
  workerList.push(worker);
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

  // objeto con los trabajadores indexados por id
  const workerListById = workerList.reduce(
    (acc, worker) => ({ ...acc, [worker.id]: worker }),
    {}
  );

  // arreglo con los trabajadores seleccionados
  const selectedWorkers = selectedWorkersIds.map((id) => workerListById[id]);

  const project = new Project(nameProject.value, selectedWorkers);

  projectList.push(project);

  localStorage.setItem('projectList', JSON.stringify(projectList));

  nameProject.value = '';
});

// start
createWorkersSelectorOnDOM();
