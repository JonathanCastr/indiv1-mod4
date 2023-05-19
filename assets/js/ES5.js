const {registerWorker, nameworker, rut, corporateJob,formRegisterNewProject,nameProject,workers} = window;

//const worker1=new Worker(workerNameInput.value, rutInput.value, jobInput.value);

function Worker(nameworker,rut,corporateJob){
    this.nameworker=nameworker;
    this.rut=rut;
    this.corporateJob=corporateJob;
}

function Project(projectName, workers){
    this.projectName = projectName;
    this.workers = workers;
    
    Object.defineProperties(this, 'workers',{
        get: function(){
            return this.workers;
        },
        set: function(workers){
            this.workers = workers;
        }
    });
}    
Project.prototype.obtenerTodosLosTrabajadores = function(){
    let lista_trabajadores = this.trabajadores;
    for (let i = 0; i < lista_trabajadores.length; i++) {
        const element = array[i];
    }
}

const trabajador1 = new Worker(nameworker.value,rut.value,corporateJob.value)
const trabajador2 = new Worker('Pedrito','1234','operador')
const trabajador3 = new Worker('jorgito','1235','jefe')


const project1 = new Project('impresion de poleras', [trabajador1,
 trabajador2, trabajador3])

console.log('trabajador: ', project1.obtenerTodosLosTrabajadores())



