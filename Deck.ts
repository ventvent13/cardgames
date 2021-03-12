/// <reference path="./Card2.ts" />

// import * as card from "./Cards.css"







// Single deck of cards
class Deck {
	greeting: string;
	constructor(greeting: string) {this.greeting = greeting;}


  // Creates a deck of cards
  createDeck()
  {
    for(let i = 0; i < numSuits; i++)
    {	
	  for(let j = 0; j < numValues; j++)
	  {

		let el = document.createElement("div");
		el.setAttribute("id", cardValues[j].name + " " + suits[i]);
		el.setAttribute("class", "card");
        el.innerHTML = cardValues[j].name + "<br />" + suits[i];
		let localCard = new Card2(suits[i], cardValues[j], el);
		console.log(localCard.value, localCard.suit);
		myDeck.push(localCard);
	  }
    }
  }

  // Show all cards in deck
  showDeck(dispElement: HTMLElement)
  {
    for(let i = 0; i < myDeck.length; i++)
    {
	  console.log("Deck[" + i + "]:", myDeck[i].value, myDeck[i].suit);
//	  document.body.appendChild(myDeck[i].el);
	  dispElement.appendChild(myDeck[i].el);
    }
  }


  shuffleDeck()
  {
	// shuffle the cards
    for (let i = myDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = myDeck[i];
    myDeck[i] = myDeck[j];
    myDeck[j] = temp;
    }
  }

}



