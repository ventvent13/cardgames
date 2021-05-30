/*
/// <reference path="./Card2.ts" />
/// <reference path="./Deck.ts" />
*/
/* Remove '.js' for React */
import {Card2, numSuits, numValues, cardValues, suits, initializeCardData, CardFaceDirection,CardValue} from "./Card2.js"
import {Deck} from "./Deck.js"
import {bj1view} from "./BJView.js"

// Test Comment

export enum PlayerAction
{
	NoAction,
	Deal,
	Hit,
	Stay,
	DoubleDown,
	InitiateBlackJackView,
	DealerAction
}

export enum HandState
{
	NotStarted,
	PreDeal,
	PostDeal,
	PlayerActive,
	PlayerActionsComplete,
	DealerActive,
	Complete,
	PlayerActivePlusHit,
	PlayerPaid,
	PlayerBlackJack
}

enum HandOutcome
{
	NoResult = "NO RESULT",
	PlayerWon = "PLAYER WON",
	PlayerTied = "PLAYER TIED",
	PlayerLost = "PLAYER LOST"
}

export enum RoundState
{	
	PreDeal,
	PostDeal,
	DealerBlackJack,
	PlayersActive,
	DealerActive,
	ActionComplete
}

enum GameState
{
	Uninitialized,
	Ready,   // New Players, Player change bets.
	Active,
	Complete
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
	hState: HandState = HandState.NotStarted;
	
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
	      if(this.callbackObj)
          {
             this.callbackObj.cardRemovedFromHand.call(this.callbackObj, newCard);
          }
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
		if(this.callbackObj)
		{	    
			this.callbackObj.test.call(this.callbackObj);
		}
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
	activeHand: number = 0;
	
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
	// Should this be removeHandsFromPlayer or add in a new removeHandsFromPlayer....
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

	removeHandsFromPlayer()
	{
		let i: number = 0;
		for(i = 0; i < this.hands.length; i++)
		{
		   while(this.hands[i].cards.length > 0)
		   {
			   this.hands[i].removeCardFromHand();
		   }
//		this.hands.pop();
           this.hands[i].handResult = "NoResult";
           this.hands[i].hResult = HandOutcome.NoResult;
           this.hands[i].hState = HandState.NotStarted;
           this.hands[i].handTotal = 0;
        }
	}

}


interface bar3
{
	test(thisArg: bar3): void;
	setDealerHoleCardDirection(thisArg: bar3): void;
	cardRemovedFromHand(removedCard: Card2): void;
}

export class BlackJackGame
{
	d2: Player2;   // Dealer
	p2: Player2[] = [];       // Array of Players
	firstHand: boolean;
	hState: HandState;
    testDeck!: Deck;
    rState: RoundState;
    gState: GameState;
    activePlayer: number = 0;

	
	constructor ()
	{
		this.firstHand = true;
		this.gState = GameState.Uninitialized;
		this.hState = HandState.NotStarted;
		this.testDeck = new Deck("BJ1 Deck");
		this.d2 = new Player2("dealer", 1);
		this.d2.addHandToPlayer(new PlayerHand());
		this.p2[0] = new Player2("player", 0);
		// Hard code player for 2 hands right now.
		this.p2[0].addHandToPlayer(new PlayerHand());
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
    let i: number = 0;

    for(i = 0; i < bj1.p2[0].hands.length; i++)
    {
       bj1.dealCard(bj1.p2[0].hands[i], CardFaceDirection.Up);
    }

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Down);

    for(i = 0; i < bj1.p2[0].hands.length; i++)
    {
       bj1.dealCard(bj1.p2[0].hands[i], CardFaceDirection.Up);
    }

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);

    bj1.hState = HandState.PostDeal;
    for(i = 0; i < bj1.p2[0].hands.length; i++)
    {
	   bj1.p2[0].hands[i].hState = HandState.PostDeal;
    }
    
    // Do Post Deal Activities;

    bj1.hState = HandState.PlayerActive;
    for(i = 0; i < bj1.p2[0].hands.length; i++)
    {
	   bj1.p2[0].hands[i].hState = HandState.PlayerActive;
    }
}

