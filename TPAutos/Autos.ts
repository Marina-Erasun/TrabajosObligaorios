export class Autos{
    brand:string;
    model:string;
    year:number;
    colour:string;
    origin:string;
    owner:string;
    patent:string

    constructor(brand:string, model:string, year:number, colour:string, origin:string, owner:string, patent:string){
        this.brand=brand
        this.model=model
        this.year=year
        this.colour=colour
        this.origin=origin
        this.owner=owner
        this.patent=patent
    }
}

    export class RegistroAutomotor{
        registroAutomotor(buscador:any){
            console.log('Autos: ', buscador);
        }
    
    insertar(vehiculo: Autos, buscador: Autos[]){
        if(buscador.push(vehiculo)){
            console.log('Se ha añadido la patente', vehiculo.patent, ' a la base de datos', buscador);
        } else{
            console.log('El auto', vehiculo.patent, ' No se ha podido añadir al registro');
            
        }
    }

    consultar(patent: string, buscador: Autos[]){
        let vehiculoEncontrado = buscador.find(vehiculo => vehiculo.patent === patent )
        if(vehiculoEncontrado){
            console.log(patent, ' Existe en registro automotor', vehiculoEncontrado)
            return vehiculoEncontrado
        } else{
            console.log(patent, ' No existe en el registro');
            
        }
    }

    modificar(vehiculo: string, buscador: Autos[], dato: string){
        let vehiculoModificar = this.consultar(vehiculo, buscador)
        if(vehiculoModificar){
            vehiculoModificar.patent = dato;
            console.log('El auto', vehiculo, ' Ha sido modificado y ahora se llama ', dato);
        }
        else {
            console.log('El auto no se ha podido modificar');
            
        }
        
    }

    eliminar(patent: string, buscador: Autos[]): any {
        let vehiculoEncontrado = buscador.findIndex(vehiculo => vehiculo.patent == patent);
        if(vehiculoEncontrado >= 0){  
            buscador.splice(vehiculoEncontrado, 1)
            console.log('Auto eliminado', patent);
            console.log(buscador);
            return buscador;
        } else {

         console.log('Auto ', patent, 'no ha sido eliminado');
        }
    }
}
 const vehiculo0 = new Autos('ford', 'ka', 2012, 'negro', 'Brasil', 'Pepe', 'LYO619')
 const vehiculo1 = new Autos('chevrolet', 'celta', 2011, 'rojo', 'EEUU', 'Juan', 'LAA119')
 const vehiculo2 = new Autos('toyota', 'hilux', 2014, 'gris', 'Japon', 'Marina', 'ERA563')
 const vehiculo3 = new Autos('volkswagen', 'amarok', 2019, 'azul', 'Austria', 'Pedro', 'ZYR815')
 const vehiculo4 = new Autos('fiat', 'cronos', 2022, 'blanco', 'Italia', 'Gabriela', 'GHYP846')
 
const listado : Autos[]= [vehiculo0,vehiculo1,vehiculo2,vehiculo3,vehiculo4]
 const registro = new RegistroAutomotor
 const vehiculo5 = new Autos ('Ford', 'focus', 2011, 'negro', 'Brasil', 'Mario', 'AFA022')
// registro.insertar(vehiculo5, listado)
 //registro.consultar('LYO619', listado)
 registro.modificar('LYO619', listado, 'LYO618')
 //registro.eliminar('LYO619', listado)

 //registro.registroAutomotor(listado)

 import * as fs from "fs";
 const car:string[]= []
 const data = fs.readFileSync("./MoreAutos.json", "utf8")
 const carros= JSON.parse(data) 
 for(let i=0; i<carros.lenght;i++) {
   listado.push(carros[i]) 
 }
registro.insertar(carros,listado)
 
 