/*4- Generar una clase que maneje el club, GestorClub, que deberá permitirnos la persistencia de nuestros datos. 
Usaremos filesystem para crear un archivo JSON donde guardaremos nuestros socios.
Tambien usaremos el paquete readlineSync para pedir por consola los datos que necesitamos de nuestros socios.
Debemos guardar 10 socios.*/

const fs = require ('fs')
const readlineSync = require ('readline-sync')

import { Deporte, Jugador } from "./Jugador";
export default class GestorClub {
    constructor(){
        fs.writeFileSync('./socios.json', '[]');
    }
    data() { return JSON.parse(fs.readFileSync('./socios.json'))}

    agregarSocio(){
        let nombre = readlineSync.question('Escriba el nombre del socio: ');
        let apellido = readlineSync.question ('Escriba el apellido del socio: ');
        let fechaNac = readlineSync.question('Escriba la fecha de nacimiento del socio (en formato YYYY/MM/DD): ');
        let documento = readlineSync.question('Escriba el documento del socio: ');
        let telefono = readlineSync.question('Escriba el telefono del socio: ');
        let arrayDeporte = ["futbol", "basket", "zumba", "voley", "natacion", "gim"]
        let deporte = readlineSync.keyInSelect (arrayDeporte, 'Seleccione el deporte del socio: '); 

        let nuevoSocio = new Jugador (nombre, apellido, fechaNac, documento, telefono, deporte);

        let socios = [...this.data(), nuevoSocio];
        fs.writeFileSync('./socios.json', JSON.stringify (socios, null, 2));
    }

    buscarXNombre(nombre:string){
        let nombreSocio = this.data().find((socio: {nombre: string}) => socio.nombre === nombre)
        console.log(nombreSocio);
        return nombreSocio;        
    }

    buscarXDeporte(deporte:Deporte){
        let deporteSocio = this.data().find((socio: {deporte: Deporte}) => socio.deporte === deporte)
        console.log(deporteSocio);
        return deporteSocio;        
    }

    buscarXApellido(apellido:string){
        let apellidoSocio = this.data().find((socio: {apellido: string}) => socio.apellido === apellido)
        console.log(apellidoSocio);
        return apellidoSocio;        
    }

    buscarXFechaNac(fechaNac:string){
        let fechaNacSocio = this.data().find((socio: {fechaNac: string}) => socio.fechaNac === fechaNac)
        console.log(fechaNacSocio);
        return fechaNacSocio;        
    }
        
}