function processDealerBlackJack(): void
{
		// Really need to loop through all players and all hands
		// TODO
		bj1.hState = HandState.Complete;
		bj1.p2[0].hands[0].hState = HandState.Complete;
		bj1.rState = RoundState.ActionComplete;
		bj1.d2.hands[0].turnHoleCardUp();
		evaluateHand(bj1.p2[0].hands[0]);
		bj1.hState = HandState.PreDeal;
		bj1.p2[0].hands[0].hState = HandState.PreDeal;
		bj1.rState = RoundState.PreDeal;
}

function playerHandAlive(): boolean
{
	let alive: boolean = false;
	let i: number = 0;
	
	for(i = 0; i < bj1.p2[0].hands.length; i++)
	{
		if(bj1.p2[0].hands[i].hState === HandState.PlayerActionsComplete)
		{
			alive = true;
		}
	}
	return alive;
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

let dealerFirstTime: boolean = false;

function processDealerActive(): void
{
	
   if(dealerFirstTime)
   {
      setTimeout(function () 
      {
         executeHand(PlayerAction.DealerAction);dealerFirstTime = false;
      }, 1000);
	 bj1.d2.hands[0].turnHoleCardUp();
   }
   else
   {
	  if(playerHandAlive())
	  {
//    while(bj1.rState === RoundState.DealerActive)
//	{
      // Dealer Active
         if(bj1.d2.hands[0].handTotal >= 17)
         {
	     let i:number = 0;
         // Set player hands which haven't been paid to Complete so that they will be processed - we could just pay them here.
            for(i = 0; i < bj1.p2[0].hands.length; i++)
            {
	           if(bj1.p2[0].hands[i].hState != HandState.PlayerPaid)
               {
                  bj1.p2[0].hands[i].hState = HandState.Complete;		
               }

            }
            bj1.hState = HandState.Complete;
            bj1.rState = RoundState.ActionComplete;
         }
         else
         {

            bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);
      setTimeout(function () 
      {
         executeHand(PlayerAction.DealerAction);dealerFirstTime = false;
      }, 1000);
         }

//	}
	   }
	   else
	   {
		  bj1.hState = HandState.Complete;
		  bj1.rState = RoundState.ActionComplete
	   }
   }
}

function updateHand(): boolean
{
	let i: number = bj1.p2[0].activeHand;
	let newHandIdentified: boolean = false;
	while(i < bj1.p2[0].hands.length && !newHandIdentified)
	{
	
	if(bj1.p2[0].hands[i].hState === HandState.PlayerActionsComplete || bj1.p2[0].hands[i].hState === HandState.Complete
	   || bj1.p2[0].hands[i].hState === HandState.PlayerPaid)
	{
		;  // No player hands need to be actioned
	}
	else
	{
		newHandIdentified = true;
		bj1.p2[0].activeHand = i;
		console.log("activeHand: " + i);
		return true;  // Player hands need to be actioned.
	}
	i++;
	
	}
	return(newHandIdentified);
}

let startOfGame: boolean = true;

