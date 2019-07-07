
const DwapsPairsGame = (function(nbCards) {

  // DECLARATIONS
  this.NB_CARDS = nbCards;
  this.wrapper = document.querySelector('.wrapper');
  this.cards = [];
  this.firstFlippedCard = null;
  this.totalFlipped = 0;
  this.tabRandomNb = []; // Permet d'éviter les doublons
  this.youWonSound = null;

  function init() {
    loadSound();
    
    // Correction incohérence de l'utilisateur
    if (this.NB_CARDS !== '' && +this.NB_CARDS > 0 && +this.NB_CARDS <= 20) {
      this.NB_CARDS = (this.NB_CARDS % 2 === 0) ? this.NB_CARDS : +this.NB_CARDS + 1;
      
      const card = createCard();

      // CREATION DES CARTES
      for (var i = 0; i < this.NB_CARDS; i++) {
        if (i == 0) {
          this.cards.push(card);
            generateNb(card, i);
        }
        else { // Sinon on clone la carte du DOM
          this.cards.push(card.cloneNode(true));
            generateNb(this.cards[i], i);
        }

        // Gestion du clic sur la carte en cours
        this.cards[i].addEventListener(
          'click',
          event => {
            const card = event.currentTarget;

            if (!card.classList.contains('found', 'flipped')) {
              card.classList.add('flipped');

              // On procède à la comparaison s'il y a déjà une carte retournée
              if (this.firstFlippedCard) {
                if (this.firstFlippedCard.textContent == card.textContent) {
                  this.firstFlippedCard.classList.add('found');
                  card.classList.add('found');

                  this.firstFlippedCard = null;
                }
                else {
                  setTimeout(
                    () => {
                      this.firstFlippedCard.classList.remove('flipped');
                      card.classList.remove('flipped');

                      this.firstFlippedCard = null;
                    },
                    500
                  );
                }
              }
              else {
                this.firstFlippedCard = card;
              }
            }
            else {
              this.classList.add('card');
            }

            checkIfGameEnds();
          }
        );
      }
    }
    else {
      document.write('Pas envie de jouer ? Tans pis... 😢');
    }
  }

  run();

  function run() {
    init();
    shuffleCards();
    displayCards();
  }

  function createCard() {
    const card = document.createElement('div');
    const backCard = document.createElement('div');
    const frontCard = document.createElement('div');

    card.className = 'card';
    backCard.className = 'back';
    frontCard.className = 'front';

    card.appendChild(backCard);
    card.appendChild(frontCard);

    return card;
  }

  function loadSound() {
    this.youWonSound = document.createElement('audio');
    const backSound = document.createElement('audio');

    this.youWonSound.src = '/audio/you-won.mp3';
    backSound.src = '/audio/jungle.mp3';

    backSound.autoplay = true;
    backSound.loop = true;
    backSound.volume = 0.3;

    document.body.appendChild(this.youWonSound);
    document.body.appendChild(backSound);
  }

  function generateNb(card, index) {
    if (index % 2 == 0) {
      do {
        this.randomNb = Math.ceil((Math.random() * 20));
      }
      while (this.tabRandomNb.includes(this.randomNb));

      this.tabRandomNb.push(this.randomNb);
    }

    card.lastElementChild.textContent = this.randomNb;
  }

  function shuffleCards() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  function displayCards() {
    this.cards.forEach(card => {
      this.wrapper.appendChild(card);
    });
  }

  function checkIfGameEnds() {
    for (let card of this.cards) {
      if (card.classList.contains('found')) {
        this.totalFlipped++;
      }
    }

    if (this.totalFlipped == this.NB_CARDS) {
      setTimeout(
        () => {
          this.youWonSound.play();
          alert('Bravo !');
          window.location.reload();
        },
        500
      );
    }
    else {
      this.totalFlipped = 0;
    }
  }

  return { init, run, shuffleCards, displayCards };
});
