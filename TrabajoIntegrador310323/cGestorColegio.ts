import Profesor from "./cProfesor";
import Alumno from "./cAlumno";
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
let arrMat : any[]= [];
for (let i = 0; i < cantMatInsc; i++) {
    let matInsc= readlineSync.keyInSelect(materias,"a cuales de las materias existentes se quiere inscribir");
    let notaMatInsc= Number(readlineSync.question( `¿Que nota saco en ${arrMat[i]}  ?: `));
    arrMat.push({materia:materias[matInsc],nota:notaMatInsc})
    }
  let newAlumno = new Alumno(nombre,apellido,arrMat);
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
  listaAlumnosXProfesor(nombreMateria:string = readlineSync.question('Escriba el nombre de la materia: ')){
    let rutaA ='./Archivos-Json/Alumnos.json';
    let rutaB ='./Archivos-Json/Profesor.json';
    let profesores =  JSON.parse(fs.readFileSync(rutaB))
    let materiaProfesor= profesores.filter((materiaAsignada:Profesor)=>materiaAsignada.materiaAsignada.includes(nombreMateria)); 
    let profesorJson= JSON.stringify(materiaProfesor,null,2)
    console.log(profesorJson);
    let alumnos = JSON.parse(fs.readFileSync(rutaA))
    let materiaAlumno= alumnos.filter((materias:Alumno)=>materias.materias.includes(nombreMateria)); 
    let alumnoJson= JSON.stringify(materiaAlumno,null,2)
    console.log(alumnoJson);
   }
   listarAlumnosXProfesor(iD: string = readlineSync.question('Escriba el iD del profesor: ')) {
      let rutaB = './Archivos-Json/Profesor.json';
      let profesores = JSON.parse(fs.readFileSync(rutaB));
      let profesor = profesores.find((profe: Profesor) => profe.iD === iD);
      if (!profesor) {
        console.log('El profesor con ID ' + iD + ' no existe');
        return;
      }
      console.log('El profesor con ID ' + iD + ' existe' );    
      let materiaProfesor = profesor.materiaAsignada;
      console.log('y dicta la materia:'+ materiaProfesor);
      let rutaA = './Archivos-Json/Alumnos.json';
      let alumnos = JSON.parse(fs.readFileSync(rutaA));
      let alumnosMateria = alumnos.filter((alumno:any) => alumno.materias.includes(materiaProfesor));
      let alumnosJson = JSON.stringify(alumnosMateria, null, 2);
      console.log(alumnosJson);
      return;
    }
  
   listarProfesoresXAlumno(iD:string= readlineSync.question('Escriba el iD del alumno: ')){
    let rutaA = './Archivos-Json/Alumnos.json';
    let alumnos = JSON.parse(fs.readFileSync(rutaA));
    let alumno = alumnos.find((escolar: any) => escolar.iD === iD);
    if (!alumno) {
      console.log('El alumno con ID ' + iD + ' no existe');
      return;
    }else{
      let materiaAlumno=alumno.materias;
      console.log("las materias del alumno son: " + materiaAlumno);
      for (let i = 0; i < materiaAlumno.length; i++) {
        let materia = materiaAlumno[i];
        console.log("Materia: " + materia);
      let rutaB = './Archivos-Json/Profesor.json';
      let profesores = JSON.parse(fs.readFileSync(rutaB));
      let profesoresMateria = profesores.filter((profeMat: any) => profeMat.materiaAsignada.includes(materia));
      for (let j = 0; j < profesoresMateria.length; j++) {
        let profesor = profesoresMateria[j];
        console.log('El profesor de:', profesor.materiaAsignada, " se llama: "+ profesor.nombre + " " +profesor.apellido);
    }
  }  
}  
}    
 }
