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
	DoubleDown
}

enum HandState
{
	NotStarted,
	PreDeal,
	PostDeal,
	PlayerActive,
	DealerActive,
	Complete
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
	
	displayParent: HTMLElement = document.createElement("p");
	
	constructor()
	{
		;
	}

    addDisplayPosition(dParent: HTMLElement)
    {
	   this.displayParent = dParent;
    }

    removeCardFromHand()
    {
	   let newCard = this.cards.pop();
       if(newCard !== undefined)
       {
          this.displayParent.removeChild(newCard.el);
       }
    }

	// Calculation is a mess right now.
	addCardToHand(newCard: Card2)
	{
		console.log("Add Card to Hand");
		this.cards.push(newCard);
		this.displayParent.appendChild(newCard.el);  // Needs to be broken out into its own display method

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
		console.log("Hand Total: " + this.handTotal)
	}

}


export class Player2 
{

	hands: PlayerHand[] = [];

	handHasAce: boolean = false;
	name: string;
	role: number = 0;
	pElement: HTMLDivElement;
	pPosition!: HTMLDivElement;
	pName!: HTMLDivElement;
	bankRoll: number = 100;
	playerBet: number = 5;
	constructor(playerName: string, playerRole: number)
	{
		console.log("Built Player");

		this.name = playerName;
		this.role = playerRole;
		this.pElement = document.createElement("div");
//		this.hands[0] = pHand;
	}
	
	addHandToPlayer(pHand: PlayerHand)
	{
		this.hands.push(pHand);
	}
	
	removeHandFromPlayer()
	{
		while(this.hands[0].cards.length > 0)
		{
			this.hands[0].removeCardFromHand();
		}
		this.hands.pop();
	}


}


export class BlackJackGame
{
	d2: Player2;   // Dealer
	p2: Player2[] = [];       // Array of Players
	firstHand: boolean;
	hState: HandState;
	hitButton!: HTMLDivElement;
    stayButton!: HTMLDivElement;
    dealButton!: HTMLDivElement;
    ddButton!: HTMLDivElement;
    testDeck!: Deck;
	
	constructor ()
	{
		this.firstHand = true;
		this.hState = HandState.NotStarted;
		this.testDeck = new Deck("BJ1 Deck");
		this.d2 = new Player2("dealer", 1);
	}
	
	dealCard(pHand: PlayerHand, cFace: CardFaceDirection)
	{

	    let myCard: Card2 = this.testDeck.myDeck.pop()!;

        if(cFace === CardFaceDirection.Down)
        {
           //   myCard.el.textContent = "CARD BACK";

           // \u{1f0a0} is unicode for the card back - probably should make it a constant in Card2.ts and export it.

           // JAVASCRIPT_DISPLAY
           myCard.el.innerHTML = '\u{1f0a0}';
           myCard.direction = CardFaceDirection.Down;
        }
	    pHand.addCardToHand(myCard);
		
	}
	
	createHitButton()
	{
  // Player area also contains a set of buttons with the player's options.
  this.hitButton = document.createElement("input");
  this.hitButton.setAttribute("type","button");
  this.hitButton.setAttribute("id","hb1");
  this.hitButton.setAttribute("class", "button")
  this.hitButton.setAttribute("onclick","console.log('XXX Button'); window.play3(2);");
//  this.hitButton.setAttribute("onclick","console.log('Hit Button'); executeHand(PlayerAction.Hit);");
  this.hitButton.setAttribute("value","HIT BUTTON!");		
	}
	
	createStayButton()
	{
		  // Player area also contains a set of buttons with the player's options.
  this.stayButton = document.createElement("input");
  this.stayButton.setAttribute("type","button");
  this.stayButton.setAttribute("id","sb1");
  this.stayButton.setAttribute("class", "button")
  this.stayButton.setAttribute("onclick","console.log('Stay Button'); window.play3(3);");
  this.stayButton.setAttribute("value","Stay BUTTON!");
	}
	
