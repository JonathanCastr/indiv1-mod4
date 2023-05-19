// const {registerWorker, nameworker, rut, corporateJob,formRegisterNewProject,nameProject,workers} = window;

//const worker1=new Worker(workerNameInput.value, rutInput.value, jobInput.value);

function Worker(workerName, rut, corporateJob) {
  this.workerName = workerName;
  this.rut = rut;
  this.corporateJob = corporateJob;
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

Project.prototype.obtenerTodosLosTrabajadores = function () {
  return this.workers;
};

const trabajador1 = new Worker('Daniela', '1341234', 'operador');
const trabajador2 = new Worker('Pedrito', '1234', 'operador');
const trabajador3 = new Worker('jorgito', '1235', 'jefe');

const project1 = new Project('impresion de poleras', [
  trabajador1,
  trabajador2,
  trabajador3,
]);

console.log('trabajador: ', project1.obtenerTodosLosTrabajadores());