export function executeHand(action: PlayerAction)
{
	console.log("execute Hand");
	
    if(startOfGame)
    {
       bj1 = new BlackJackGame();
       startOfGame = false;
       bj1.gState = GameState.Uninitialized;
    }
	
	switch(bj1.gState)
	{
		case GameState.Uninitialized:
		   initializeCardData();
           bj1.hState = HandState.PreDeal;
//           bj1.p2[0].hands[0].hState = HandState.PreDeal;
           bj1.rState = RoundState.PreDeal;
           bj1.gState = GameState.Ready;
           break;
		case GameState.Ready:
		case GameState.Active:
		default:
		
	switch(bj1.rState)
	{
        
        case RoundState.PreDeal:
          if(action === PlayerAction.Deal)
          {
	         if(bj1.firstHand)
	         {
		        bj1.firstHand = false;
	         }
	         else
	         {
                // Clear table by getting rid of old hands and creating new hands - but NOT PLAYERS!
                // If we remove the cards, should we delete the hands and create new ones.
                // Must get rid of all playerHands
                bj1.d2.removeHandFromPlayer();
                bj1.p2[0].removeHandsFromPlayer();
             }
dealerFirstTime = true;
              bj1.testDeck.createDeck();
              bj1.testDeck.shuffleDeck();

              bj1.activePlayer = 0;

              // Manage player bets per hand
			  bj1.p2[0].hands[0].handBet = bj1.p2[0].playerBet;
			  bj1.p2[0].bankRoll = bj1.p2[0].bankRoll - bj1.p2[0].playerBet;
	
			  bj1.p2[0].hands[1].handBet = bj1.p2[0].playerBet;
			  bj1.p2[0].bankRoll = bj1.p2[0].bankRoll - bj1.p2[0].playerBet;
	
	          startBlackJack();
              bj1.p2[0].activeHand = 0;

              // Post Deal activity - check for dealer black jack and if not find the first active player hand, processing black jacks along the way.
              bj1.rState = RoundState.PostDeal;
              if(bj1.d2.hands[0].handTotal === 21) // Dealer Black Jack
              { 
	             bj1.rState = RoundState.DealerBlackJack;
              } else 
              {
	             while(updateHand() && bj1.rState == RoundState.PostDeal)
                 {
	                if (bj1.p2[0].hands[bj1.p2[0].activeHand].handTotal === 21  && bj1.p2[0].hands[bj1.p2[0].activeHand].cards.length == 2)
                    {
	                   bj1.hState = HandState.Complete;
                       bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.PlayerBlackJack;
                       evaluateHand(bj1.p2[0].hands[bj1.p2[0].activeHand]);
                    } else
                    {
                       bj1.hState = HandState.PlayerActive;
                       bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.PlayerActive;
                       bj1.rState = RoundState.PlayersActive;
                    }
                 }
              }
          }
          break;

        case RoundState.PlayersActive:
//        case HandState.PlayerActivePlusHit:
          switch(action)  // After busts or Stay or DoubleDown find the next player hand to act and set activeplayer, activehand
          {
	         case PlayerAction.Hit:
                executePlayerAction(action);
                bj1.hState = HandState.PlayerActivePlusHit;
                bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.PlayerActivePlusHit;
                if(bj1.p2[0].hands[bj1.p2[0].activeHand].handTotal > 21)  // All status should happen when bust happens (maybe call evaluateHand()
                {
	               bj1.hState = HandState.Complete;
                   bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.Complete;
                   evaluateHand(bj1.p2[0].hands[bj1.p2[0].activeHand]);
                }
             break;
 
             case PlayerAction.Stay:
               executePlayerAction(action)
               
    //          bj1.hState = HandState.DealerActive; 
              bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.PlayerActionsComplete;
    //          bj1.rState = RoundState.DealerActive;
               break;

            case PlayerAction.DoubleDown:
                executePlayerAction(action);
                if(bj1.p2[0].hands[bj1.p2[0].activeHand].handTotal > 21)
                {
	               bj1.hState = HandState.Complete;
                   bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.Complete;
                   bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.Complete;
                   evaluateHand(bj1.p2[0].hands[bj1.p2[0].activeHand]);
                }
                else
                {
	               // Update HandState to PlayersActionComplete -- updateHand() will update the rState
//	               bj1.hState = HandState.DealerActive;
                   bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.PlayerActionsComplete;
//                   bj1.rState = RoundState.DealerActive;
                }
             break;
          }

          // Find next hand which is not a black jack, and process any black jacks found on the way because they don't require player action
          // Although, I suppose they really require the player to stay because he could double down or something.
          let newActiveHandisBJ: boolean = true;
          while(updateHand() && newActiveHandisBJ)
          {
	         if(bj1.p2[0].hands[bj1.p2[0].activeHand].handTotal === 21 && bj1.p2[0].hands[bj1.p2[0].activeHand].cards.length == 2)
	         {
		        newActiveHandisBJ = true;
	            bj1.hState = HandState.Complete;
                bj1.p2[0].hands[bj1.p2[0].activeHand].hState = HandState.PlayerBlackJack;
                evaluateHand(bj1.p2[0].hands[bj1.p2[0].activeHand]);
	         }
             else
             {
	            newActiveHandisBJ = false;
             }
          }

          // This just sets the RoundState
          if(updateHand())
          {
	         console.log("Player hands remain to be actioned...");
          }
          else
          {
	         console.log("No player hands to be actioned...");
             bj1.rState = RoundState.DealerActive;
             bj1.hState = HandState.DealerActive;
             // Set rState to RoundState.DealerActive
          }
          break;
		
	}
	break;
	}
	
	if(bj1.rState === RoundState.DealerActive)
	{
       processDealerActive();
	}
	
	if(bj1.rState == RoundState.DealerBlackJack)
	{
       processDealerBlackJack();
	}

    // Process all player hands which have not been paid yet.
    if(bj1.rState === RoundState.ActionComplete)
    {
        bj1.d2.hands[0].turnHoleCardUp();
        let i: number = 0;
        for(i = 0; i < bj1.p2[0].hands.length; i++)
        {
	       if(bj1.p2[0].hands[i].hState != HandState.PlayerPaid)
           {
              evaluateHand(bj1.p2[0].hands[i]);
           }
        }
		bj1.hState = HandState.PreDeal;
		bj1.rState = RoundState.PreDeal;
		bj1view.updateViewState();
    }
}

