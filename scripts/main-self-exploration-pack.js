import {delay} from './utils.js';

let title = document.querySelector("#title");
let next = document.querySelector("#next");
let previous = document.querySelector("#previous");
let cardContainer = document.querySelector("#card-container");
const totalCards = 3;
let cardNumber = 1;
let newCard;

async function showNext(event) {
    const cards = [];
    for (let i = 1; i <= totalCards; i++) {
        cards[i] = `../../images/wnrs/card-${i}.png`;
    }

    if (window.getComputedStyle(title).display !== 'none') {
        title.classList.add("hidden");
    }

    if (cardNumber <= totalCards) {
        if (cardContainer.contains(newCard)) {
            newCard.classList.remove("move-in");
            newCard.classList.add("move-out");
            await delay(200);
            newCard.remove();
        }
        
        newCard = document.createElement("img");
        newCard.src = cards[cardNumber];
        newCard.classList.add("card", "move-in");
        cardContainer.append(newCard);   
        cardNumber++;
    }
    else {
        newCard.remove();
        title.classList.remove("hidden");
        cardNumber = 1;
    }
}

next.addEventListener("click", showNext);



