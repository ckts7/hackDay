const hearts = [];
const diamonds = [];
const spades = [];
const clubs = [];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const colors = [hearts, diamonds, spades, clubs];
let deck = [];
const playedCards = [];
const cpuCardHolder = document.querySelector('.player1-card-holder');
const cpuOpenCardHolder = document.querySelector('.player1-openCard-holder');
const cpuEndCardHolder = document.querySelector('.player1-endCard-holder');
const deckHolder = document.querySelector('.deck-holder');
const playerCardHolder = document.querySelector('.player2-card-holder');
const playerOpenCardHolder = document.querySelector('.player2-openCard-holder');
const playerEndCardHolder = document.querySelector('.player2-endCard-holder');
let openCard;

const players = [];

const player1 = {
  name: 'CPU Player', cards: [], endCards: [], downCards: [], isTurn: false, noPlay: false,
};
const player2 = {
  name: 'Player 1', cards: [], endCards: [], downCards: [], isTurn: false, noPlay: false,
};
players.push(player1);
players.push(player2);


function createDeck() {
  for (let i = 0; i < 13; i++) {
    hearts.push(`H${values[i]}`);
    diamonds.push(`D${values[i]}`);
    spades.push(`S${values[i]}`);
    clubs.push(`C${values[i]}`);
  }
  colors.forEach((color) => {
    color.forEach((card) => {
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
  let start = true;
  while(start) {
    let startCard = deck.pop();
    let checkCard = convertClothedCard(startCard.substring(1));
    if(checkCard === '2' || checkCard > 8) {
      deck.unshift(startCard);
    } else {
      playedCards.push(startCard);
      start = false;
    }
  }
  players.forEach((player, index) => {
    let htmlContent = '';
    let htmlContent3 = '';
    let htmlContent2 = '';
    let i = 3;
    let k = 3;
    if (index === 0) {
      while (i) {
        const card = deck.pop();
        player.cards.push(card);
        htmlContent += `<img id="${card}" src='cards/RED_BACK.svg'/>`;
        i--;
      }
      while (k) {
        const card = deck.pop();
        player.downCards.push(card);
        htmlContent3 += `<img id="${card}" src='cards/${card}.svg'/>`;
        k--;
      }
      cpuCardHolder.innerHTML = htmlContent;
    } else {
      while (i) {
        const card = deck.pop();
        player.cards.push(card);
        htmlContent += `<input id="${card}" type="image" src='cards/${card}.svg'/>`;
        i--;
      }
      while (k) {
        const card = deck.pop();
        player.downCards.push(card);
        htmlContent3 += `<img id="${card}" src='cards/${card}.svg'/>`;
        k--;
      }
      playerCardHolder.innerHTML = htmlContent;
    }
    let j = 3;
    while (j) {
      const card = deck.pop();
      player.endCards.push(card);
      htmlContent2 += `<image id="${card}" type="image" src='cards/RED_BACK.svg'/>`;
      j--;
    }
    player.name === 'CPU Player' ? cpuOpenCardHolder.innerHTML = htmlContent3 : playerOpenCardHolder.innerHTML = htmlContent3;
    player.name === 'CPU Player' ? cpuEndCardHolder.innerHTML = htmlContent2 : playerEndCardHolder.innerHTML = htmlContent2;
  });
  players[1].cards.forEach((card) => {
    const playCard = document.querySelector(`#${card}`);
    playCard.addEventListener('click', () => {
      playersTurn(playCard.id);
    });
  });
  openCard = playedCards.slice(-1)[0];
  deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`;
  players[1].isTurn = true;
}

function playersTurn(cardPlayed) {
  let accepted = '';
  const currentPlayer = players.filter((player) => {
    if (player.isTurn) {
      return player;
    }
  })[0];
  const restingPlayer = players.filter((player) => {
    if (!player.isTurn) {
      return player;
    }
  })[0];
  currentPlayer.noPlay = false;
  if (restingPlayer.noPlay) {
    openCard = null;
  }
  if (currentPlayer.cards.length <= 1) {
    currentPlayer.downCards.forEach((card) => {
      const playCard = document.querySelector(`#${card}`);
      playCard.addEventListener('click', () => {
        playDownCard(playCard.id, currentPlayer);
      });
    });
  }
  accepted = allowedPlay(cardPlayed);
  if (accepted) {
    const moveToPlayed = currentPlayer.cards.splice(currentPlayer.cards.findIndex(card => card === cardPlayed), 1)[0];
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`;
    } if (deck.length > 0 && currentPlayer.cards.length < 3) {
      const newCard = deck.pop();
      currentPlayer.cards.push(newCard);
    }
  } else {
    currentPlayer.cards = [...currentPlayer.cards, ...playedCards];
    playedCards.length = 0;
    openCard = null;
    currentPlayer.noPlay = true;
  }
  if (currentPlayer.noPlay) {
    openCard = null;
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`;
    }
  }

  if (currentPlayer.cards.length >= 0) {
    render('cards', currentPlayer);
  }
  if (currentPlayer.cards.length === 0 && currentPlayer.downCards.length > 0) {
    render('downCards', currentPlayer);
  }
  if (accepted === 'startover') {
    openCard = null;
  } else if (accepted === 'destroy') {
    playedCards.length = 0;
    openCard = null;
  } else {
    currentPlayer.isTurn = !currentPlayer.isTurn;
    restingPlayer.isTurn = !restingPlayer.isTurn;
    setTimeout(() => {
      computerTurn();
    }, 1000);
  }
}

