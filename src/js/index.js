const hearts = [];
const diamonds = [];
const spades = [];
const clubs = [];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const colors = [hearts, diamonds, spades, clubs];
let deck = [];
let playedCards = [];
const cpuCardHolder = document.querySelector('.player1-card-holder');
const cpuOpenCardHolder = document.querySelector('.player1-openCard-holder');
const cpuEndCardHolder = document.querySelector('.player1-endCard-holder');
const deckHolder = document.querySelector('.deck-holder');
const playerCardHolder = document.querySelector('.player2-card-holder');
const playerOpenCardHolder = document.querySelector('.player2-openCard-holder');
const playerEndCardHolder = document.querySelector('.player2-endCard-holder');
let openCard;

const players = [];

const player1 = { name: 'CPU Player', cards: [], endCards: [], downCards: [], isTurn: false, noPlay: false };
const player2 = { name: 'Player 1', cards: [], endCards: [], downCards: [], isTurn: false, noPlay: false };
players.push(player1);
players.push(player2);


function createDeck() {
  for (let i = 0; i < 13; i++) {
    hearts.push('H' + values[i]);
    diamonds.push('D' + values[i]);
    spades.push('S' + values[i]);
    clubs.push('C' + values[i]);
  }
  colors.forEach(color => {
    color.forEach(card => {
      deck.push(card);
    });
  });
  deck = deck.splice(10, [20]); // change deck back to 52 cards
  deck = shuffle(deck);
}

function shuffle(array) {
  let m = array.length;
  let t;
  let i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function firstDeal() {
  playedCards.push(deck.pop());
  players.forEach((player, index) => {
    let htmlContent = '';
    let htmlContent3 = '';
    let htmlContent2 = '';
    let i = 3;
    let k = 3
    if (index === 0) {
      while (i) {
        let card = deck.pop();
        player.cards.push(card);
        htmlContent += `<img id="${card}" src='cards/${card}.svg'/>`;
        i--;
      }
      while (k) {
        let card = deck.pop();
        player.downCards.push(card);
        htmlContent3 += `<img id="${card}" src='cards/${card}.svg'/>`;
        k--;
      }
      cpuCardHolder.innerHTML = htmlContent;
    } else {
      while (i) {
        let card = deck.pop();
        player.cards.push(card);
        htmlContent += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
        i--;
      }
      while (k) {
        let card = deck.pop();
        player.downCards.push(card);
        htmlContent3 += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
        k--;
      }
      playerCardHolder.innerHTML = htmlContent;
    }
    let j = 3
    while (j) {
      let card = deck.pop();
      player.endCards.push(card);
      htmlContent2 += `<input id="${card}" type="image" src='cards/RED_BACK.svg'/>`;
      j--;
    }
    player.name === 'CPU Player' ? cpuOpenCardHolder.innerHTML = htmlContent3 : playerOpenCardHolder.innerHTML = htmlContent3;
    player.name === 'CPU Player' ? cpuEndCardHolder.innerHTML = htmlContent2 : playerEndCardHolder.innerHTML = htmlContent2;

  });
  players[1].cards.forEach(card => {
    let playCard = document.querySelector(`#${card}`);
    playCard.addEventListener('click', () => {
      playersTurn(playCard.id);
    });
  });
  openCard = playedCards.slice(-1)[0];
  deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
  players[1].isTurn = true;
}

function playersTurn(cardPlayed) {
  console.log(players[1]);
  let accepted = false;
  let currentPlayer = players.filter(player => {
    if (player.isTurn) {
      return player;
    }
  })[0];
  let restingPlayer = players.filter(player => {
    if (!player.isTurn) {
      return player;
    }
  })[0];
  currentPlayer.noPlay = false;
  if (restingPlayer.noPlay) {
    openCard = null;
  }
  console.log(currentPlayer.cards.length);
  if (currentPlayer.cards.length <= 1) {
    console.log('Here');
    currentPlayer.downCards.forEach(card => {
      let playCard = document.querySelector(`#${card}`);
      playCard.addEventListener('click', () => {
        console.log('Building clickListeners');
        playDownCard(playCard.id, currentPlayer);
      });
    });
  }
  accepted = allowedPlay(cardPlayed);
  if (accepted) {
    let moveToPlayed = currentPlayer.cards.splice(currentPlayer.cards.findIndex(card => card === cardPlayed), 1)[0];
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
    } if (deck.length > 0 && currentPlayer.cards.length < 3) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
    }
  } else {
    if (deck.length > 0) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
    }
    currentPlayer.noPlay = true;
  }
  if (currentPlayer.noPlay) {
    openCard = null;
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
    }
  }
  console.log('I am here');
  currentPlayer.isTurn = !currentPlayer.isTurn;
  restingPlayer.isTurn = !restingPlayer.isTurn;
  render('cards', currentPlayer);
  setTimeout(() => {
    computerTurn();
  }, 1000);
}

