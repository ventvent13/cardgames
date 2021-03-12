/// <reference path="./Card2.ts" />
/// <reference path="./Deck.ts" />

// import * as card from "./Cards.css"

// Deck
var myDeck = [];

let player: HTMLDivElement;
let dealer: HTMLDivElement;
let playerPosition: HTMLDivElement;
let dealerPosition: HTMLDivElement;
let hitButton: HTMLDivElement;
let stayButton: HTMLDivElement;

let pName: HTMLDivElement;
let dName: HTMLDivElement;

let p2: Player2;
let d2: Player2;


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

let hState: HandState = HandState.NotStarted;


class Player2 
{
	hand = [];
	lowTotal: number = 0;
	handTotal: number = 0;
	handHasAce: boolean = false;
	name: string;
	role: number = 0;
	constructor(playerName: string, playerRole: number)
	{
		console.log("Built Player");
		this.lowTotal = 0;
		this.handTotal = 0;
		this.name = playerName;
		this.role = playerRole;
	}
	
	// Calculation is a mess right now.
	addCardToHand(newCard: Card2)
	{
		console.log("Add Card to Hand");
		this.hand.push(newCard);
		if(newCard.value.numValue == 11)
		{
			this.lowTotal = this.lowTotal + 1;
		}
		else
		{
			this.lowTotal = this.lowTotal + newCard.value.numValue;
		}
		console.log("addCardToHand total = " + this.lowTotal);
		this.handHasAce = false;
		this.handTotal = 0
		for(let i: number = 0; i < this.hand.length; i++)
		{
			if(this.handHasAce == false && this.hand[i].value.numValue == 11)
			{
				this.handTotal = this.handTotal + 11;
				this.handHasAce = true;
			}
			else
			{
				if(this.hand[i].value.numValue == 11)
				{
					this.handTotal = this.handTotal + 1;
				}
				else
				{
				   this.handTotal = this.handTotal + this.hand[i].value.numValue;
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



let testDeck = new Deck("world!");

// Create a game with one dealer and one player and the screen representation of the table
function createBlackJackGame()
{

  d2 = new Player2("dealer", 1);

  // Table contains a dealer area.
  dealer = document.createElement("div");
  dealer.setAttribute("id", "dealer");
  dealer.setAttribute("class", "dealer");
  dealer.innerHTML = d2.name;

  document.body.appendChild(dealer);

  dName = document.createElement("p");
  dName.innerHTML = "YYYYYY";
  dealer.appendChild(dName);

  // Dealer area contains the table Position for the cards in the dealer's hand.
  dealerPosition = document.createElement("div");
  dealerPosition.setAttribute("id", "ppos1");
  dealerPosition.setAttribute("class", "position");

  dealer.appendChild(dealerPosition);

  let dpTitle = document.createElement("p");
  dpTitle.innerHTML = "DEALER POSITION";
  dealerPosition.appendChild(dpTitle);

  p2 = new Player2("player", 0);

  // Table also contains the player area.
  player = document.createElement("div");
  player.setAttribute("id", "player1");
  player.setAttribute("class", "player");
  player.innerHTML = p2.name;

  document.body.appendChild(player);

  pName = document.createElement("p");
  pName.innerHTML = "XXXXXX";
  player.appendChild(pName);

  // Player area contains the table Position for the cards in the player's hand.
  playerPosition = document.createElement("div");
  playerPosition.setAttribute("id", "ppos1");
  playerPosition.setAttribute("class", "position");

  player.appendChild(playerPosition);

  let ppTitle = document.createElement("p");
  ppTitle.innerHTML = "PLAYER1 POSITION";
  playerPosition.appendChild(ppTitle);

  // Player area also contains a set of buttons with the player's options.
  hitButton = document.createElement("input");
  hitButton.setAttribute("type","button");
  hitButton.setAttribute("id","hb1");
  hitButton.setAttribute("class", "button")
//  hitButton.setAttribute("onclick","console.log('Hit Button'); hitBlackJack();");
  hitButton.setAttribute("onclick","console.log('Hit Button'); executeHand(PlayerAction.Hit);");
  hitButton.setAttribute("value","HIT BUTTON!");

  player.appendChild(hitButton);

  // Player area also contains a set of buttons with the player's options.
  stayButton = document.createElement("input");
  stayButton.setAttribute("type","button");
  stayButton.setAttribute("id","hb1");
  stayButton.setAttribute("class", "button")
  stayButton.setAttribute("onclick","console.log('Stay Button'); executeHand(PlayerAction.Stay);");
  stayButton.setAttribute("value","Stay BUTTON!");

  player.appendChild(stayButton);
}

function startBlackJack()
{
	console.log("Start BlackJack!");

// Deal first card.
	let myCard: Card2 = myDeck.pop();
	p2.addCardToHand(myCard);
	playerPosition.appendChild(p2.hand[0].el);

//	playerPosition.appendChild(myCard.el);
   
    myCard = myDeck.pop();
    d2.addCardToHand(myCard);
d2.hand[0].el.textContent = "CARD BACK";
    dealerPosition.appendChild(d2.hand[0].el);

    myCard = myDeck.pop();
	p2.addCardToHand(myCard);
	playerPosition.appendChild(p2.hand[1].el);
	
    pName.textContent = p2.name + ": " + p2.handTotal;
	
	myCard = myDeck.pop();
    d2.addCardToHand(myCard);
    dealerPosition.appendChild(d2.hand[1].el);

    dName.textContent = d2.name + ": " + d2.handTotal;

    hState = HandState.PostDeal;
    // Do Post Deal Activities;

    hState = HandState.PlayerActive;
}

let firstHand: boolean = true;

function executeHand(action: PlayerAction)
{
	console.log("execute Hand");
	
	switch(hState)
	{
		case HandState.NotStarted:
		   initializeCardData();
//           createBlackJackGame();
//           testDeck.createDeck();
//           testDeck.shuffleDeck();
           hState = HandState.PreDeal;

const hbTemp = hitButton as HTMLInputElement;
hbTemp.disabled = true;
           // Enable Deal Button
		  break;
        
        case HandState.PreDeal:
          if(action == PlayerAction.Deal)
          {
	if(firstHand)
	{
		firstHand = false;
	}
	else
	{
			dealer.remove();
		    player.remove();
    }

	           createBlackJackGame();
               testDeck.createDeck();
               testDeck.shuffleDeck();

	        startBlackJack();
            // update hState;
            // Enable proper buttons
            if(d2.handTotal == 21 || p2.handTotal == 21)  // Dealer Black Jack or Player Black Jack (No double/no Insurance)
            {
	           hState = HandState.Complete;
            }
            else
            {
              hState = HandState.PlayerActive;
              const hbTemp = hitButton as HTMLInputElement;
              hbTemp.disabled = false;
            }
          }
          break;

        case HandState.PlayerActive:
          switch(action)
          {
	         case PlayerAction.Hit:
                executePlayerAction(action);
                if(p2.handTotal > 21)
                {
	               hState = HandState.Complete;
                }
             break;
 
             case PlayerAction.Stay:
               executePlayerAction(action)
               
               hState = HandState.DealerActive; 
               break;
          }
          break;
		
	}
	
	while(hState == HandState.DealerActive)
	{
      // Dealer Active
d2.hand[0].el.innerHTML = d2.hand[0].value.name + "<br />" + d2.hand[0].suit;
//el.innerHTML = cardValues[j].name + "<br />" + suits[i];
      if(d2.handTotal >= 17)
      {            
        hState = HandState.Complete;
      }
      else
      {
	     let myCard: Card2 = myDeck.pop();
         d2.addCardToHand(myCard);
         dealerPosition.appendChild(myCard.el);

         dName.textContent = d2.name + ": " + d2.handTotal;
      }

	}
	
	evaluateHand();
	
	if(hState == HandState.Complete)
	{
		d2.hand[0].el.innerHTML = d2.hand[0].value.name + "<br />" + d2.hand[0].suit;
		hState = HandState.PreDeal;

	}

	
}

function evaluateHand()
{
	// Black Jack will come out as tie vs. a 3+ Card 21.
	if(d2.handTotal > 21)
	{
	  pName.textContent = p2.name + ": " + p2.handTotal + " PLAYER WON!";
      hState = HandState.Complete;
    }
    else if(p2.handTotal > 21)
    {
	   pName.textContent = p2.name + ": " + p2.handTotal + " PLAYER BUSTED!";
       hState = HandState.Complete;
    }
    else if((p2.handTotal > d2.handTotal) && hState == HandState.Complete)
    {
	   pName.textContent = p2.name + ": " + p2.handTotal + " PLAYER WON!";
    }
    else if((p2.handTotal == d2.handTotal) && hState == HandState.Complete)
    {
	   pName.textContent = p2.name + ": " + p2.handTotal + " PLAYER TIED!";
    }
    else if((p2.handTotal < d2.handTotal) && hState == HandState.Complete)
    {
	   pName.textContent = p2.name + ": " + p2.handTotal + " PLAYER LOST!";
    }
    else if(hState == HandState.Complete)
    {
       pName.textContent = p2.name + ": " + p2.handTotal + " HOW DID WE GET HERE!";	   
    }
}

function hitBlackJack()
{
	console.log("Hit BlackJack!");
	let pTotal: number = 0;

	let myCard: Card2 = myDeck.pop();
	p2.addCardToHand(myCard);
	// p2.hand.push(myCard);
	playerPosition.appendChild(myCard.el);
	
	for(let i = 0; i < p2.hand.length; i++)
	{
		pTotal = pTotal + p2.hand[i].value.numValue;
	}
	
	pName.textContent = p2.name + ": " + p2.handTotal;
	console.log("Player total after hit = " + p2.handTotal);
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

// Creates a new div element
function createNewElement()
{
var el = document.createElement("div");
el.setAttribute("id", "c1");
el.innerHTML = "NEW ELEMENT";
document.body.appendChild(el);
}

/*
initializeCardData();
createDeck();
showDeck();
console.log(typeof showDeck);
*/

/*
function dealAllCards()
{
for(i = 0; i < myDeck.length; i++)
{
	createNewElement();
}
}
*/

/*
// Just some tests
let myCardValue = new CardValue(10, "Ten");
let myCardValue2 = new CardValue(11, "Jack");
let myCard3 = new Card2("xxxx", myCardValue);


console.log(myCardValue2.name);

console.log(myCard3.value); // console.log doesn't walk the tree of objects within the object passed into the function.
*/

/*
module.exports = {
  foo: function () {
    // whatever
  },
  bar: function () {
    // whatever
  }
};
*/