function playDownCard(cardPlayed) {
  let accepted = ''
  const currentPlayer = players.filter((player) => {
    if (player.isTurn) {
      return player;
    }
  })[0];
  const restingPlayer = players.filter((player) => {
    if (!player.isTurn) {
      return player;
    }
  })[0];
  accepted = allowedPlay(cardPlayed);
  if (accepted) {
    const moveToPlayed = currentPlayer.downCards.splice(currentPlayer.downCards.findIndex(card => card === cardPlayed), 1)[0];
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`;
    }
  } else {
    currentPlayer.downCards = [...currentPlayer.downCards, ...playedCards];
    playedCards.length = 0;
    openCard = null;
    currentPlayer.noPlay = true;
  }
  if (currentPlayer.noPlay) {
    openCard = null;
    deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
  }
  if (currentPlayer.downCards.length >= 0) {
    render('downCards', currentPlayer);
  }
  if (currentPlayer.downCards.length === 0) {
    render('endCards', currentPlayer);
  }
  if (accepted === 'startover') {
    openCard = null;
  } else if (accepted === 'destroy') {
    playedCards.length = 0;
    openCard = null;
  } else {
    currentPlayer.isTurn = !currentPlayer.isTurn;
    restingPlayer.isTurn = !restingPlayer.isTurn;
    setTimeout(() => {
      computerTurn();
    }, 1000);
  }
}

function playEndCard(cardPlayed) {
  const currentPlayer = players.filter((player) => {
    if (player.isTurn) {
      return player;
    }
  })[0];
  const restingPlayer = players.filter((player) => {
    if (!player.isTurn) {
      return player;
    }
  })[0];
  let accepted = false;
  accepted = allowedPlay(cardPlayed);
  if (accepted) {
    console.log(currentPlayer.downCards);
    const moveToPlayed = currentPlayer.endCards.splice(currentPlayer.endCards.findIndex(card => card === cardPlayed), 1)[0];
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`;
    }
  } else {
    currentPlayer.endCards = [...currentPlayer.endCards, ...playedCards];
    playedCards.length = 0;
    openCard = null;
    currentPlayer.noPlay = true;
  }

  if (currentPlayer.noPlay) {
    openCard = null;
    deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
  }
  if (currentPlayer.endCards.length >= 0) {
    render('endCards', currentPlayer);
  }
  if (currentPlayer.endCards.length === 0) {
    render('endCards', currentPlayer);
  }
  if (currentPlayer.endCards.length === 0) {
    playerEndCardHolder.innerHTML = '<h1>Winner!!!</h1>';
  }
  if (accepted === 'startover') {
    openCard = null;
  } else if (accepted === 'destroy') {
    playedCards.length = 0;
    openCard = null;
  } else {
    currentPlayer.isTurn = !currentPlayer.isTurn;
    restingPlayer.isTurn = !restingPlayer.isTurn;
    setTimeout(() => {
      computerTurn();
    }, 1000);
  }
}

