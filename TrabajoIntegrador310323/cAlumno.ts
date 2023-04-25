import IPersona from "./iPersona";
const {v4: uuidv4} = require ('uuid');
export default class Alumno implements IPersona{
    nombre: string;
    apellido:string;
    iD:string;
    materias:any[]
     
    constructor(nombre:string,apellido:string, materias:any[]){
        this.nombre=nombre;
        this.apellido=apellido;
        this.iD= uuidv4().slice(0,5)
        this.materias= materias;
      }
      getPromedio(){/*recorro array materias y sumo las notas, guardando en variable adicional. Luego divido eso por matarias.length*/
      let asignatura :any[]= []
      for(let i=0 ; this.materias.length;i++) 
      asignatura.push(i)
      console.log(asignatura);
      
    }}
  
      /*let sumaNota= arrNotas.reduce((acc,notaMatInsc)=> acc + notaMatInsc,0)
  console.log(sumaNota);           
  let promedio = sumaNota/arrNotas.length
  console.log(promedio);
  {
    "nombre": "juana",
    "apellido": "de arco",
    "iD": "53cf2",
    "materias": [
    {"materia": "matematica",
     "nota": "5"},
      "literatura",
      "historia"
    ],
    "notas": [
      5,
      6,
      8
    ],
    "promedio": 6.333333333333333
  }*/
   /*const respuesta:any[]= []
    respuesta.push({
      materia: "historia",
      profesor: "fulanito"
    })
}*/

