const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
function handleSubmit() {
  const user = new FormData(form);
  console.log(user.get("fullName"));
}
const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", () => {
  modal.close();
});
openModal.addEventListener("click", () => {
  modal.showModal();
  addOne();
});

const BASE_URL = "https://647a6c2ad2e5b6101db05795.mockapi.io/users";
//get all resources
function getAll(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla");
      data.forEach(dato => {
        const fila = document.createElement('tr');

        const celdaId = document.createElement('td');
        celdaId.textContent = dato.id;
        fila.appendChild(celdaId);
        
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = dato.name;
        fila.appendChild(celdaNombre);

        const celdaMail = document.createElement('td');
        celdaMail.textContent = dato.email;
        fila.appendChild(celdaMail);

        const celdaTelefono = document.createElement('td');
        celdaTelefono.textContent = dato.telefono;
        fila.appendChild(celdaTelefono);

        const celdaOpciones = document.createElement('td');

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
          deleteOne(dato.id);
          fila.remove();
        });
        celdaOpciones.appendChild(btnEliminar);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => {
        updateOne(dato.id);
        });
        celdaOpciones.appendChild(btnEditar);

        fila.appendChild(celdaOpciones);

        tabla.appendChild(fila);
      });
    })
    .catch(err => console.error(err));
}
//get resource by id
function getOne(id) {
  fetch(BASE_URL + `/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
//delete one
function deleteOne(id) {
  fetch(BASE_URL + `/${id}`, {
    method: "DELETE",
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function addOne() {
  const fullNameInput = document.getElementById("fullName");
  const mailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("phone");

  const fullName = fullNameInput.value;
  const email = mailInput.value;
  const telefono = telefonoInput.value;

  const data = {
    fullName: fullName,
    email: email,
    telefono: telefono,
  };
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

function updateOne(id) {
  const fullNameInput = document.getElementById("fullName");
  const mailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("phone");

  const fullName = fullNameInput.value;
  const email = mailInput.value;
  const telefono = telefonoInput.value;

  const data = {
    fullName: fullName,
    email: email,
    telefono: telefono,
  };
  fetch(BASE_URL + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

getAll(BASE_URL)