function computerTurn() {
  let checkCard = 0;
  let cardType = '';
  let accepted = '';
  const currentPlayer = players.filter((player) => {
    if (player.isTurn) {
      return player;
    }
  })[0];
  const restingPlayer = players.filter((player) => {
    if (!player.isTurn) {
      return player;
    }
  })[0];
  if (currentPlayer.cards.length > 0) {
    cardType = 'cards';
  }
  if (currentPlayer.cards.length == 0 && currentPlayer.downCards.length > 0) {
    cardType = 'downCards';
  }
  if (currentPlayer.downCards.length == 0 && currentPlayer.endCards.length > 0) {
    cardType = 'endCards';
  }
  currentPlayer.noPlay = false;
  let playableCard = [];
  if (!restingPlayer.noPlay) {
    if (openCard != null) {
      checkCard = convertClothedCard(openCard.substring(1));
    }
    players[0][cardType].forEach((compCard) => {
      const playCard = convertClothedCard(compCard.substring(1));
      if (playCard != 2 || playCard != 10) {
        if (playCard >= checkCard) {
          playableCard.push(compCard);
        }
      }
      if (playableCard.length === 0) {
        if (playCard === '2') {
          console.log('Should add special card');
          playableCard.push(compCard);
          accepted = 'startover';
        }
        if (playCard === '10') {
          console.log('Should add special card');
          playableCard.push(compCard);
          accepted = 'destroy';
        }
      }
    });
  }
  if (restingPlayer.noPlay) {
    playableCard = [...currentPlayer[cardType]];
    openCard = null;
  }
  if (playableCard.length > 0) {
    playableCard = playableCard.sort(compSorter);
    const moveToPlayed = currentPlayer[cardType].splice(currentPlayer[cardType].findIndex(card => card === playableCard[0]), 1)[0];
    playedCards.push(moveToPlayed);
    openCard = playedCards.slice(-1)[0];
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`;
    }
    if (deck.length > 0 && currentPlayer[cardType].length < 3) {
      const newCard = deck.pop();
      currentPlayer[cardType].push(newCard);
    }
  } else {
    currentPlayer.cards = [...currentPlayer.cards, ...playedCards];
    playedCards.length = 0;
    openCard = null;
    currentPlayer.noPlay = true;
  }
  if (currentPlayer.noPlay) {
    openCard = null;
    if (deck.length === 0) {
      deckHolder.innerHTML = `<img class='card' src='cards/${openCard}.svg'>`;
    } else {
      deckHolder.innerHTML = `<img class='card' src='cards/RED_BACK.svg'><img class='card' src='cards/${openCard}.svg'>`;
    }
  }
  if (currentPlayer.cards.length >= 0) {
    render('cards', currentPlayer);
  }
  if (currentPlayer.cards.length === 0 && currentPlayer.downCards.length > 0) {
    render('downCards', currentPlayer);
  }
  if (currentPlayer.downCards.length === 0 && currentPlayer.endCards.length > 0) {
    render('downCards', currentPlayer);
    render('endCards', currentPlayer);
  }
  if (currentPlayer.endCards.length === 0) {
    cpuEndCardHolder.innerHTML = '<h1>Winner!!!</h1>';
  }
  if (accepted === 'startover') {
    openCard = null;
    render(cardType, currentPlayer);
    setTimeout(() => {
      computerTurn();
    }, 1000);
  } else if (accepted === 'destroy') {
    render(cardType, currentPlayer);
    playedCards.length = 0;
    openCard = null;
    setTimeout(() => {
      computerTurn();
    }, 1000);
  } else {
    currentPlayer.isTurn = !currentPlayer.isTurn;
    restingPlayer.isTurn = !restingPlayer.isTurn;
  }
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

function render(cardType, player) {
  htmlContent = '';
  let htmlType;
  player.name === "Player 1" ? htmlType = 'input' : htmlType = 'image';
  if(player.name === 'CPU Player') {
    player[cardType].forEach((card) => {
      htmlContent += `<${htmlType} id="${card}" type="image" src='cards/RED_BACK.svg'/>`;
    });
  } else {
    player[cardType].forEach((card) => {
      htmlContent += `<${htmlType} id="${card}" type="image" src='cards/${card}.svg'/>`;
    });
  }
  if (cardType === 'cards') {
    player.name === 'CPU Player' ? cpuCardHolder.innerHTML = htmlContent : playerCardHolder.innerHTML = htmlContent;
    if (player.name === 'Player 1') {
      player[cardType].forEach((card) => {
        const playCard = document.querySelector(`#${card}`);
        playCard.addEventListener('click', () => {
          playersTurn(playCard.id);
        });
      });
    }
  }
  if (cardType === 'downCards') {
    player.name === 'CPU Player' ? cpuOpenCardHolder.innerHTML = htmlContent : playerOpenCardHolder.innerHTML = htmlContent;
    if (player.name === 'Player 1') {
      player.downCards.forEach((card) => {
        const playCard = document.querySelector(`#${card}`);
        playCard.addEventListener('click', () => {
          playDownCard(playCard.id);
        });
      });
    }
  }
  if (cardType === 'endCards') {
    player.name === 'CPU Player' ? cpuEndCardHolder.innerHTML = htmlContent : playerEndCardHolder.innerHTML = htmlContent;
    if (player.name === 'Player 1') {
      player.endCards.forEach((card) => {
        const playCard = document.querySelector(`#${card}`);
        playCard.addEventListener('click', () => {
          playEndCard(playCard.id);
        });
      });
    }
  }
}

function allowedPlay(card) {
  let checkCard = 0;
  let playCard = convertClothedCard(card.substring(1));
  if (openCard != null) checkCard = convertClothedCard(openCard.substring(1));
  if (playCard === '2') {
    return 'startover';
  }
  if (playCard === '10') {
    return 'destroy'
  }
  if (playCard >= checkCard) {
    return 'play';
  }
  return false;
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

const startButton = document.querySelector('.startgame');
startButton.addEventListener('click', () => {
  createDeck();
  firstDeal();
  startButton.style.display = 'none';
});
