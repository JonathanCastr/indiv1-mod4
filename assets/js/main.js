const {
  registerWorker,
  nameworker,
  rut,
  corporatejob,
  formRegisterNewProject,
  nameProject,
  workers,
} = window;

const workerList = localStorage.getItem('workerList')
  ? JSON.parse(localStorage.getItem('workerList'))
  : [];

registerWorker.addEventListener('submit', (e) => {
  e.preventDefault();

  const worker = new Worker(nameworker.value, rut.value, corporatejob.value);
  workerList.push(worker);
  localStorage.setItem('workerList', JSON.stringify(workerList));

  // limpia formulario
  nameworker.value= '';
  rut.value = '';
  corporatejob.value = '';
});

function Worker(workerName, rut, corporatejob) {
  this.workerName = workerName;
  this.rut = rut;
  this.corporateJob = corporatejob;
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


function createWorkersSelectorOnDOM() {

}