
// Suits
export var suits = ["hearts", "diamonds", "spades", "clubs"];
export var numSuits = suits.length;

// Name and Value of card
export var numValues = 13;
/*
var cardNames = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cardNumValues : number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
*/
var cardNames = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cardNumValues : number[] = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
export var cardValues = [];

export let spades = ['\u{1F0A1}', '\u{1F0A2}', '\u{1F0A3}', '\u{1F0A4}', '\u{1F0A5}', '\u{1F0A6}', '\u{1F0A7}', '\u{1F0A8}',
              '\u{1F0A9}', '\u{1F0AA}', '\u{1F0AB}', '\u{1F0AD}', '\u{1F0AE}']

export let hearts = ['\u{1F0B1}', '\u{1F0B2}', '\u{1F0B3}', '\u{1F0B4}', '\u{1F0B5}', '\u{1F0B6}', '\u{1F0B7}', '\u{1F0B8}',
              '\u{1F0B9}', '\u{1F0BA}', '\u{1F0BB}', '\u{1F0BD}', '\u{1F0BE}']

export let diamonds = ['\u{1F0C1}', '\u{1F0C2}', '\u{1F0C3}', '\u{1F0C4}', '\u{1F0C5}', '\u{1F0C6}', '\u{1F0C7}', '\u{1F0C8}',
              '\u{1F0C9}', '\u{1F0CA}', '\u{1F0CB}', '\u{1F0CD}', '\u{1F0CE}']

export let clubs = ['\u{1F0D1}', '\u{1F0D2}', '\u{1F0D3}', '\u{1F0D4}', '\u{1F0D5}', '\u{1F0D6}', '\u{1F0D7}', '\u{1F0D8}',
              '\u{1F0D9}', '\u{1F0DA}', '\u{1F0DB}', '\u{1F0DD}', '\u{1F0DE}']

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
	cardRepString: string;
	constructor(suit, value, el, cardRepString) {
	this.suit = suit;
	this.value = value;
	this.el = el;
	this.direction = CardFaceDirection.Up;
	this.cardRepString = cardRepString;
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







