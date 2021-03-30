import { Component, OnInit } from '@angular/core';
import { Card2, CardValue, initializeCardData } from './Card2';
import { Deck } from './Deck';
import { executeHand, executePlayerAction, PlayerAction, BlackJackGame, bj1, PlayerHand, Player2 } from './Cards';





@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.css']
})




export class Card2Component implements OnInit {
	
	testCard: Card2;
	testDeck: Deck;
	deckCard: Card2;
	handCard: Card2;
	handCards: Card2 [];
	playerCards: Card2 [];
	dealerHand: PlayerHand;
	playerHand: PlayerHand;
	dealerScore;
	playerScore;
	
	playerHit()
	{
		executeHand(PlayerAction.Hit);
	}
	
	playerStay()
	{
		executeHand(PlayerAction.Stay);
	}
	
	deal()
	{
		executeHand(PlayerAction.Deal);
	this.handCards = bj1.d2.hands[0].cards;
	this.playerCards = bj1.p2[0].hands[0].cards;
	this.dealerHand = bj1.d2.hands[0];
	this.playerHand = bj1.p2[0].hands[0];
	}


  constructor() 
  { 
//	initializeCardData(); 

	initializeCardData();
	executeHand(PlayerAction.NoAction);


	executeHand(PlayerAction.Deal);
	this.handCard = bj1.d2.hands[0].cards[0];
	this.handCards = bj1.d2.hands[0].cards;
	this.playerCards = bj1.p2[0].hands[0].cards;
	this.dealerHand = bj1.d2.hands[0];
	this.playerHand = bj1.p2[0].hands[0];
	
	
	console.log("TEST: " + this.handCards[0].suit);
  }

  ngOnInit(): void {
  }

}
