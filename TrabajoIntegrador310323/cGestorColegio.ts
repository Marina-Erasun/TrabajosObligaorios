import Profesor from "./cProfesor";
import Alumno from "./cAlumno";
//import {Materia,Asignatura} from "./cMateria"
import { Materia } from "./cMateria";
const {guardar,leer,check,escribir} = require ('./formulas.ts')
const fs =require('fs')
const readlineSync=require('readline-sync')
export default class GestorColegio {
    nombre: string;
    constructor(nombre:string){
        this.nombre=nombre;
    }

    dataAlumno(){return JSON.parse(fs.readFileSync('./Archivos-Json/Alumnos.json'))}
    dataProfesor(){return JSON.parse(fs.readFileSync('./Archivos-Json/Profesor.json'))}
   
    matricularAlumno(){
    let nombre:string = readlineSync.question('Escriba el nombre del alumno: ').toLocaleLowerCase();
    let apellido:string = readlineSync.question('Escriba el apellido del alumno: ').toLocaleLowerCase();
    let cantMatInsc= Number(readlineSync.question('¿A cuantas meterias se quiere anotar (maximo 8 materias)?: '))
    let materias=["matematica","literatura","historia","geografia","biologia","fisica","ingles","edFisica"]
    let arrMat : string[]= [];
    let arrNotas : number[]= [];
      for (let i = 0; i < cantMatInsc; i++) {
          let matInsc= readlineSync.keyInSelect(materias,"a cuales de las materias existentes se quiere inscribir");
          let notaMatInsc= Number(readlineSync.question('¿Que nota saco?: '))
          let asignInsc:string = materias[matInsc];
          arrMat.push(asignInsc)
          arrNotas.push(notaMatInsc)
          console.log(asignInsc);
          console.log(arrMat);
          //console.log(matInsc);
          }  
   let sumaNota= arrNotas.reduce((acc,notaMatInsc)=> acc + notaMatInsc,0)
   console.log(sumaNota);           
   let promedio = sumaNota/arrNotas.length
   console.log(promedio);
   let newAlumno = new Alumno(nombre,apellido,arrMat,arrNotas,promedio);
   let pathAlumno = './Archivos-Json/Alumnos.json'
   guardar (pathAlumno,newAlumno)
}

consultarAlumno(iD:string = readlineSync.question('Escriba el iD del alumno: ')){
  let alumnoEncontrado=this.dataAlumno().find((alumno: Alumno)=>alumno.iD === iD);
  if(alumnoEncontrado){
    console.log(iD, 'existe en el gestor colegio', alumnoEncontrado)
    return alumnoEncontrado
  }else{
    console.log(iD , 'No existe en el gestor colegio')
  }
}

modificarAlumno(iD:string = readlineSync.question('Escriba el iD del alumno: ')){
  let pathAlumno = './Archivos-Json/Alumnos.json'
  let alumnoModificar=this.consultarAlumno(iD)
  if(alumnoModificar){
    let dato=readlineSync.question('Escriba el nuevo nombre del alumno: ')
    let nAlumno= alumnoModificar=dato
    console.log(nAlumno);
    guardar(pathAlumno,nAlumno)
      //guardar (pathAlumno,alumnoModificar)------ crea un "nuevo" alumno con iD modificado, no modifica el id del existente
    console.log('El id' ,iD, 'ha sido modificado y ahora se llama', dato)
    return this.dataAlumno()
    //return dato
      //--------------------------- ver porque no guarda el dato modificado.--------------------------------
  }else{
    console.log(iD , 'No existe en el gestor colegio')
  }
}

eliminarAlumno(iD:string = readlineSync.question('Escriba el iD del alumno: ')){
  let alumnoEncontrado=this.dataAlumno().findIndex((alumno:Alumno )=>alumno.iD === iD);
  if(alumnoEncontrado >= 0){
    this.dataAlumno().slice(alumnoEncontrado, 1)
    console.log('Alumno eliminado', iD);
    console.log(this.dataAlumno);
    let pathAlumno = './Archivos-Json/Alumnos.json'
    guardar (pathAlumno,iD)
    return this.dataAlumno();
  }else{
    console.log('Alumno', iD , 'no ha sido eliminado')
  }}

agregarProfesor(){
    let nombre:string = readlineSync.question('Escriba el nombre del profesor: ').toLocaleLowerCase();
    let apellido:string = readlineSync.question('Escriba el apellido del profesor: ').toLocaleLowerCase();
    let arrayMat=["matematica","literatura","historia","geografia","biologia","fisica","ingles","edFisica"]
    let materiaAsignada= readlineSync.keyInSelect(arrayMat,"¿que materia dicta?: ")
    let asign:string = arrayMat[materiaAsignada];
    console.log(asign);
    let newProfesor = new Profesor (nombre,apellido,asign)
    let pathProfesor = './Archivos-Json/Profesor.json'
    guardar (pathProfesor,newProfesor)   
  }

consultarProfesor(iD:string = readlineSync.question('Escriba el iD del profesor: ')){
    let profesorEncontrado=this.dataProfesor().find((profesor:Profesor)=> profesor.iD === iD);
    if(profesorEncontrado){
      console.log(iD, 'existe en el gestor colegio', profesorEncontrado)
      return profesorEncontrado
    }else{
      console.log(iD , 'No existe en el gestor colegio')
    }
  }
  modificarProfesor(iD:string = readlineSync.question('Escriba el iD del profesor: ')){
    let pathProfesor = './Archivos-Json/Profesor.json'
    let profesorModificar=this.consultarAlumno(iD)
    if(profesorModificar){
      let dato=readlineSync.question('Escriba el nuevo nombre del alumno: ')
      let nProfesor= profesorModificar=dato
      console.log(nProfesor);
      guardar(pathProfesor,nProfesor)
        //guardar (pathAlumno,alumnoModificar)------ crea un "nuevo" alumno con iD modificado, no modifica el id del existente
      console.log('El id' ,iD, 'ha sido modificado y ahora se llama', dato)
      return this.dataProfesor()
      //return dato
        //--------------------------- ver porque no guarda el dato modificado.--------------------------------
    }else{
      console.log(iD , 'No existe en el gestor colegio')
    }
  }
  eliminarProfesor(iD:string = readlineSync.question('Escriba el iD del profesor: ')){
    let profesorEncontrado=this.dataProfesor().findIndex((profesor:Profesor)=>profesor.iD === iD);
    if(profesorEncontrado >= 0){
      this.dataProfesor().slice(profesorEncontrado, 1)
      console.log('Profesor eliminado', iD);
      console.log(this.dataProfesor);
      return this.dataProfesor;
    }else{
      console.log('Profesor', iD , 'no ha sido eliminado')
    }
  }
  listAlumnos(){
    let direccionA = this.dataAlumno()
    let alumnos = JSON.stringify(direccionA,null,2);
    console.log(alumnos);
  }    
  listProfesores(){
    let direccionP = this.dataProfesor()
    let profesores = JSON.stringify(direccionP,null,2);
    console.log(profesores);
  }   

  mostrarProfYAlumno(/*nombreMateria:string = readlineSync.question('Escriba el nombre de la materia: ')*/){
   let ruta ='./Archivos-Json/Alumnos.json'
    let alumnos = leer(ruta)
    /*console.log(alumnos)
    let materiaAlumno= alumnos.filter((materias:Alumno)=>materias.nombre===nombreMateria)
    console.log(materiaAlumno);*/
    /*let data = fs.readFileSync('./Archivos-Json/Alumnos.json');
    console.log(data);
    let personas = JSON.parse(data);
    console.log(personas);
    let person={} =JSON.stringify(personas,null,2)
    console.log(person);
    let materiaAlumno= personas.includes((materias:Alumno)=>materias.nombre===nombreMateria);
    console.log(materiaAlumno);
  }*/
   
}
}