    createDDButton()
	{
		  // Player area also contains a set of buttons with the player's options.
  this.ddButton = document.createElement("input");
  this.ddButton.setAttribute("type","button");
  this.ddButton.setAttribute("id","ddb1");
  this.ddButton.setAttribute("class", "button")
  this.ddButton.setAttribute("onclick","console.log('Double Down Button'); window.play3(4);");
  this.ddButton.setAttribute("value","DOUBLE DOWN!");
	}
	
	createDealButton()
	{
		  // Player area also contains a set of buttons with the player's options.
  this.dealButton = document.createElement("input");
  this.dealButton.setAttribute("type","button");
  this.dealButton.setAttribute("id","db1");
  this.dealButton.setAttribute("class", "button")
  this.dealButton.setAttribute("onclick","console.log('Deal Button'); window.play3(1);");
  this.dealButton.setAttribute("value","Deal BUTTON!");
	}

    // DISPLAY:  Need to rationalize this logic with the Angular logic - Probably should get the button by id instead of
    // attribute which we only have populated for the JAVASCRIPT_DISPLAY	
	disableHitButton()
	{
		const dbTemp = bj1.hitButton as HTMLInputElement;
        dbTemp.disabled = true;
	}

	enableHitButton()
	{
		const dbTemp = bj1.hitButton as HTMLInputElement;
        dbTemp.disabled = false;
	}
	
	disableStayButton()
	{
		const dbTemp = bj1.stayButton as HTMLInputElement;
        dbTemp.disabled = true;
	}

	enableStayButton()
	{
		const dbTemp = bj1.stayButton as HTMLInputElement;
        dbTemp.disabled = false;
	}
	
	disableDDButton()
	{
		const dbTemp = bj1.ddButton as HTMLInputElement;
		const gTemp = document.getElementById("ddb1") as HTMLInputElement;
		gTemp.disabled = true;
        dbTemp.disabled = true;
	}

	enableDDButton()
	{
		const dbTemp = bj1.ddButton as HTMLInputElement;
		const gTemp = document.getElementById("ddb1") as HTMLInputElement;
		gTemp.disabled = false;
        dbTemp.disabled = false;
	}	
}

export let bj1: BlackJackGame;

