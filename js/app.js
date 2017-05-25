const NB_CARDS = 6; // Nb pair obligatoirement !!!

var card = document.querySelector(".card");
var cards = [], firstFlippedCard = null;

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
      if( !this.className.match("found") ) // Pas besoin d'aller plus loin si la carte est déjà validée
      {
        if( !this.className.match("flipped") ) // Si la carte n'est pas retournée...
        {
          // ... on la retourne...
          this.setAttribute("class", "card flipped");

          // ... et on procède à la comparaison s'il y a déjà une carte retournée
          if( firstFlippedCard )
          {
            if( firstFlippedCard.innerHTML == this.innerHTML ) // Si les deux cartes ont le même numéro
            {
              firstFlippedCard.setAttribute("class", "card flipped found");
              this.setAttribute("class", "card flipped found");
            }
            else // Sinon on retourne les cartes pour les cacher
            {
              firstFlippedCard.setAttribute("class", "card");
              this.setAttribute("class", "card");
            }

            firstFlippedCard = null;
          }
          else // S'il n'y a pas encore de carte retournée alors celle-ci est la 1ère !
          {
            firstFlippedCard = this;
          }
        }
        else
        {
          this.setAttribute("class", "card");
        }
      }
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