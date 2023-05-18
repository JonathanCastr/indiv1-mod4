const {userForm, workerNameInput, rutInput, jobInput} = window;

//const worker1=new Worker(workerNameInput.value, rutInput.value, jobInput.value);

function Worker(workerName,rut,corporateJob){
    this.workerName=workerName;
    this.rut=rut;
    this.corporateJob=corporateJob;

}

function Project(name_project, workers){
 this.name_project = name_project;
//  this.workers = workers;
        
    }
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

const trabajador1 = new Worker('juanito','1233','operador')
const trabajador2 = new Worker('Pedrito','1234','operador')
const trabajador3 = new Worker('jorgito','1235','jefe')

const project1 = new Project('impresion de poleras', [trabajador1,
 trabajador2, trabajador3])

console.log('trabajador: ', project1.obtenerTodosLosTrabajadores())


