const NB_CARDS = 6; // Nb pair obligatoirement !!!

var card = document.querySelector(".card");
var cards = [];

var randomNb = 0;
var tabRandomNb = [];

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
  {
    randomNb = parseInt( (Math.random()*20) + 1 );

    // On s'assure de l'unicité des paires
    // --> Tant que le nombre a déjà été utilisé, on en génère un nouveau
    while( tabRandomNb.length > 0 && tabRandomNb.indexOf(randomNb) > -1 )
      randomNb = parseInt( (Math.random()*20) + 1 );

    tabRandomNb.push(randomNb);
  }

  pCard.lastElementChild.innerHTML = randomNb;
}

// Mélange des cartes et affichage
shakeCards();
for(var i = 0; i < cards.length; i++)
  card.parentNode.appendChild(cards[i]);

function shakeCards()
{
  // Parcours de tout le tableau des cartes (depuis la fin) sauf la première case
  // Celle-ci n'a pas besoin d'être traitée...
  for(var i = cards.length-1; i > 0; i--)
  {
    // Génération d'un index aléatoire
    var randomIndex = Math.floor( Math.random() * (i+1) );
    
    // On sauvegarde la valeur se trouvant à cet index aléatoire pour ne pas la perdre
    var valAtIndex = cards[randomIndex];

    // On peut maintenant écraser (remplacer) cette valeur par celle de l'index courant
    cards[randomIndex] = cards[i];

    // Puisqu'on a déplacé la valeur de l'index courant,
    // on remplace cette dernière par celle qu'on avait sauvegardée plus haut.
    // Au final, on a inversé les 2 valeurs concernées
    cards[i] = valAtIndex;
  }
}