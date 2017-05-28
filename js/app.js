const NB_CARDS = 6; // Nb pair obligatoirement !!!
const HIDDEN_CARD = "card";
const SHOWED_CARD = "card flipped";
const FOUND_CARD = "card flipped found";

var wrapper = document.querySelector(".wrapper");

var card = createCard();
var cards = [], firstFlippedCard = null;

var randomNb = 0, totalFlipped = 0;
var tabRandomNb = [];

var youWon = false;


// CREATION DES CARTES
for(var i = 0; i < NB_CARDS; i++)
{
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
      if( this.className != FOUND_CARD ) // Pas besoin d'aller plus loin si la carte est déjà validée
      {
        if( this.className != SHOWED_CARD ) // Si la carte n'est pas retournée...
        {
          // ... on la retourne...
          this.setAttribute("class", SHOWED_CARD);

          // ... et on procède à la comparaison s'il y a déjà une carte retournée
          if( firstFlippedCard )
          {
            if( firstFlippedCard.innerHTML == this.innerHTML ) // Si les deux cartes ont le même numéro
            {
              firstFlippedCard.setAttribute("class", FOUND_CARD);
              this.setAttribute("class", FOUND_CARD);

              firstFlippedCard = null;
            }
            else // Sinon on retourne les cartes pour les cacher
            {
              var THIS = this;

              setTimeout(
                function()
                {
                  firstFlippedCard.setAttribute("class", HIDDEN_CARD);
                  THIS.setAttribute("class", HIDDEN_CARD);

                  firstFlippedCard = null;
                },
                500
              );
            }
          }
          else // S'il n'y a pas encore de carte retournée alors celle-ci est la 1ère !
          {
            firstFlippedCard = this;
          }
        }
        else
        {
          this.setAttribute("class", HIDDEN_CARD);
        }
      }

      // On vérifie à chaque fois si le jeu est fini ou non
      // S'il est fini, on affiche un message, on retourne toutes les cartes,
      // et on génère de nouvelles paires de cartes
      if(!youWon)
      {
        for(var i = 0; i < cards.length; i++)
        {
          if(cards[i].className == FOUND_CARD)
            totalFlipped++;
        }

        if(totalFlipped == NB_CARDS)
        {
          youWon = true;

          setTimeout(
            function()
            {
              alert("Bravo !");

              // Réinitialisation du jeu
              window.location.reload();
            },
            500
          );

        }

        totalFlipped = 0;
      }
    },
    false
  );
}


// Mélange des cartes et affichage
shakeCards();
for(var i = 0; i < cards.length; i++)
  wrapper.appendChild(cards[i]);



// FONCTIONS

// Création d'une carte
function createCard()
{
  var card = document.createElement('div');
    card.className = "card";

  backCard = document.createElement('div');
    backCard.className = "back";
  frontCard = document.createElement('div');
    frontCard.className = "front";

    card.appendChild(backCard);
    card.appendChild(frontCard);

  return card;
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

// Mélange des cartes
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