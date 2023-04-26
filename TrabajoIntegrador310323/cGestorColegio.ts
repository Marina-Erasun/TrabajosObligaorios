import Profesor from "./cProfesor";
import Alumno from "./cAlumno";
const { guardar, leer, check, escribir } = require("./formulas.ts");
const fs = require("fs");
const readlineSync = require("readline-sync");

export default class GestorColegio {
  public nombre: string;
  public constructor(nombre: string) {
    this.nombre = nombre;
  }

  public dataAlumno() {
    return JSON.parse(fs.readFileSync("./Archivos-Json/Alumnos.json"));
  }
  public dataProfesor() {
    return JSON.parse(fs.readFileSync("./Archivos-Json/Profesor.json"));
  }
  //Genera un nuevo alumno indicando su nombre/apellido/cantidad materias a inscribirse y sus respectivas notas.
  public matricularAlumno() {
    let nombre: string = readlineSync
      .question("Escriba el nombre del alumno: ")
      .toLocaleLowerCase();
    let apellido: string = readlineSync
      .question("Escriba el apellido del alumno: ")
      .toLocaleLowerCase();
    let cantMatInsc = Number(
      readlineSync.question(
        "¿A cuantas meterias se quiere anotar (maximo 8 materias)?: "
      )
    );
    let materias = [
      "matematica",
      "literatura",
      "historia",
      "geografia",
      "biologia",
      "fisica",
      "ingles",
      "edFisica",
    ];
    let arrMat: any[] = [];
    for (let i = 0; i < cantMatInsc; i++) {
      let matInsc = readlineSync.keyInSelect(
        materias,
        "a cuales de las materias existentes se quiere inscribir"
      );
      let notaMatInsc = Number(readlineSync.question("¿Que nota saco?: "));
      arrMat.push({ materia: materias[matInsc], nota: notaMatInsc });
    }
    let newAlumno = new Alumno(nombre, apellido, arrMat);
    let pathAlumno = "./Archivos-Json/Alumnos.json";
    guardar(pathAlumno, newAlumno);
  }
  //Verifica la existencia del alumno al buscar el iD una vez encontrado lo devuelve
  public consultarAlumno(
    iD: string = readlineSync.question("Escriba el iD del alumno: ")
  ) {
    let alumnoEncontrado = this.dataAlumno().find(
      (alumno: Alumno) => alumno.iD === iD
    );
    if (alumnoEncontrado) {
      console.log(iD, "existe en el gestor colegio", alumnoEncontrado);
      return alumnoEncontrado;
    } else {
      console.log(iD, "No existe en el gestor colegio");
    }
  }

  //modifica al alumno buscado, en la propiedad que se le indica e incorpora el valor que se le asigne con dicho cambio
  public modificarAlumno(
    iD: string = readlineSync.question("Escriba el iD del alumno: "),
    prop: string = readlineSync.question("Escriba la propiedad del alumno: "),
    valorAct: string = readlineSync.question(
      "Escriba la actualización del alumno: "
    )
  ) {
    let listadoAlumno = this.dataAlumno();
    let modificarAlumno = listadoAlumno.find(
      (alumno: Alumno) => alumno.iD === iD
    );
    if (modificarAlumno) {
      console.log("encontró archivo");
      modificarAlumno[prop] = valorAct;
    } else {
      console.log("no se encontró archivo");
    }
    fs.writeFileSync(
      "./Archivos-Json/Alumnos.json",
      JSON.stringify(listadoAlumno)
    );
  }

  //Busca el alumno a través de su iD y al comprobar su existencia lo elimina
  public eliminarAlumno(
    iD: string = readlineSync.question("Escriba el iD del alumno: ")
  ) {
    let listadoAlumno = this.dataAlumno();
    let borrarAlumno = listadoAlumno.findIndex(
      (alumno: Alumno) => alumno.iD === iD
    );
    if (borrarAlumno >= 0) {
      listadoAlumno.splice(borrarAlumno, 1);
      console.log("Alumno eliminado", iD);
    } else {
      console.log("Alumno", iD, "no ha sido eliminado");
    }
    fs.writeFileSync(
      "./Archivos-Json/Alumnos.json",
      JSON.stringify(listadoAlumno)
    );
  }

  //Genera un nuevo profesor, consultando el nombre/apellido y la selección de la materia que dicta.
  public agregarProfesor() {
    let nombre: string = readlineSync
      .question("Escriba el nombre del profesor: ")
      .toLocaleLowerCase();
    let apellido: string = readlineSync
      .question("Escriba el apellido del profesor: ")
      .toLocaleLowerCase();
    let arrayMat = [
      "matematica",
      "literatura",
      "historia",
      "geografia",
      "biologia",
      "fisica",
      "ingles",
      "edFisica",
    ];
    let materiaAsignada = readlineSync.keyInSelect(
      arrayMat,
      "¿que materia dicta?: "
    );
    let asign: string = arrayMat[materiaAsignada];
    console.log(asign);
    let newProfesor = new Profesor(nombre, apellido, asign);
    let pathProfesor = "./Archivos-Json/Profesor.json";
    guardar(pathProfesor, newProfesor);
  }