function playDownCard(cardPlayed, player) {
  console.log('Hey plyDownCard');
  let currentPlayer = players.filter(player => {
    if (player.isTurn) {
      return player;
    }
  })[0];
  let restingPlayer = players.filter(player => {
    if (!player.isTurn) {
      return player;
    }
  })[0];
  let accepted = false;
  accepted = allowedPlay(cardPlayed);
  if (accepted) {
    let moveToPlayed = player.downCards.splice(player.downCards.findIndex(card => card === cardPlayed), 1)[0];
    // console.log(moveToPlayed);
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
    }
  } else {
    player.noPlay = true;
  }
  currentPlayer.isTurn = !currentPlayer.isTurn;
  restingPlayer.isTurn = !restingPlayer.isTurn;
  render('downCards', player);
  setTimeout(() => {
    computerTurn();
  }, 1000);
}

function computerTurn() {
  let currentPlayer = players.filter(player => {
    if (player.isTurn) {
      return player;
    }
  })[0];
  let restingPlayer = players.filter(player => {
    if (!player.isTurn) {
      return player;
    }
  })[0];
  currentPlayer.noPlay = false;
  let playableCard = [];
  if (!restingPlayer.noPlay) {
    let checkCard = convertClothedCard(openCard.substring(1));
    players[0].cards.forEach(compCard => {
      let playCard = convertClothedCard(compCard.substring(1));
      if (playCard >= checkCard) {
        playableCard.push(compCard);
      }
    });
  }
  if (restingPlayer.noPlay) {
    playableCard = [...currentPlayer.cards];
    openCard = null;
  }
  if (playableCard.length > 0) {
    playableCard = playableCard.sort(compSorter);
    let moveToPlayed = currentPlayer.cards.splice(currentPlayer.cards.findIndex(card => card === playableCard[0]), 1)[0];
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
    }
    if (deck.length > 0 && currentPlayer.cards.length < 3) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
    }
  }
  else {
    if (deck.length > 0) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
    }
    currentPlayer.noPlay = true;
  }
  console.log('Can comp play?', currentPlayer.noPlay);
  console.log('Computer cards', currentPlayer.cards.length);
  if (currentPlayer.cards.length === 0) { // this function should be removed in game ready
    currentPlayer.noPlay = true;
  }
  if (currentPlayer.noPlay) {
    console.log('Comp turn, inside noPlay');
    openCard = null;
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
    }
  }
  currentPlayer.isTurn = !currentPlayer.isTurn;
  restingPlayer.isTurn = !restingPlayer.isTurn;
  renderComp(currentPlayer);
}

function compSorter(a, b) {
  a = convertClothedCard(a.substring(1));
  b = convertClothedCard(b.substring(1));
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
}

function renderComp(player) {
  htmlContent = '';
  player.cards.forEach(card => {
    htmlContent += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
  });
  player.name === 'CPU Player' ? cpuCardHolder.innerHTML = htmlContent : playerCardHolder.innerHTML = htmlContent;
}

function render(cardType, player) {
  htmlContent = '';
  player[cardType].forEach(card => {
    htmlContent += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
  });
  if (cardType === 'cards') {
    player.name === 'CPU Player' ? cpuCardHolder.innerHTML = htmlContent : playerCardHolder.innerHTML = htmlContent;
    player[cardType].forEach(card => {
      let playCard = document.querySelector(`#${card}`);
      console.log(playCard);
      playCard.addEventListener('click', () => {
        playersTurn(playCard.id);
      });
    });
  }
  if (cardType === 'downCards') {
    player.name === 'CPU Player' ? cpuOpenCardHolder.innerHTML = htmlContent : playerOpenCardHolder.innerHTML = htmlContent;
    player.downCards.forEach(card => {
      let playCard = document.querySelector(`#${card}`);
      console.log(playCard);
      playCard.addEventListener('click', () => {
        playDownCard(playCard.id);
      });
    });
  }
}

// function renderEndCards(player){
//   htmlContent = '';
//   player.downCards.forEach(card => {
//     htmlContent += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
//   });
//   player.name === 'CPU Player' ? cpuCardHolder.innerHTML = htmlContent : playerOpenCardHolder.innerHTML = htmlContent;
//   player.downCards.forEach(card => {
//     let playCard = document.querySelector(`#${card}`);
//     playCard.addEventListener('click', () => {
//       playersTurn(playCard.id);
//     });
//   });
// }

function allowedPlay(card) {
  let checkCard = 0;
  let playCard = convertClothedCard(card.substring(1));
  if (openCard != null) checkCard = convertClothedCard(openCard.substring(1));
  if (playCard >= checkCard) {
    return true;
  } else {
    return false;
  }
}

function convertClothedCard(card) {
  switch (card) {
    case 'A':
      return card = 14;
    case 'K':
      return card = 13;
    case 'Q':
      return card = 12;
    case 'J':
      return card = 11;
    default:
      return card;
  }
}

let startButton = document.querySelector('.startgame');
startButton.addEventListener('click', () => {
  createDeck();
  firstDeal();
  startButton.style.display = 'none';
});