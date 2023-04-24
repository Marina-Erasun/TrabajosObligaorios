import Alumno from "./cAlumno";
import Profesor from "./cProfesor";
export enum Asignatura {
    matematica,literatura,historia,geografia,biologia,fisica,ingles,edFisica
  }
export class Materia{
    nombre:Asignatura;
    //alumnos:Alumno[];
    //profesor:Profesor
    //promedios:number[]

    constructor(nombre:Asignatura,profesor:Profesor){
        this.nombre= nombre;
        //this.alumnos=[];
        //this.profesor=profesor;
        //this.promedios=[]
    }
 }