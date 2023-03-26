/*3 - Debemos implementar nuestra clase abstracta, para eso generaremos una clase llamada Jugador, 
que extiende nuestra clase MiembroClub.
Lo unico que debemos agregarle a esta nueva clase es un deporte.
Con enum generaremos un listado de deportes: futbol, basket, zumba, voley, natacion, gym.*/

export enum Deporte{
    futbol, basket, zumba, voley, natacion, gim
}

import { MiembroClub } from "./AbstMiembroClub";
export class Jugador extends MiembroClub {
    deporte: Deporte;

    constructor (nombre:string, apellido:string, fechaNac:string, documento:number, telefono:number, deporte:Deporte){
        super(nombre, apellido, fechaNac, documento, telefono)
        this.deporte= deporte;
    }
}