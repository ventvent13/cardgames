/*
/// <reference path="./Card2.ts" />
*/
import {Card2, numSuits, numValues, cardValues, suits} from "./Card2.js"








// Single deck of cards
export class Deck {
	greeting: string;
	myDeck = [];
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
		this.myDeck.push(localCard);
	  }
    }
  }

  // Show all cards in deck
  showDeck(dispElement: HTMLElement)
  {
    for(let i = 0; i < this.myDeck.length; i++)
    {
	  console.log("Deck[" + i + "]:", this.myDeck[i].value, this.myDeck[i].suit);
//	  document.body.appendChild(myDeck[i].el);
	  dispElement.appendChild(this.myDeck[i].el);
    }
  }


  shuffleDeck()
  {
	// shuffle the cards
    for (let i = this.myDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = this.myDeck[i];
    this.myDeck[i] = this.myDeck[j];
    this.myDeck[j] = temp;
    }
  }

}



