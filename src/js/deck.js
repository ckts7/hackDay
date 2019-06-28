const hearts = [];
const diamonds = [];
const spades = [];
const clubs = [];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const colors = [hearts, diamonds, spades, clubs];
const deck = [];
const cardHolder = document.querySelector('.card-holder');

function createDeck() {
  let htmlContent = '';
  for (let i = 0; i < 13; i++) {
    hearts.push(`${values[i]}H`);
    diamonds.push(`${values[i]}D`);
    spades.push(`${values[i]}S`);
    clubs.push(`${values[i]}C`);
  }
  colors.forEach((color) => {
    color.forEach((card) => {
      deck.push(card);
      console.log(cardHolder);
    });
  });
  const shuffledDeck = shuffle(deck);
  shuffledDeck.forEach((card) => {
    htmlContent += `<img class='card' src='cards/${card}.svg'></img>`;
  });
  cardHolder.innerHTML = htmlContent;
  return shuffledDeck;
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


module.exports.createDeck = createDeck;
