let rotulo1= document.getElementById("rotulo1");
let rotulo2= document.getElementById("rotulo2");
let rotulo3= document.getElementById("rotulo3");
let rotulo4= document.getElementById("rotulo4");
let rotulo5= document.getElementById("rotulo5");
let btnEnv= document.getElementById ("btnEnv");
let dato1 = document.getElementById ("dato1");
let dato2 = document.getElementById ("dato2");
let dato3 = document.getElementById ("dato3");
let dato4 = document.getElementById ("dato4");

const resultado = document.getElementById('rotulo5');

btnEnv.addEventListener ("click", () => {
    let a = Number(dato1.value);
    let b = Number(dato2.value);
    let opcion = dato3.value;

    function calcular(a,b,cb){
        const result = cb(a,b);
        return result;
    }

function sumar (a,b){
    return a+b;
}

function restar (a,b){
    return a-b;
}

function multiplicar (a,b){
    return a*b;
}

function dividir (a,b){
    return a/b;
}

switch (opcion) {
    case 'sumar':
      result = calcular(a, b, sumar);
      break;
    case 'restar':
      result = calcular(a, b, restar);
      break;
    case 'multiplicar':
      result = calcular(a, b, multiplicar);
      break;
    case 'dividir':
      result = calcular(a, b, dividir);
      break;
    default:
      result = "Opción no válida";
  }
  rotulo5.innerText= result;
}); 

//console.log(calcular(5,2,dividir));