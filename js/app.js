const NB_CARDS = 6;

var card = document.querySelector(".card");
var cards = [];

var randomNb = 0;

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

  // Gestion du clic sur la carte en cours
  cards[i].addEventListener(
    "click",
    function()
    {
      if( !this.className.match("flipped") )
      {
        randomNb = parseInt( (Math.random()*20) + 1 );
        this.lastElementChild.innerHTML = randomNb;
        this.setAttribute("class", "card flipped");
      }
      else
        this.setAttribute("class", "card");
    },
    false
  );
}