function evaluateHand(pHand: PlayerHand)
{
	// Black Jack will come out as tie vs. a 3+ Card 21.
	pHand.handWin = 0;
	if(pHand.hState === HandState.PlayerBlackJack)
	{
		pHand.handResult = "PLAYER BLACKJACK!";
       pHand.handWin = pHand.handBet;
       bj1.p2[0].bankRoll = bj1.p2[0].bankRoll + pHand.handBet + pHand.handWin;
       bj1.hState = HandState.Complete;
       pHand.hState = HandState.Complete;
       pHand.hState = HandState.PlayerPaid
	}
	if(bj1.d2.hands[0].handTotal > 21)
	{
	   pHand.handResult = "PLAYER WON!";
       pHand.handWin = pHand.handBet;
       bj1.p2[0].bankRoll = bj1.p2[0].bankRoll + pHand.handBet + pHand.handWin;
       bj1.hState = HandState.Complete;
       pHand.hState = HandState.Complete;
       pHand.hState = HandState.PlayerPaid
    }
    else if(pHand.handTotal > 21)
    {
	   pHand.handResult = "PLAYER BUSTED!";
       bj1.hState = HandState.Complete;
       pHand.hState = HandState.Complete;
       pHand.hState = HandState.PlayerPaid
    }
    else if((pHand.handTotal > bj1.d2.hands[0].handTotal) && bj1.rState === RoundState.ActionComplete)
    {
	   pHand.handResult = "PLAYER WON!";
       pHand.handWin = pHand.handBet;
       bj1.p2[0].bankRoll = bj1.p2[0].bankRoll + pHand.handBet + pHand.handWin;
       pHand.hState = HandState.PlayerPaid
    }
    else if((pHand.handTotal === bj1.d2.hands[0].handTotal) && bj1.rState === RoundState.ActionComplete)
    {
	   pHand.handWin = 0;
       bj1.p2[0].bankRoll = bj1.p2[0].bankRoll + pHand.handBet + pHand.handWin;
	   pHand.handResult = "PLAYER TIED!";
       pHand.hState = HandState.PlayerPaid
    }
    else if((pHand.handTotal < bj1.d2.hands[0].handTotal) && (bj1.rState === RoundState.ActionComplete))
    {
	   pHand.handResult = "PLAYER LOST!";
       pHand.hState = HandState.PlayerPaid
    }
    else if(pHand.hState === HandState.Complete)
    {
	   pHand.handResult = "SHOULD NOT BE HERE!";
    }

}

// Must update to use activeHand.
function hitBlackJack()
{
	console.log("Hit BlackJack!");
	bj1.dealCard(bj1.p2[0].hands[bj1.p2[0].activeHand], CardFaceDirection.Up);
	console.log("Player total after hit = " + bj1.p2[0].hands[bj1.p2[0].activeHand].handTotal);
}

function doubleDownBlackJack()
{
	console.log("Double Down BlackJack!");
	bj1.dealCard(bj1.p2[0].hands[bj1.p2[0].activeHand], CardFaceDirection.Up);
	console.log("Player total after double = " + bj1.p2[0].hands[bj1.p2[0].activeHand].handTotal);
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
			bj1.p2[0].hands[bj1.p2[0].activeHand].handBet = bj1.p2[0].hands[bj1.p2[0].activeHand].handBet + bj1.p2[0].playerBet;
			bj1.p2[0].bankRoll = bj1.p2[0].bankRoll - bj1.p2[0].playerBet;
			doubleDownBlackJack();
			break;
		}
	}
}

