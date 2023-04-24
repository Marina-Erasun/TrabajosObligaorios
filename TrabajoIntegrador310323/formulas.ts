/*formula para incluir materia en materia
matricularAlumnoAMateria(nombre:string;curso:number,profesor:string){
    let materia= new Materia(nombre,profesor);
    this.materia.push(materia)
}
en constructor poner:
this.promedio=Number(this.calcularPromedio());
calcularpromedio(){
    const sum= this.materia.reduce((acumulador,materia)=>acumulador+materia.curso,0);
    this.promedio=sum/this.materias.length;
    return this.promedio
}
*/

const fs = require('fs')

//Revisar si el archivo en el que vamos a escribir existe
function check(path:any){
    if (fs.existsSync(path)){
        console.log('existe');
        return true
    }
    else { console.log('no existe')
    return false }
}
function escribir(data:any, path:any){
   return fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
function leer(path:any){
    try {
        if(check(path)){
            let result = JSON.parse(fs.readFileSync(path))
            console.log(result);
            return result
        }
    } catch (error) {
        console.log(error);
    }
}
function guardar(path:any, data:any) {
    if (check(path)){
        let dataToSave =  [...leer(path), data];
        console.log(leer(path), 'leyendo...')
        return escribir(dataToSave, path)
    } else {
        
        console.log('creando...');
        return escribir([data], path);
    }
    }
    

module.exports = {check, escribir, leer, guardar}

