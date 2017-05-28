
var dwapsPairsGame = {
  NB_CARDS: 6, // Nb pair obligatoirement !!!
  HIDDEN_CARD: "card",
  SHOWED_CARD: "card flipped",
  FOUND_CARD: "card flipped found",

  wrapper: document.querySelector(".wrapper"),

  card: null,
  cards: [],
  firstFlippedCard: null,

  randomNb: 0,
  totalFlipped: 0,
  tabRandomNb: [],

  youWon: false,

  init: function()
  {
    var THIS = this; // Référence à l'objet général dwapsPairsGame

    this.createCard();

    // CREATION DES CARTES
    for(var i = 0; i < this.NB_CARDS; i++)
    {
      if(i == 0) // Si 1er tour : on ajoute la carte du DOM
      {
        this.generateNb(this.card, i);
        this.cards.push(this.card);
      }
      else // Sinon on clone la carte du DOM
      {
        this.cards.push(this.card.cloneNode(true));
        this.generateNb(this.cards[i], i);
      }


      // Gestion du clic sur la carte en cours
      this.cards[i].addEventListener(
        "click",
        function()
        {
          if( this.className != THIS.FOUND_CARD ) // Pas besoin d'aller plus loin si la carte est déjà validée
          {
            if( this.className != THIS.SHOWED_CARD ) // Si la carte n'est pas retournée...
            {
              // ... on la retourne...
              this.setAttribute("class", THIS.SHOWED_CARD);

              // ... et on procède à la comparaison s'il y a déjà une carte retournée
              if( THIS.firstFlippedCard )
              {
                if( THIS.firstFlippedCard.innerHTML == this.innerHTML ) // Si les deux cartes ont le même numéro
                {
                  THIS.firstFlippedCard.setAttribute("class", THIS.FOUND_CARD);
                  this.setAttribute("class", THIS.FOUND_CARD);

                  THIS.firstFlippedCard = null;
                }
                else // Sinon on retourne les cartes pour les cacher
                {
                  var THAT = this; // Référence à l'objet this.cards[i]

                  setTimeout(
                    function()
                    {
                      THIS.firstFlippedCard.setAttribute("class", THIS.HIDDEN_CARD);
                      THAT.setAttribute("class", THIS.HIDDEN_CARD);

                      THIS.firstFlippedCard = null;
                    },
                    500
                  );
                }
              }
              else // S'il n'y a pas encore de carte retournée alors celle-ci est la 1ère !
              {
                THIS.firstFlippedCard = this;
              }
            }
            else
            {
              this.setAttribute("class", THIS.HIDDEN_CARD);
            }
          }

          // On vérifie à chaque fois si le jeu est fini ou non
          // S'il est fini, on affiche un message, on retourne toutes les cartes,
          // et on génère de nouvelles paires de cartes
          if(!THIS.youWon)
          {
            for(var i = 0; i < THIS.cards.length; i++)
            {
              if(THIS.cards[i].className == THIS.FOUND_CARD)
                THIS.totalFlipped++;
            }

            if(THIS.totalFlipped == THIS.NB_CARDS)
            {
              THIS.youWon = true;

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

            THIS.totalFlipped = 0;
          }
        },
        false
      );
    }
  },

  createCard: function()
  {
    this.card = document.createElement('div');
      this.card.className = "card";

    var backCard = document.createElement('div');
      backCard.className = "back";
    var frontCard = document.createElement('div');
      frontCard.className = "front";

      this.card.appendChild(backCard);
      this.card.appendChild(frontCard);
  },

  // Génération des nombres des cartes
  generateNb: function(pCard, cpt)
  {
    if(cpt%2 == 0) // Si le compteur est pair, on peut générer un nouveau nombre
    {
      this.randomNb = parseInt( (Math.random()*20) + 1 );

      // On s'assure de l'unicité des paires
      // --> Tant que le nombre a déjà été utilisé, on en génère un nouveau
      while( this.tabRandomNb.length > 0
              &&
              this.tabRandomNb.indexOf(this.randomNb) > -1 )
      {
        this.randomNb = parseInt( (Math.random()*20) + 1 );
      }

      this.tabRandomNb.push(this.randomNb);
    }

    pCard.lastElementChild.innerHTML = this.randomNb;
  },

  // Mélange des cartes
  shakeCards: function()
  {
    // Parcours de tout le tableau des cartes (depuis la fin) sauf la première case
    // Celle-ci n'a pas besoin d'être traitée...
    for(var i = this.cards.length-1; i > 0; i--)
    {
      // Génération d'un index aléatoire
      var randomIndex = Math.floor( Math.random() * (i+1) );
      
      // On sauvegarde la valeur se trouvant à cet index aléatoire pour ne pas la perdre
      var valAtIndex = this.cards[randomIndex];

      // On peut maintenant écraser (remplacer) cette valeur par celle de l'index courant
      this.cards[randomIndex] = this.cards[i];

      // Puisqu'on a déplacé la valeur de l'index courant,
      // on remplace cette dernière par celle qu'on avait sauvegardée plus haut.
      // Au final, on a inversé les 2 valeurs concernées
      this.cards[i] = valAtIndex;
    }
  },

  displayCards: function()
  {
    var THIS = this;

    this.cards.forEach(
      function(card)
      {
        THIS.wrapper.appendChild(card);
      }
    );
  },

  start: function()
  {
    this.init();
    this.shakeCards();
    this.displayCards();
  }
};

