const NB_CARDS = 6;

var card = document.querySelector(".card");
var cards = [];

for(var i = 0; i < NB_CARDS; i++)
{
  if(i == 0) // Si 1er tour : on ajoute la carte du DOM
  {
    cards.push(card);
  }
  else // Sinon on clone la carte du DOM
  {
    cards.push(card.cloneNode(true));
    card.parentNode.appendChild(cards[i]);
  }
}