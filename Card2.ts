
// Suits
export var suits = ["hearts", "diamonds", "spades", "clubs"];
export var numSuits = suits.length;

// Name and Value of card
export var numValues = 13;
var cardNames = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cardNumValues : number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
export var cardValues = [];

export enum CardFaceDirection
{
	Down,
	Up
}

/* Defintion of the Value of a card */
export class CardValue {
	numValue: number;
	name: string;
	constructor(numValue: number, name: string) {
	this.numValue = numValue;
	this.name = name;
	}
}

/* Definition of a card */
export class Card2 {
	suit: string;
	value: CardValue;
	el;
	direction: CardFaceDirection;
	constructor(suit, value, el) {
	this.suit = suit;
	this.value = value;
	this.el = el;
	this.direction = CardFaceDirection.Up;
	}
}

// Creates the set of CardValue (numeric value, name value) objects
export function initializeCardData()
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