// Create a game with one dealer and one player and the screen representation of the table
function createBlackJackGame()
{

//  bj1.testDeck = new Deck("BJ1 Deck");

/* Moved to constructor
  bj1.d2 = new Player2("dealer", 1);
*/

  // Begin JAVASCRIPT_DISPLAY
  // Table contains a dealer area.
// Create player position element for Dealer
{
/* Moved to Player constructor
  bj1.d2.pElement = document.createElement("div");
*/
  bj1.d2.pElement.setAttribute("id", "dealer");
  bj1.d2.pElement.setAttribute("class", "dealer");
//  bj1.d2.pElement.innerHTML = bj1.d2.name;
}

if(jsImpl)
{
  document.body.appendChild(bj1.d2.pElement);
}

  bj1.d2.pName = document.createElement("p");
  bj1.d2.pName.innerHTML = "YYYYYY";
  bj1.d2.pElement.appendChild(bj1.d2.pName);

  // Dealer area contains the table Position for the cards in the dealer's hand.
  bj1.d2.pPosition = document.createElement("div");
  bj1.d2.pPosition.setAttribute("id", "ppos1");
  bj1.d2.pPosition.setAttribute("class", "position");

  bj1.d2.pElement.appendChild(bj1.d2.pPosition);

  let dpTitle = document.createElement("p");
  dpTitle.innerHTML = "DEALER POSITION";
//  bj1.d2.pPosition.appendChild(dpTitle);
  // End JAVASCRIPT_DISPLAY

let dHand: PlayerHand = new PlayerHand();
    dHand.addDisplayPosition(bj1.d2.pPosition);
    bj1.d2.addHandToPlayer(dHand);

  bj1.p2[0] = new Player2("player", 0);

  // Begin JAVASCRIPT_DISPLAY
  // Table also contains the player area.
// Create player position element for player - Should be fully moved to constructor
{
/* Moved to constructor
  bj1.p2[0].pElement = document.createElement("div");
*/
  bj1.p2[0].pElement.setAttribute("id", "player1");
  bj1.p2[0].pElement.setAttribute("class", "player");
//  bj1.p2[0].pElement.innerHTML = bj1.p2[0].name;
}

if(jsImpl)
{
  document.body.appendChild(bj1.p2[0].pElement);
}

  bj1.p2[0].pName = document.createElement("p");
  bj1.p2[0].pName.innerHTML = "XXXXXX";
  bj1.p2[0].pElement.appendChild(bj1.p2[0].pName);

  let bRollElement = document.createElement("p");
  bRollElement.setAttribute("id", "p1br");
  bRollElement.setAttribute("float", "left")
  bRollElement.innerHTML = "BANKROLL: " + bj1.p2[0].bankRoll;
  bj1.p2[0].pElement.appendChild(bRollElement);

  // Player area contains the table Position for the cards in the player's hand.
  bj1.p2[0].pPosition = document.createElement("div");
  bj1.p2[0].pPosition.setAttribute("id", "ppos1");
  bj1.p2[0].pPosition.setAttribute("class", "position");

  bj1.p2[0].pElement.appendChild(bj1.p2[0].pPosition);

  let ppTitle = document.createElement("p");
  ppTitle.innerHTML = "PLAYER1 POSITION";
//  bj1.p2[0].pPosition.appendChild(ppTitle);

  
  let hBetElement = document.createElement("div");
  hBetElement.setAttribute("id", "p1hb");
  hBetElement.style.setProperty("float", "left");
  hBetElement.innerHTML = " HAND BET: ";
  bj1.p2[0].pPosition.appendChild(hBetElement);

  let hWinElement = document.createElement("div");
  hWinElement.setAttribute("id", "p1hw");
//  hWinElement.style.setProperty("float", "left");
  hWinElement.innerHTML = " HAND WIN: ";
  bj1.p2[0].pPosition.appendChild(hWinElement);
  // End JAVASCRIPT_DISPLAY

let pHand: PlayerHand = new PlayerHand();
    pHand.addDisplayPosition(bj1.p2[0].pPosition);
    bj1.p2[0].addHandToPlayer(pHand);

  // Begin JAVASCRIPT_DISPLAY
  bj1.createHitButton();
  bj1.p2[0].pElement.appendChild(bj1.hitButton);

  bj1.createStayButton();
  bj1.p2[0].pElement.appendChild(bj1.stayButton);

  bj1.createDDButton();
  bj1.p2[0].pElement.appendChild(bj1.ddButton);

  bj1.createDealButton();
  bj1.p2[0].pElement.appendChild(bj1.dealButton);
  // End JAVASCRIPT_DISPLAY
}

