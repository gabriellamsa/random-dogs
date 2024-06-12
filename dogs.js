const url = 'https://dog.ceo/api/breeds/image/random';

async function fetchDog() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    displayDog(data.message);
  } catch (error) {
    console.error('There was an error!', error);
  }
}

async function fetchMultipleDogs(count) {
  try {
    const promises = [];
    for (let i = 0; i < count; i++) {
      promises.push(fetch(url).then(response => response.json()));
    }
    const results = await Promise.all(promises);
    displayDogs(results.map(result => result.message));
  } catch (error) {
    console.error('There was an error!', error);
  }
}

function displayDog(imageUrl) {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = "Random dog photo";
  img.width = 500;

  const dogDiv = document.querySelector('#dog');
  dogDiv.innerHTML = ''; // limpa a imagem anterior antes de anexar a nova
  dogDiv.appendChild(img);
}

function displayDogs(imageUrls) {
  const dogsDiv = document.querySelector('#dogs');
  dogsDiv.innerHTML = ''; // limpa imagens anteriores 

  imageUrls.forEach(imageUrl => {
    const card = document.createElement('div');
    card.className = 'card';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Random dog photo";
    
    card.appendChild(img);
    dogsDiv.appendChild(card);
  });
}

// verifica os parâmetros do URL para determinar a função para ativar
const params = new URLSearchParams(window.location.search);
if (params.has('single')) {
  fetchDog();
} else if (params.has('multiple')) {
  fetchMultipleDogs(5);
}
