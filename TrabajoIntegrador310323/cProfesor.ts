import IPersona from "./iPersona";
const {v4: uuidv4} = require ('uuid');
export default class Profesor implements IPersona{
    public nombre:string;
    public apellido:string;
    public iD:string;
    public materiaAsignada: string;

    public constructor(nombre:string,apellido:string,materiaAsignada:string){
        this.nombre=nombre,
        this.apellido=apellido
        this.iD=uuidv4().slice(0,5)
        this.materiaAsignada=materiaAsignada
    }
}