function startBlackJack()
{
	console.log("Start BlackJack!");

// Deal first card.
    bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Down);

    bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);	

    // JAVASCRIPT_DISPLAY - The handTotal display should be updated in the hand portion of the display, not the player portioin
    // And the display update could be moved to the location in the hand where the total is calculated.
    bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal;

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);

    // JAVASCRIPT_DISPLAY - The handTotal display should be updated in the hand portion of the display, not the player portioin
    // And the display update could be moved to the location in the hand where the total is calculated.
    bj1.d2.pName.textContent = bj1.d2.name + ": " + bj1.d2.hands[0].handTotal;

    bj1.hState = HandState.PostDeal;
    // Do Post Deal Activities;

    const dbTemp = bj1.dealButton as HTMLInputElement;
    dbTemp.disabled = true;


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
           bj1.hState = HandState.PreDeal;

           // Enable Deal Button
		  break;
        
        case HandState.PreDeal:
          if(action === PlayerAction.Deal)
          {
	if(bj1.firstHand)
	{
		bj1.firstHand = false;
		createBlackJackGame();
	}
	else
	{
//			bj1.d2.pElement.remove();
//		    bj1.p2[0].pElement.remove();
// Clear table by getting rid of old hands and creating new hands - but NOT PLAYERS!
// If we remove the cards, should we delete the hands and create new ones.
bj1.d2.removeHandFromPlayer();
bj1.p2[0].removeHandFromPlayer();

let dHand: PlayerHand = new PlayerHand();
    dHand.handTotal = 0;
    dHand.addDisplayPosition(bj1.d2.pPosition);
    bj1.d2.addHandToPlayer(dHand);

let pHand: PlayerHand = new PlayerHand();
    pHand.handTotal = 0;
    pHand.addDisplayPosition(bj1.p2[0].pPosition);
    bj1.p2[0].addHandToPlayer(pHand);

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
              bj1.disableHitButton();
              bj1.disableStayButton();
              bj1.disableDDButton();
            }
            else
            {
              bj1.hState = HandState.PlayerActive;
              bj1.enableHitButton();
              bj1.enableStayButton();
              bj1.enableDDButton();
            }
          }
          break;

        case HandState.PlayerActive:
          switch(action)
          {
	         case PlayerAction.Hit:
                executePlayerAction(action);
                bj1.disableDDButton();
                if(bj1.p2[0].hands[0].handTotal > 21)
                {
	               bj1.hState = HandState.Complete;
              bj1.disableHitButton();
              bj1.disableStayButton();
                }
             break;
 
             case PlayerAction.Stay:
               executePlayerAction(action)
               
              bj1.hState = HandState.DealerActive; 
              bj1.disableHitButton();
              bj1.disableStayButton();
              bj1.disableDDButton();
               break;

            case PlayerAction.DoubleDown:
                executePlayerAction(action);
	               bj1.hState = HandState.Complete;
                   bj1.disableHitButton();
                   bj1.disableStayButton();
                   bj1.disableDDButton();
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

// JAVASCRIPT_DISPLAY - Need to update this use the cardReference attribute
bj1.d2.hands[0].cards[0].el.innerHTML = bj1.d2.hands[0].cards[0].value.name + "<br />" + bj1.d2.hands[0].cards[0].suit;
bj1.d2.hands[0].cards[0].direction = CardFaceDirection.Up;
      if(bj1.d2.hands[0].handTotal >= 17)
      {            
        bj1.hState = HandState.Complete;
      }
      else
      {
	

         bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);

         // JAVASCRIPT DISPLAY
         bj1.d2.pName.textContent = bj1.d2.name + ": " + bj1.d2.hands[0].handTotal;
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
// JAVASCRIPT_DISPLAY
bj1.d2.hands[0].cards[0].el.innerHTML = bj1.d2.hands[0].cards[0].cardRepString;
bj1.d2.hands[0].cards[0].direction = CardFaceDirection.Up;
		bj1.hState = HandState.PreDeal;
		const dbTemp = bj1.dealButton as HTMLInputElement;
        dbTemp.disabled = false;

	}

	
}

declare global {
    interface Window {
        play3:any;
    }
}

    window.play3 = function (type: PlayerAction) {
    	
    	executeHand(type);
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

    // JAVASCRIPT_DISPLAY
    bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + "-" + bj1.p2[0].hands[0].handResult;
/* Comment these three lines out for React...for now */
    document.getElementById("p1br").innerHTML = " BANKROLL: " + bj1.p2[0].bankRoll;
    document.getElementById("p1hb").innerHTML = " HAND BET: " + bj1.p2[0].hands[0].handBet;
    document.getElementById("p1hw").innerHTML = " HAND WIN: " + bj1.p2[0].hands[0].handWin;
}

function hitBlackJack()
{
	console.log("Hit BlackJack!");

	bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);

    // JAVASCRIPT_DISPLAY	
	bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal;
	console.log("Player total after hit = " + bj1.p2[0].hands[0].handTotal);

}

function doubleDownBlackJack()
{
	console.log("Double Down BlackJack!");

	bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);

    // JAVASCRIPT_DISPLAY	
	bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal;
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

