/*
/// <reference path="./Card2.ts" />
/// <reference path="./Deck.ts" />
*/
/* Remove '.js' for React */
import {Card2, numSuits, numValues, cardValues, suits, initializeCardData, CardFaceDirection,CardValue} from "./Card2.js"
import {Deck} from "./Deck.js"

// Test Comment

export enum PlayerAction
{
	NoAction,
	Deal,
	Hit,
	Stay,
	DoubleDown,
	InitiateBlackJackView
}

export enum HandState
{
	NotStarted,
	PreDeal,
	PostDeal,
	PlayerActive,
	DealerActive,
	Complete,
	PlayerActivePlusHit
}

enum HandOutcome
{
	NoResult = "NO RESULT",
	PlayerWon = "PLAYER WON",
	PlayerTied = "PLAYER TIED",
	PlayerLost = "PLAYER LOST"
}

// jsImpl determines whether the app is a native Javascript app which needs to update the DOM itsel
// Callers, like Angular, can call setJsImpl to take ownership of the display/DOM
let jsImpl: boolean = true;

export function setJsImpl(newValue: boolean)
{
	jsImpl = newValue;
}

export class PlayerHand
{
	cards: Card2[] = [];

	handTotal: number = 0;
	handHasAce: boolean = false;
	handResult: string = "NoResult";
	hResult: HandOutcome = HandOutcome.NoResult;
	handBet: number = 0;
	handWin: number = 0;
	callbackObj: bar3 = null;
	
//	displayParent: HTMLElement = document.createElement("p");
	
	constructor()
	{
		;
	}

    addCallbackObject(callbackObj: bar3)
    {
	   this.callbackObj = callbackObj;
    }

    turnHoleCardUp()
    {
	   if(this.cards.length > 0)
       {
	      this.cards[0].direction = CardFaceDirection.Up;
          this.callbackObj.setDealerHoleCardDirection.call(this.callbackObj);
       }
    }

    removeCardFromHand()
    {
	   let newCard = this.cards.pop();
       if(newCard !== undefined)
       {
          this.callbackObj.cardRemovedFromHand.call(this.callbackObj, newCard);
       }
    }

	// Calculation is a mess right now.
	addCardToHand(newCard: Card2)
	{
		console.log("Add Card to Hand");	
		
		this.cards.push(newCard);

		this.handHasAce = false;
		this.handTotal = 0
		for(let i: number = 0; i < this.cards.length; i++)
		{
			if(this.handHasAce === false && this.cards[i].value.numValue === 11)
			{
				this.handTotal = this.handTotal + 11;
				this.handHasAce = true;
			}
			else
			{
				if(this.cards[i].value.numValue === 11)
				{
					this.handTotal = this.handTotal + 1;
				}
				else
				{
				   this.handTotal = this.handTotal + this.cards[i].value.numValue;
	            }
			}
		}
		if(this.handHasAce === true && this.handTotal > 21)
		{
			this.handTotal = this.handTotal - 10;
		}
		console.log("Hand Total: " + this.handTotal);
	    this.callbackObj.test.call(this.callbackObj);
	}

}


export class Player2 
{

	hands: PlayerHand[] = [];

	handHasAce: boolean = false;
	name: string;
	role: number = 0;
	bankRoll: number = 100;
	playerBet: number = 5;
	constructor(playerName: string, playerRole: number)
	{
		console.log("Built Player");

		this.name = playerName;
		this.role = playerRole;
	}
	
	addHandToPlayer(pHand: PlayerHand)
	{
		this.hands.push(pHand);
	}
	
	// This is really reset the player hand right now.  We'll have to figure out what to do when there are multiple hands.
	removeHandFromPlayer()
	{
		while(this.hands[0].cards.length > 0)
		{
			this.hands[0].removeCardFromHand();
		}
//		this.hands.pop();
        this.hands[0].handResult = "NoResult";
        this.hands[0].hResult = HandOutcome.NoResult;
	}


}





interface bar3
{
	test(thisArg: bar3): void;
	setDealerHoleCardDirection(thisArg: bar3): void;
	cardRemovedFromHand(removedCard: Card2): void;
}

interface addCardInView
{
	(message: string) : void;
}	

function sayHi(callback: addCardInView)
{
	callback("ADDING CARD IN VIEW");
}

