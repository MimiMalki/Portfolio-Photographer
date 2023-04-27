// Initialisez la base de données indexDB
const db = new Dexie('Tarifdb');
db.version(1).stores({
  tarifs: '++id, title, description, price',
});

// Sélectionnez les éléments HTML pertinents
const showCardsBtn = document.getElementById('show-cards-btn');
const cardContainer = document.getElementById('card-container');

// Ajoutez un écouteur d'événements pour le clic sur le bouton
// showCardsBtn.addEventListener('click', showCards);
showCardsBtn.addEventListener('click', function() {
  window.location.href = "tarifCard.html";
});

async function showCards() {
  // Ouvrez la base de données et récupérez les données de tarifs
  
  const data = await db.tarifs.toArray();
  
  // Effacez le contenu actuel du conteneur de carte
  cardContainer.innerHTML = '';

  // Ajoutez une carte pour chaque enregistrement dans les données récupérées
  
  data.forEach((tarif) => {
    const cardWrapper = createCardWrapper(tarif);
    cardContainer.appendChild(cardWrapper);
    });
}
window.onload = showCards;
function createCardWrapper(tarif) {
  // Créez un élément de carte HTML à partir des données de tarif
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('cardWrapper');
  
  const card = document.createElement('div');
  card.classList.add('card');
  
  const cardFront = createCardFront(tarif);
  const cardBack = createCardBack(tarif);
  
  card.appendChild(cardFront);
  card.appendChild(cardBack);
  
  cardWrapper.appendChild(card);
  
  return cardWrapper;
  }
function createCardFront(tarif) {
  // Créez un élément de carte HTML à partir des données de tarif
  const cardFront = document.createElement('div');
  cardFront.classList.add('cardFront');

  const title = document.createElement('h2');
  title.innerText = tarif.title;

  // const description = document.createElement('p');
  // description.innerText = tarif.description;

  const price = document.createElement('p');
  price.innerText = tarif.price;
  price.classList.add('price'); // Ajoutez la classe 'price' à l'élément de prix

  const arrowIcon = document.createElement('i'); // Créer l'élément <i> pour l'icône de flèche
  arrowIcon.classList.add('fa', 'fa-arrow-right'); 

  cardFront.appendChild(title);
  // cardBack.appendChild(description);
  cardFront.appendChild(price);
  cardFront.appendChild(arrowIcon);
  return cardFront;
}
function createCardBack(tarif) {
  // Créez un élément de carte HTML à partir des données de tarif
  const cardBack = document.createElement('div');
  cardBack.classList.add('cardBack');

  const description = document.createElement('p');
  description.innerText = tarif.description;

  cardBack.appendChild(description);

  return cardBack;
}



