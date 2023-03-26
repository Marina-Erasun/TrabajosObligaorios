/*2- Generar una clase abstracta llamada MiembroClub, que implemente la interface persona.
Agregar a esta clase abstracta la variable: miembroDesde que es de tipo string. Y representa 
la fecha de alta del socio.*/

import IPersona from './IPersona'
export abstract class MiembroClub implements IPersona{
    nombre: string;
    apellido: string;
    fechaNac: string;
    documento: number;
    telefono: number;
    miembroDesde: string;

    constructor (nombre:string, apellido:string, fechaNac:string, documento:number, telefono:number){
        this.nombre=nombre;
        this.apellido=apellido
        this.fechaNac= new Date(fechaNac).toLocaleDateString();
        this.documento=documento
        this.telefono=telefono
        this.miembroDesde= new Date ().toLocaleDateString();
    }
}