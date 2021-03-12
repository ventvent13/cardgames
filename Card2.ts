
// Suits
var suits = ["hearts", "diamonds", "spades", "clubs"];
var numSuits = suits.length;

// Name and Value of card
var numValues = 13;
var cardNames = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cardNumValues : number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
var cardValues = [];

/* Defintion of the Value of a card */
class CardValue {
	numValue: number;
	name: string;
	constructor(numValue: number, name: string) {
	this.numValue = numValue;
	this.name = name;
	}
}

/* Definition of a card */
class Card2 {
	suit: string;
	value: CardValue;
	el;
	constructor(suit, value, el) {
	this.suit = suit;
	this.value = value;
	this.el = el;
	}
}

// Creates the set of CardValue (numeric value, name value) objects
function initializeCardData()
{
for(let i =0; i <  numValues; i++)
{
	let cardValFiller = new CardValue(cardNumValues[i], cardNames[i]);
	cardValues[i] = cardValFiller;
}

for(let i = 0; i < numValues; i++)
{
	console.log(cardValues[i]);
}
}







