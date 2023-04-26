import IPersona from "./iPersona";
const { v4: uuidv4 } = require("uuid");
export default class Alumno implements IPersona {
  public nombre: string;
  public apellido: string;
  public iD: string;
  public materias: any[];
  public constructor(nombre: string, apellido: string, materias: any[]) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.iD = uuidv4().slice(0, 5);
    this.materias = materias;
  }
  public getPromedio(): number {
    let suma = 0;
    for (let i = 0; i < this.materias.length; i++) {
      suma += this.materias[i].nota;
    }
    if (this.materias.length == 0) return -1;
    return suma / this.materias.length;
  }
}