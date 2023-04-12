const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");// create a new div
    newDiv.classList.add(color); // give it a class attribute for the value we are looping over
    newDiv.addEventListener("click", handleCardClick);    // call a function handleCardClick when a div is clicked on
    gameContainer.append(newDiv); // append the div to the element with an id of game
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  if (noClicking) return;
  if (event.target.classList.contains("Flipped")) return;
  // you can use event.target to see which element was clicked
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if ((!card1) || (!card2)){
  currentCard.classList.add("Flipped");
  card1 = card1 || currentCard;
  card2 = currentCard === card1 ? null : currentCard;
  }


if (card1 && card2){
  //noClicking = true;

  let card1Class = card1.className;
  let card2Class = card2.className;
  
  if(card1Class === card2Class){ //Every time I ran the game with this is, after the fisrt pair, all of the following cards did not flip back after 1 second, stayed displayed, no flip back
    cardsFlipped+=2;
    //card1.removeElementListener("click", handleCardClick);
    //card2.removeElementListener("click", handleCardClick);
    card1 = null;
    card2 = null;
    //noClicking = false;
  }
    else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("Flipped");
        card2.classList.remove("Flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

if (cardsFlipped === COLORS.length) alert("game over!");

  // console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);
