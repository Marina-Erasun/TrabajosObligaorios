import { users } from "./user.js";
const user = JSON.parse(users);
const tabla = document.getElementById("tabla");

user.forEach(el => {
  const fila = document.createElement('tr');

  const celdaNombre = document.createElement('td');
  celdaNombre.textContent = el.name.first;
  fila.appendChild(celdaNombre);

  const celdaApellido = document.createElement('td');
  celdaApellido.textContent = el.name.last;
  fila.appendChild(celdaApellido);

  const celdaDireccionNombre = document.createElement('td');
  celdaDireccionNombre.textContent = el.location.street.name;
  fila.appendChild(celdaDireccionNombre);

  const celdaDireccionNumero = document.createElement('td');
  celdaDireccionNumero.textContent = el.location.street.number;
  fila.appendChild(celdaDireccionNumero);

  const celdaImagen = document.createElement('td');
  const imagen = document.createElement('img');
  imagen.src = el.picture.thumbnail;
  celdaImagen.appendChild(imagen);
  fila.appendChild(celdaImagen);
  
  tabla.appendChild(fila);
    
});

