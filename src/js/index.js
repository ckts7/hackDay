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
const deckHolder = document.querySelector('.deck-holder');
const playerCardHolder = document.querySelector('.player2-card-holder');
const playerOpenCardHolder = document.querySelector('.player2-openCard-holder');
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
    let htmlContent = '<h1>Hand: </h1>';
    let htmlContent3 = '';
    let i = 3;
    let k = 3

    // console.log(index);
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
    // let htmlContent1 = '<h1>Hand: </h1>';
    // let i = 3;
    let j = 3
    // while (i) {
    //   let card = deck.pop();
    //   player.cards.push(card);
    //   htmlContent1 += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
    //   i--;
    // }
    while (j) {
      let card = deck.pop();
      player.endCards.push(card);
      j--;
    }
    // while (k) {
    //   let card = deck.pop();
    //   player.downCards.push(card);
    //   htmlContent3 += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
    //   k--;
    // }
    // player.name === 'CPU Player' ? cpuCardHolder.innerHTML = htmlContent1 : playerCardHolder.innerHTML = htmlContent1;
    player.name === 'CPU Player' ? cpuOpenCardHolder.innerHTML = htmlContent3 : playerOpenCardHolder.innerHTML = htmlContent3;

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
  // console.log(players);
  // console.log(deck);
}

function playersTurn(cardPlayed) {
  // console.log(players);
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
  accepted = allowedPlay(cardPlayed);
  // console.log(accepted);
  if (accepted) {
    // console.log('I am truly accepted');
    let moveToPlayed = currentPlayer.cards.splice(currentPlayer.cards.findIndex(card => card === cardPlayed), 1)[0];
    playedCards.push(moveToPlayed);
    // console.log(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    // console.log(openCard);
    deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
    if (deck.length > 0 && currentPlayer.cards.length < 3) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
    }
  } else {
    if (deck.length > 0) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
      currentPlayer.noPlay = true;
    }
  }
  if (currentPlayer.noPlay) {
    openCard = null;
    deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
  }
  currentPlayer.isTurn = !currentPlayer.isTurn;
  restingPlayer.isTurn = !restingPlayer.isTurn;
  renderNew(currentPlayer);
  console.log(playedCards);
  setTimeout(() => {
    computerTurn();
  }, 1000);
}

function computerTurn() {
  // console.log(players[0].cards);
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
  // console.log('Computer thinking');
  console.log(openCard);
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
    console.log('Curr', currentPlayer.cards);
    openCard = null;
  }
  if(playableCard.length > 0) {
    console.log('Playable', playableCard);
    playableCard = playableCard.sort();
    let moveToPlayed = currentPlayer.cards.splice(currentPlayer.cards.findIndex(card => card === playableCard[0]), 1)[0];
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
    if (deck.length > 0 && currentPlayer.cards.length < 3) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
    }
  } 
  else {
    if (deck.length > 0) {
      let newCard = deck.pop();
      currentPlayer.cards.push(newCard);
      currentPlayer.noPlay = true;
    }
  }
  if (currentPlayer.noPlay) {
    openCard = null;
    deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`
  }
  currentPlayer.isTurn = !currentPlayer.isTurn;
  restingPlayer.isTurn = !restingPlayer.isTurn;
  console.log(playedCards);

  renderComp(currentPlayer);
}

function renderComp(player) {
  htmlContent = '<h1>Hand: </h1>';
  player.cards.forEach(card => {
    htmlContent += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
  });
  player.name === 'CPU Player' ? cpuCardHolder.innerHTML = htmlContent : playerCardHolder.innerHTML = htmlContent;
}

function renderNew(player) {
  htmlContent = '<h1>Hand: </h1>';
  player.cards.forEach(card => {
    htmlContent += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
  });
  player.name === 'CPU Player' ? cpuCardHolder.innerHTML = htmlContent : playerCardHolder.innerHTML = htmlContent;
  player.cards.forEach(card => {
    let playCard = document.querySelector(`#${card}`);
    playCard.addEventListener('click', () => {
      playersTurn(playCard.id);
    });
  });
}

function allowedPlay(card) {
  let checkCard = 0;
  let playCard = convertClothedCard(card.substring(1));
  // console.log(openCard);
  if (openCard != null) {
    checkCard = convertClothedCard(openCard.substring(1));
  }
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

createDeck();
firstDeal();