/*
/// <reference path="./Card2.ts" />
/// <reference path="./Deck.ts" />
*/
import {Card2, numSuits, numValues, cardValues, suits, initializeCardData} from "./Card2.js"
import {Deck} from "./Deck.js"

// Test Comment

enum PlayerAction
{
	NoAction,
	Deal,
	Hit,
	Stay
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

class PlayerHand
{
	cards = [];

	handTotal: number = 0;
	handHasAce: boolean = false;
	
	displayParent: HTMLElement;
	
	constructor()
	{
		;
	}

    addDisplayPosition(dParent: HTMLElement)
    {
	   this.displayParent = dParent;
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
			if(this.handHasAce == false && this.cards[i].value.numValue == 11)
			{
				this.handTotal = this.handTotal + 11;
				this.handHasAce = true;
			}
			else
			{
				if(this.cards[i].value.numValue == 11)
				{
					this.handTotal = this.handTotal + 1;
				}
				else
				{
				   this.handTotal = this.handTotal + this.cards[i].value.numValue;
	            }
			}
		}
		if(this.handHasAce == true && this.handTotal > 21)
		{
			this.handTotal = this.handTotal - 10;
		}
		console.log("Hand Total: " + this.handTotal)
	}

}


class Player2 
{

	hands = [];

	handHasAce: boolean = false;
	name: string;
	role: number = 0;
	pElement: HTMLDivElement;
	pPosition: HTMLDivElement;
	pName: HTMLDivElement;
	constructor(playerName: string, playerRole: number)
	{
		console.log("Built Player");

		this.name = playerName;
		this.role = playerRole;
//		this.hands[0] = pHand;
	}
	
	addHandToPlayer(pHand: PlayerHand)
	{
		this.hands.push(pHand);
	}


}

enum CardFaceDirection
{
	Down,
	Up
}

class BlackJackGame
{
	d2: Player2;   // Dealer
	p2 = [];       // Array of Players
	firstHand: boolean;
	hState: HandState;
	hitButton: HTMLDivElement;
    stayButton: HTMLDivElement;
    testDeck: Deck;
	
	constructor ()
	{
		this.firstHand = true;
		this.hState = HandState.NotStarted;
	}
	
	dealCard(pHand: PlayerHand, cFace: CardFaceDirection)
	{

	    let myCard: Card2 = this.testDeck.myDeck.pop();
if(cFace == CardFaceDirection.Down)
{
   myCard.el.textContent = "CARD BACK";
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
  this.stayButton.setAttribute("id","hb1");
  this.stayButton.setAttribute("class", "button")
  this.stayButton.setAttribute("onclick","console.log('Stay Button'); window.play3(3);");
  this.stayButton.setAttribute("value","Stay BUTTON!");
	}
}

let bj1 = new BlackJackGame();

// Create a game with one dealer and one player and the screen representation of the table
function createBlackJackGame()
{

  bj1.testDeck = new Deck("BJ1 Deck");

  bj1.d2 = new Player2("dealer", 1);

  // Table contains a dealer area.
  bj1.d2.pElement = document.createElement("div");
  bj1.d2.pElement.setAttribute("id", "dealer");
  bj1.d2.pElement.setAttribute("class", "dealer");
  bj1.d2.pElement.innerHTML = bj1.d2.name;

  document.body.appendChild(bj1.d2.pElement);

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
  bj1.d2.pPosition.appendChild(dpTitle);

let dHand: PlayerHand = new PlayerHand();
    dHand.addDisplayPosition(bj1.d2.pPosition);
    bj1.d2.addHandToPlayer(dHand);

  bj1.p2[0] = new Player2("player", 0);

  // Table also contains the player area.
  bj1.p2[0].pElement = document.createElement("div");
  bj1.p2[0].pElement.setAttribute("id", "player1");
  bj1.p2[0].pElement.setAttribute("class", "player");
  bj1.p2[0].pElement.innerHTML = bj1.p2[0].name;

  document.body.appendChild(bj1.p2[0].pElement);

  bj1.p2[0].pName = document.createElement("p");
  bj1.p2[0].pName.innerHTML = "XXXXXX";
  bj1.p2[0].pElement.appendChild(bj1.p2[0].pName);

  // Player area contains the table Position for the cards in the player's hand.
  bj1.p2[0].pPosition = document.createElement("div");
  bj1.p2[0].pPosition.setAttribute("id", "ppos1");
  bj1.p2[0].pPosition.setAttribute("class", "position");

  bj1.p2[0].pElement.appendChild(bj1.p2[0].pPosition);

  let ppTitle = document.createElement("p");
  ppTitle.innerHTML = "PLAYER1 POSITION";
  bj1.p2[0].pPosition.appendChild(ppTitle);

let pHand: PlayerHand = new PlayerHand();
    pHand.addDisplayPosition(bj1.p2[0].pPosition);
    bj1.p2[0].addHandToPlayer(pHand);

  bj1.createHitButton();
  bj1.p2[0].pElement.appendChild(bj1.hitButton);

  bj1.createStayButton();
  bj1.p2[0].pElement.appendChild(bj1.stayButton);
}

function startBlackJack()
{
	console.log("Start BlackJack!");

// Deal first card.
    bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Down);

    bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);	
    bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal;

    bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);
    bj1.d2.pName.textContent = bj1.d2.name + ": " + bj1.d2.hands[0].handTotal;

    bj1.hState = HandState.PostDeal;
    // Do Post Deal Activities;

    bj1.hState = HandState.PlayerActive;
}

export function executeHand (action: PlayerAction)
{
	console.log("execute Hand");
	
	switch(bj1.hState)
	{
		case HandState.NotStarted:
		   initializeCardData();
           bj1.hState = HandState.PreDeal;

/*
const hbTemp = bj1.hitButton as HTMLInputElement;
hbTemp.disabled = true;
*/
           // Enable Deal Button
		  break;
        
        case HandState.PreDeal:
          if(action == PlayerAction.Deal)
          {
	if(bj1.firstHand)
	{
		bj1.firstHand = false;
	}
	else
	{
			bj1.d2.pElement.remove();
		    bj1.p2[0].pElement.remove();
    }

	           createBlackJackGame();
               bj1.testDeck.createDeck();
               bj1.testDeck.shuffleDeck();

	        startBlackJack();
            // update hState;
            // Enable proper buttons
            if(bj1.d2.hands[0].handTotal == 21 || bj1.p2[0].hands[0].handTotal == 21)  // Dealer Black Jack or Player Black Jack (No double/no Insurance)
            {
	           bj1.hState = HandState.Complete;
            }
            else
            {
              bj1.hState = HandState.PlayerActive;
              const hbTemp = bj1.hitButton as HTMLInputElement;
              hbTemp.disabled = false;
            }
          }
          break;

        case HandState.PlayerActive:
          switch(action)
          {
	         case PlayerAction.Hit:
                executePlayerAction(action);
                if(bj1.p2[0].hands[0].handTotal > 21)
                {
	               bj1.hState = HandState.Complete;
                }
             break;
 
             case PlayerAction.Stay:
               executePlayerAction(action)
               
               bj1.hState = HandState.DealerActive; 
               break;
          }
          break;
		
	}
	
	while(bj1.hState == HandState.DealerActive)
	{
      // Dealer Active
bj1.d2.hands[0].cards[0].el.innerHTML = bj1.d2.hands[0].cards[0].value.name + "<br />" + bj1.d2.hands[0].cards[0].suit;
      if(bj1.d2.hands[0].handTotal >= 17)
      {            
        bj1.hState = HandState.Complete;
      }
      else
      {
	
/*
	     let myCard: Card2 = myDeck.pop();
bj1.d2.hands[0].addCardToHand(myCard);
*/
         bj1.dealCard(bj1.d2.hands[0], CardFaceDirection.Up);


         bj1.d2.pName.textContent = bj1.d2.name + ": " + bj1.d2.hands[0].handTotal;
      }

	}
	
	evaluateHand();
	
	if(bj1.hState == HandState.Complete)
	{
bj1.d2.hands[0].cards[0].el.innerHTML = bj1.d2.hands[0].cards[0].value.name + "<br />" + bj1.d2.hands[0].cards[0].suit;
		bj1.hState = HandState.PreDeal;

	}

	
}

declare global {
    interface Window {
        play3:any;
    }
}

    window.play3 = function (type) {
    	
    	executeHand(type);
    }



function evaluateHand()
{
	// Black Jack will come out as tie vs. a 3+ Card 21.
	if(bj1.d2.hands[0].handTotal > 21)
	{
	  bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + " PLAYER WON!";
      bj1.hState = HandState.Complete;
    }
    else if(bj1.p2[0].hands[0].handTotal > 21)
    {
	   bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + " PLAYER BUSTED!";
       bj1.hState = HandState.Complete;
    }
    else if((bj1.p2[0].hands[0].handTotal > bj1.d2.hands[0].handTotal) && bj1.hState == HandState.Complete)
    {
	   bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + " PLAYER WON!";
    }
    else if((bj1.p2[0].hands[0].handTotal == bj1.d2.hands[0].handTotal) && bj1.hState == HandState.Complete)
    {
	   bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + " PLAYER TIED!";
    }
    else if((bj1.p2[0].hands[0].handTotal < bj1.d2.hands[0].handTotal) && bj1.hState == HandState.Complete)
    {
	   bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + " PLAYER LOST!";
    }
    else if(bj1.hState == HandState.Complete)
    {
       bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + " HOW DID WE GET HERE!";	   
    }
}

function hitBlackJack()
{
	console.log("Hit BlackJack!");

	bj1.dealCard(bj1.p2[0].hands[0], CardFaceDirection.Up);
	
	bj1.p2[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal;
	console.log("Player total after hit = " + bj1.p2[0].hands[0].handTotal);

}


function executePlayerAction(action: PlayerAction)
{
	switch (action)
	{
		case PlayerAction.Deal:
		{
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
		}
	}
	
	// Probably should have a higher level gamePlay function that potentially takes player input and then calls executePlayerAction
	// And also would manage the dealer action via a loop and reuse the executePlayerAction function
	// Need to add Game State - 'PlayerActive', 'PlayerBust', 'DealerActive', etc.
	// executePlayerAction would update Game State after each action/card to move the game along
	// Initially, only Hit, Stay.  No Insurance(Even Money), No Split, No Double, No Surrender.  Does Dealer Hit Soft 17?
	// Does Dealer Check for Black Jack if it has an Ace?
}