function testCallBack(message: string) : void
{
	console.log(message);
}

export class BlackJackGame
{
	d2: Player2;   // Dealer
	p2: Player2[] = [];       // Array of Players
	firstHand: boolean;
	hState: HandState;
    testDeck!: Deck;

	
	constructor ()
	{
		this.firstHand = true;
		this.hState = HandState.NotStarted;
		this.testDeck = new Deck("BJ1 Deck");
		this.d2 = new Player2("dealer", 1);
		this.d2.addHandToPlayer(new PlayerHand());
		this.p2[0] = new Player2("player", 0);
		this.p2[0].addHandToPlayer(new PlayerHand());
	}
	
	dealCard(pHand: PlayerHand, cFace: CardFaceDirection)
	{

	    let myCard: Card2 = this.testDeck.myDeck.pop()!;

        if(cFace === CardFaceDirection.Down)
        {
           myCard.direction = CardFaceDirection.Down;
        }
	    pHand.addCardToHand(myCard);
		
	}

}

export let bj1: BlackJackGame;



function startBlackJack()
{
	console.log("Start BlackJack!");

// Deal first card.
    bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Down);

    bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);	

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);

    bj1.hState = HandState.PostDeal;
    // Do Post Deal Activities;

    bj1.hState = HandState.PlayerActive;
}

let startOfGame: boolean = true;

export function executeHand(action: PlayerAction)
{
	console.log("execute Hand");
	
    if(startOfGame)
    {
       bj1 = new BlackJackGame();
       startOfGame = false;
    }
	
	switch(bj1.hState)
	{
		case HandState.NotStarted:
		   initializeCardData();
//		   createBlackJackGame();
           bj1.hState = HandState.PreDeal;

           // Enable Deal Button
		  break;
        
        case HandState.PreDeal:
          if(action === PlayerAction.Deal)
          {
	if(bj1.firstHand)
	{
		bj1.firstHand = false;
//		createBlackJackGame();
	}
	else
	{

// Clear table by getting rid of old hands and creating new hands - but NOT PLAYERS!
// If we remove the cards, should we delete the hands and create new ones.
bj1.d2.removeHandFromPlayer();
bj1.p2[0].removeHandFromPlayer();



    }

//	           createBlackJackGame();
               bj1.testDeck.createDeck();
               bj1.testDeck.shuffleDeck();

			bj1.p2[0].hands[0].handBet = bj1.p2[0].playerBet;
			bj1.p2[0].bankRoll = bj1.p2[0].bankRoll - bj1.p2[0].playerBet;
	        startBlackJack();

            // update hState;
            // Enable proper buttons
            if(bj1.d2.hands[0].handTotal === 21 || bj1.p2[0].hands[0].handTotal === 21)  // Dealer Black Jack or Player Black Jack (No double/no Insurance)
            {
	          bj1.hState = HandState.Complete;
            }
            else
            {
              bj1.hState = HandState.PlayerActive;
            }
          }
          break;

        case HandState.PlayerActive:
        case HandState.PlayerActivePlusHit:
          switch(action)
          {
	         case PlayerAction.Hit:
                executePlayerAction(action);
                bj1.hState = HandState.PlayerActivePlusHit;
                if(bj1.p2[0].hands[0].handTotal > 21)
                {
	               bj1.hState = HandState.Complete;
                }
             break;
 
             case PlayerAction.Stay:
               executePlayerAction(action)
               
              bj1.hState = HandState.DealerActive; 
               break;

            case PlayerAction.DoubleDown:
                executePlayerAction(action);
	               bj1.hState = HandState.Complete;
                if(bj1.p2[0].hands[0].handTotal > 21)
                {
	               bj1.hState = HandState.Complete;
                }
                else
                {
	               bj1.hState = HandState.DealerActive;
                }
             break;
          }
          break;
		
	}
	
	while(bj1.hState === HandState.DealerActive)
	{
      // Dealer Active
      // First, flip dealers hole card over

      bj1.d2.hands[0].turnHoleCardUp();
      if(bj1.d2.hands[0].handTotal >= 17)
      {            
        bj1.hState = HandState.Complete;
      }
      else
      {
         bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);
      }

	}
	
	switch(bj1.hState)
	{
		case HandState.PostDeal:
		case HandState.PlayerActive:
		case HandState.Complete:
		   evaluateHand();
           break;
	}
	
	if(bj1.hState === HandState.Complete)
	{
        bj1.d2.hands[0].turnHoleCardUp();
		bj1.hState = HandState.PreDeal;

	}

	
}