  //Busca el iD del profesor y luego modifica al mismo en la propiedad que se le indique, incorporando lo que indica el usuario
  public modificarProfesor(
    iD: string = readlineSync.question("Escriba el iD del profesor: "),
    prop: string = readlineSync.question("Escriba la propiedad del profesor: "),
    valorAct: string = readlineSync.question(
      "Escriba la actualización del profesor: "
    )
  ) {
    let listadoProfesores = this.dataProfesor();
    let modificarProfesor = listadoProfesores.find(
      (profesor: Profesor) => profesor.iD === iD
    );
    if (modificarProfesor) {
      console.log("encontró archivo");
      modificarProfesor[prop] = valorAct;
    } else {
      console.log("no se encontró archivo");
    }
    fs.writeFileSync(
      "./Archivos-Json/Profesor.json",
      JSON.stringify(listadoProfesores)
    );
  }

  //Busca el profesor a traves del iD y devuelve si este existe o no en el archivo Profesor.json.
  public consultarProfesor(
    iD: string = readlineSync.question("Escriba el iD del profesor: ")
  ) {
    let profesorEncontrado = this.dataProfesor().find(
      (profesor: Profesor) => profesor.iD === iD
    );
    if (profesorEncontrado) {
      console.log(iD, "existe en el gestor colegio", profesorEncontrado);
      return profesorEncontrado;
    } else {
      console.log(iD, "No existe en el gestor colegio");
    }
  }
  //Busca el profesor a través del iD y si éste existe, procede a eliminarlo.
  public eliminarProfesor(
    iD: string = readlineSync.question("Escriba el iD del profesor: ")
  ) {
    let listadoProfesores = this.dataProfesor();
    let borrarProfesor = listadoProfesores.findIndex(
      (profesor: Profesor) => profesor.iD === iD
    );
    if (borrarProfesor >= 0) {
      listadoProfesores.splice(borrarProfesor, 1);
      console.log("Profesor eliminado", iD);
    } else {
      console.log("Profesor", iD, "no ha sido eliminado");
    }
    fs.writeFileSync(
      "./Archivos-Json/Profesor.json",
      JSON.stringify(listadoProfesores)
    );
  }
  //Lista la totalidad de los alumnos
  public listAlumnos() {
    let direccionA = this.dataAlumno();
    let alumnos = JSON.stringify(direccionA, null, 2);
    console.log(alumnos);
  }
  //Lista la totalidad de los profesores
  public listProfesores() {
    let direccionP = this.dataProfesor();
    let profesores = JSON.stringify(direccionP, null, 2);
    console.log(profesores);
  }
  //Listar Alumnos por Profesor
  public listarAlumnosXProfesor(
    iD: string = readlineSync.question("Escriba el iD del profesor: ")
  ) {
    let rutaB = "./Archivos-Json/Profesor.json";
    let profesores = JSON.parse(fs.readFileSync(rutaB));
    let profesor = profesores.find((profe: Profesor) => profe.iD === iD);
    if (!profesor) {
      console.log("El profesor con ID " + iD + " no existe");
    } else {
      console.log(
        "El profesor con ID " + iD + " existe. Se llama: ",
        profesor.nombre,
        profesor.apellido
      );
      let materiaProfesor = profesor.materiaAsignada;
      console.log("y dicta la materia: " + materiaProfesor);
      let rutaA = "./Archivos-Json/Alumnos.json";
      let alumnos = JSON.parse(fs.readFileSync(rutaA));
      let alumnosMateria = alumnos.filter((alumno: Alumno) =>
        alumno.materias
          .map((m) => {
            return m.materia;
          })
          .includes(materiaProfesor)
      );
      let alumnosJson = JSON.stringify(alumnosMateria, null, 2);
      console.log("Los alumnos son: ", alumnosJson);
    }
  }
  //Listar Profesores por Alumno
  public listarProfesoresXAlumno(
    iD: string = readlineSync.question("Escriba el iD del alumno: ")
  ) {
    let rutaA = "./Archivos-Json/Alumnos.json";
    let alumnos = JSON.parse(fs.readFileSync(rutaA));
    let alumno = alumnos.find((escolar: any) => escolar.iD === iD);
    if (!alumno) {
      console.log("El alumno con ID " + iD + " no existe");
    } else {
      console.log(
        "El alumno con ID",
        iD,
        "existe. Se llama: ",
        alumno.nombre,
        alumno.apellido,
        ".Sus profesores son: "
      );
      let materiaAlumno = alumno.materias;
      let rutaB = "./Archivos-Json/Profesor.json";
      let profesores = JSON.parse(fs.readFileSync(rutaB));
      for (let i = 0; i < materiaAlumno.length; i++) {
        let materia = materiaAlumno[i];
        let profesor = profesores.filter(
          (profe: Profesor) => profe.materiaAsignada == materia.materia
        );
        console.log(
          "El profesor de:",
          profesor[0].materiaAsignada,
          ", se llama: " + profesor[0].nombre + " " + profesor[0].apellido
        );
      }
    }
  }
  //Lista el alumno indicado por parámetro
  public listUnAlumno(
    iD: string = readlineSync.question("Escriba el iD del alumno: ")
  ) {
    let alumnoEncontrado = this.dataAlumno().find(
      (alumno: Alumno) => alumno.iD === iD
    );
    if (alumnoEncontrado) {
      console.log(iD, "existe en el gestor colegio", alumnoEncontrado);
      return alumnoEncontrado;
    } else {
      console.log(iD, "No existe en el gestor colegio");
    }
  }
  //Lista el profesor indicado por parámetro
  public listUnProfesor(
    iD: string = readlineSync.question("Escriba el iD del profesor: ")
  ) {
    let profesorEncontrado = this.dataProfesor().find(
      (profesor: Profesor) => profesor.iD === iD
    );
    if (profesorEncontrado) {
      console.log(iD, "existe en el gestor colegio", profesorEncontrado);
      return profesorEncontrado;
    } else {
      console.log(iD, "No existe en el gestor colegio");
    }
  }
  //Calcula el promedio del alumno que se indique.
  public calcularPromedioAlumno(
    iD: string = readlineSync.question("Escriba el iD del alumno: ")
  ) {
    let rutaA = "./Archivos-Json/Alumnos.json";
    let alumnos = JSON.parse(fs.readFileSync(rutaA));
    let alumno = alumnos.find((escolar: Alumno) => escolar.iD === iD);
    if (!alumno) {
      console.log("El alumno con ID " + iD + " no existe");
    } else {
      let nA = new Alumno(alumno.nombre, alumno.apellido, alumno.materias);
      console.log(nA.getPromedio());
    }
  }
  //Lista todos los promedios de alumnos.
  public listadoPromedios() {
    const rutaA = "./Archivos-Json/Alumnos.json";
    const alumnos = JSON.parse(fs.readFileSync(rutaA));
    for (let i = 0; i < alumnos.length; i++) {
      let suma = 0;
      for (let j = 0; j < alumnos[i].materias.length; j++) {
        suma += alumnos[i].materias[j].nota;
      }
      const promedio = suma / alumnos[i].materias.length;
      console.log(
        "El promedio del alumno: ",
        alumnos[i].nombre,
        alumnos[i].apellido,
        "es: ",
        promedio
      );
    }
  }
  public menuGestor() {
    let opcionesMenu = [
      "Matricular Alumno",
      "Consultar Alumno",
      "Modificar Alumno",
      "Eliminar Alumno",
      "Agregar Profesor",
      "Modificar Profesor",
      "Consultar Profesor",
      "Eliminar Profesor",
      "Listar la totalidad de alumnos",
      "Listar la totalidad de profesores",
      "Listar alumnos por profesor",
      "Listar profesores por alumno",
      "Listar por alumno",
      "Listar por profesor",
      "Listar el promedio de un alumno",
      "Listar promedios alumnos",
    ];
    let selecMenu = readlineSync.keyInSelect(
      opcionesMenu,
      "seleccione la opcion deseada"
    );
    switch (selecMenu + 1) {
      case 1:
        console.log("opt 1: Matricular Alumno");
        this.matricularAlumno();
        break;
      case 2:
        console.log("opt 2: consultar Alumno");
        this.consultarAlumno();
        break;
      case 3:
        console.log("opt 3: modificar Alumno");
        this.modificarAlumno();
        break;
      case 4:
        console.log("opt 4: Eliminar Alumno");
        this.eliminarAlumno();
        break;
      case 5:
        console.log("opt 5: Agregar Profesor");
        this.agregarProfesor();
        break;
      case 6:
        console.log("opt 6: Modificar Profesor");
        this.modificarProfesor();
        break;
      case 7:
        console.log("opt 7: Consultar Profesor");
        this.consultarProfesor();
        break;
      case 8:
        console.log("opt 8: Eliminar Profesor");
        this.eliminarProfesor();
        break;
      case 9:
        console.log("opt 9: Listar la totalidad de alumnos");
        this.listAlumnos();
        break;
      case 10:
        console.log("opt 10: Listar la totalidad de profesores");
        this.listProfesores();
        break;
      case 11:
        console.log("opt 11: Listar alumnos por profesor");
        this.listarAlumnosXProfesor();
        break;
      case 12:
        console.log("opt 12: Listar profesores por alumno");
        this.listarProfesoresXAlumno();
        break;
      case 13:
        console.log("opt 13: Listar por alumno");
        this.listUnAlumno();
        break;
      case 14:
        console.log("opt 14: Listar por profesor");
        this.listUnProfesor();
        break;
      case 15:
        console.log("opt 15: Listar el promedio de un alumno");
        this.calcularPromedioAlumno();
        break;
      case 16:
        console.log("opt 16: Listar promedios alumnos");
        this.listadoPromedios();
        break;
      default:
        console.log("no has elegido un valor correcto, vuelve a intentar");
        break;
    }
    this.menuGestor();
  }
}
