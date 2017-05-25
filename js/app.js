const NB_CARDS = 6; // Nb pair obligatoirement !!!

var card = document.querySelector(".card");
var cards = [];

var randomNb = 0;

for(var i = 0; i < NB_CARDS; i++)
{
  // CREATION DES CARTES
  if(i == 0) // Si 1er tour : on ajoute la carte du DOM
  {
    generateNb(card, i);
    cards.push(card);
  }
  else // Sinon on clone la carte du DOM
  {
    cards.push(card.cloneNode(true));
    generateNb(cards[i], i);
    card.parentNode.appendChild(cards[i]);
  }


  // Gestion du clic sur la carte en cours
  cards[i].addEventListener(
    "click",
    function()
    {
      if( !this.className.match("flipped") )
        this.setAttribute("class", "card flipped");
      else
        this.setAttribute("class", "card");
    },
    false
  );
}

// Génération des nombres des cartes
function generateNb(pCard, cpt)
{
  if(cpt%2 == 0) // Si le compteur est pair, on peut générer un nouveau nombre
    randomNb = parseInt( (Math.random()*20) + 1 );

  pCard.lastElementChild.innerHTML = randomNb;
}