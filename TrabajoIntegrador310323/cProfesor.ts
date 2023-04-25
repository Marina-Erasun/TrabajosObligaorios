import IPersona from "./iPersona";
const {v4: uuidv4} = require ('uuid');
export default class Profesor implements IPersona{
    nombre:string;
    apellido:string;
    iD:string;
    materiaAsignada: string;
    
    constructor(nombre:string,apellido:string,materiaAsignada:string){
        this.nombre=nombre,
        this.apellido=apellido
        this.iD=uuidv4().slice(0,5)
        this.materiaAsignada=materiaAsignada
      }
    }