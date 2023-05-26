const divImg = document.createElement('div');
divImg.id = 'img';
document.body.appendChild(divImg);

async function fetchAndDisplayImages() {
  try {
    const response = await fetch('https://api.disneyapi.dev/character');
    const dato = await response.json();
    for (const resultados of dato.data) {
        const nameElement = document.createElement('p');
        nameElement.textContent = resultados.name;
        divImg.appendChild(nameElement);
        
        const imageUrl = resultados.imageUrl;
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        divImg.appendChild(imgElement);
    }
  } catch (error) {
    console.error(error, "No se pudo resolver la petición");
  }
}

fetchAndDisplayImages();