function evaluateHand()
{
	// Black Jack will come out as tie vs. a 3+ Card 21.
	if(bj1.d2.hands[0].handTotal > 21)
	{
	   bj1.p2[0].hands[0].handResult = "PLAYER WON!";
       bj1.p2[0].hands[0].handWin = bj1.p2[0].hands[0].handBet;
       bj1.p2[0].bankRoll = bj1.p2[0].bankRoll + bj1.p2[0].hands[0].handBet + bj1.p2[0].hands[0].handWin;
       bj1.hState = HandState.Complete;
    }
    else if(bj1.p2[0].hands[0].handTotal > 21)
    {
	   bj1.p2[0].hands[0].handResult = "PLAYER BUSTED!";
       bj1.hState = HandState.Complete;
    }
    else if((bj1.p2[0].hands[0].handTotal > bj1.d2.hands[0].handTotal) && bj1.hState === HandState.Complete)
    {
	   bj1.p2[0].hands[0].handResult = "PLAYER WON!";
       bj1.p2[0].hands[0].handWin = bj1.p2[0].hands[0].handBet;
       bj1.p2[0].bankRoll = bj1.p2[0].bankRoll + bj1.p2[0].hands[0].handBet + bj1.p2[0].hands[0].handWin;
    }
    else if((bj1.p2[0].hands[0].handTotal === bj1.d2.hands[0].handTotal) && bj1.hState === HandState.Complete)
    {
	   bj1.p2[0].hands[0].handWin = 0;
       bj1.p2[0].bankRoll = bj1.p2[0].bankRoll + bj1.p2[0].hands[0].handBet + bj1.p2[0].hands[0].handWin;
	   bj1.p2[0].hands[0].handResult = "PLAYER TIED!";
    }
    else if((bj1.p2[0].hands[0].handTotal < bj1.d2.hands[0].handTotal) && bj1.hState === HandState.Complete)
    {
	   bj1.p2[0].hands[0].handResult = "PLAYER LOST!";
    }
    else if(bj1.hState === HandState.Complete)
    {
	   bj1.p2[0].hands[0].handResult = "SHOULD NOT BE HERE!";
    }

}

function hitBlackJack()
{
	console.log("Hit BlackJack!");

	bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);

	console.log("Player total after hit = " + bj1.p2[0].hands[0].handTotal);

}

function doubleDownBlackJack()
{
	console.log("Double Down BlackJack!");

	bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);

	console.log("Player total after double = " + bj1.p2[0].hands[0].handTotal);

}


export function executePlayerAction(action: PlayerAction)
{
	switch (action)
	{
		case PlayerAction.Deal:
		{
			bj1.p2[0].hands[0].handBet = bj1.p2[0].playerBet;
			bj1.p2[0].bankRoll = bj1.p2[0].bankRoll - bj1.p2[0].playerBet;
			startBlackJack();
			break;
		}
		case PlayerAction.Hit: 
		{
			hitBlackJack();
			break;
		}
		case PlayerAction.Stay:
		{
			console.log("Stay");
			break;
		}
		case PlayerAction.DoubleDown:
		{
			console.log("Double Down");
			bj1.p2[0].hands[0].handBet = bj1.p2[0].hands[0].handBet + bj1.p2[0].playerBet;
			bj1.p2[0].bankRoll = bj1.p2[0].bankRoll - bj1.p2[0].playerBet;
			doubleDownBlackJack();
			break;
		}
	}
	
	// Probably should have a higher level gamePlay function that potentially takes player input and then calls executePlayerAction
	// And also would manage the dealer action via a loop and reuse the executePlayerAction function
	// Need to add Game State - 'PlayerActive', 'PlayerBust', 'DealerActive', etc.
	// executePlayerAction would update Game State after each action/card to move the game along
	// Initially, only Hit, Stay.  No Insurance(Even Money), No Split, No Double, No Surrender.  Does Dealer Hit Soft 17?
	// Does Dealer Check for Black Jack if it has an Ace?
}

