/*
/// <reference path="./Card2.ts" />
/// <reference path="./Deck.ts" />
*/
/* Remove '.js' for React */
import {Card2, numSuits, numValues, cardValues, suits, initializeCardData, CardFaceDirection,CardValue} from "./Card2.js"
import {Deck} from "./Deck.js"
import{BlackJackGame, bj1, Player2, HandState, PlayerAction, executeHand, RoundState, PlayerHand} from "./Cards.js"

class HandView implements bar3
{
	hPosition: HTMLDivElement;
	hand: PlayerHand;
	hTotal: HTMLDivElement;
	hBet: HTMLDivElement;
	hWin: HTMLDivElement;
	
	constructor(injectHand: PlayerHand)
	{
		this.hand = injectHand;
		
        // Dealer area contains the table Position for the cards in the dealer's hand.
        this.hPosition = document.createElement("div");
        this.hPosition.setAttribute("id", "ppos1");
        this.hPosition.setAttribute("class", "position");
	}
	
	test(thisArg: bar3): void
    {
	let thisCastArg = thisArg as Player2View;
	console.log("bar3 1");
	   let newCard: Card2 = this.hand.cards[this.hand.cards.length - 1];
	   if(newCard.direction == CardFaceDirection.Up)
       {
          newCard.el.innerHTML = newCard.cardRepString;
       }
       else
       {
	      newCard.el.innerHTML = '\u{1f0a0}';
       }

//		this.pPosition[0].appendChild(newCard.el);
//		this.pName.textContent = bj1.d2.name + ": " + bj1.d2.hands[0].handTotal;
		
		this.hPosition.appendChild(newCard.el);

    }

    setDealerHoleCardDirection(thisArg: bar3): void
    {
	   console.log("setDealerHoleCardDirection");
       if(this.hand.cards[0].direction == CardFaceDirection.Up)
       {
          this.hand.cards[0].el.innerHTML = this.hand.cards[0].cardRepString;
       }
       else
       {
	      this.hand.cards[0].el.innerHTML = '\u{1f0a0}';
       }
    }

    cardRemovedFromHand(removedCard: Card2): void
    {
	   console.log("cardRemovedFromHand");
//       this.pPosition[0].removeChild(removedCard.el);
       this.hPosition.removeChild(removedCard.el);
    }
}

// Parent view elements are responsible for appending their child elements into the DOM
// This will be the player viewer
// Need to reconcile using element names or object attributes for identifying HTML elements.
export class Player2View
{
	pElement: HTMLDivElement;
	pPosition: HTMLDivElement[] = [];  // Needs to be an array, 1 for each hand
	pName!: HTMLDivElement;
	player: Player2;
	hView: HandView[] = [];
	
	constructor(injectPlayer: Player2)
	{
		let pId: string = "unset";
		let pClass: string = "unset"
		this.player = injectPlayer;
		
		if(this.player.role === 1)
		{
			pId = "dealer";
			pClass = "dealer"
		}
		else
		{
			pId = "player";
			pClass = "player"
		}
		
		this.pElement = document.createElement("div");
		this.pElement.setAttribute("id", pId);
        this.pElement.setAttribute("class", pClass);

        this.pName = document.createElement("p");
        this.pName.innerHTML = "YYYYYY";
        this.pElement.appendChild(this.pName);

        if(this.player.role === 0)
        {
           let bRollElement = document.createElement("p");
           bRollElement.setAttribute("id", "p1br");
           bRollElement.setAttribute("float", "left")
           bRollElement.innerHTML = "BANKROLL: " + this.player.bankRoll;
           this.pElement.appendChild(bRollElement);
        }

        this.hView[0] = new HandView(this.player.hands[0]);
        this.pElement.appendChild(this.hView[0].hPosition);

        // Hard code 2 player hands
        if(this.player.role === 0)
        {
           this.hView[1] = new HandView(this.player.hands[1]);
           this.pElement.appendChild(this.hView[1].hPosition);
        }

        if(this.player.role === 0)
        {
	       let i = 0;
           for(i = 0; i < this.hView.length; i++)
           {
           let hBetElement = document.createElement("div");
           hBetElement.setAttribute("id", "p1hb");
           hBetElement.style.setProperty("float", "left");
           hBetElement.innerHTML = " HAND BET: ";
           this.hView[i].hBet = hBetElement;
           this.hView[i].hPosition.appendChild(hBetElement);

           let hWinElement = document.createElement("div");
           hWinElement.setAttribute("id", "p1hw");
           //  hWinElement.style.setProperty("float", "left");
           hWinElement.innerHTML = " HAND WIN: ";
           this.hView[i].hWin = hWinElement;
           this.hView[i].hPosition.appendChild(hWinElement);

           let hTotalElement = document.createElement("div");
           hTotalElement.setAttribute("id", "p1hw");
           //  hWinElement.style.setProperty("float", "left");
           hTotalElement.innerHTML = " TOTAL: ";
           this.hView[i].hTotal = hTotalElement;
           this.hView[i].hPosition.appendChild(hTotalElement);
           }
        }
        else
        {
           let hTotalElement = document.createElement("div");
           hTotalElement.setAttribute("id", "p1hw");
           //  hWinElement.style.setProperty("float", "left");
           hTotalElement.innerHTML = " TOTAL: ";
           this.hView[0].hTotal = hTotalElement;
           this.hView[0].hPosition.appendChild(hTotalElement);	
        }
	}
	
	test(thisArg: bar3): void
    {
	let thisCastArg = thisArg as Player2View;
	console.log("bar3 1");
	   let newCard: Card2 = this.player.hands[0].cards[this.player.hands[0].cards.length - 1];
	   if(newCard.direction == CardFaceDirection.Up)
       {
          newCard.el.innerHTML = newCard.cardRepString;
       }
       else
       {
	      newCard.el.innerHTML = '\u{1f0a0}';
       }

//		this.pPosition[0].appendChild(newCard.el);
		this.pName.textContent = bj1.d2.name + ": " + bj1.d2.hands[0].handTotal;
		
		this.hView[0].hPosition.appendChild(newCard.el);

    }

    setDealerHoleCardDirection(thisArg: bar3): void
    {
	   console.log("setDealerHoleCardDirection");
       this.hView[0].setDealerHoleCardDirection(thisArg);
/*
       if(this.player.hands[0].cards[0].direction == CardFaceDirection.Up)
       {
          this.player.hands[0].cards[0].el.innerHTML = this.player.hands[0].cards[0].cardRepString;
       }
       else
       {
	      this.player.hands[0].cards[0].el.innerHTML = '\u{1f0a0}';
       }
*/
    }

    cardRemovedFromHand(removedCard: Card2): void
    {
	   console.log("cardRemovedFromHand");
//       this.pPosition[0].removeChild(removedCard.el);
       this.hView[0].hPosition.removeChild(removedCard.el);
    }
	
}

function bar(callbackFn: (this: Player2View) => any, thisArg: Player2View): any
{
	return callbackFn.call(thisArg);
}

interface bar3
{
	test(thisArg: bar3): void;
	setDealerHoleCardDirection(thisArg: bar3): void;
	cardRemovedFromHand(removedCard: Card2): void;
}	

class BlackJackView
{
	dealerView: Player2View;
    playerView: Player2View[] = [];
	hitButton!: HTMLDivElement;
    stayButton!: HTMLDivElement;
    dealButton!: HTMLDivElement;
    ddButton!: HTMLDivElement;

	constructor()
	{
		console.log("new BlackJackView");
	}
	// Initialize the BlackJackGame engine
	initBlackJackEngine()
	{
		window.play3(0);
		// create playerView and assign to attribute here and bj1.playerView[0] and do same for dealerView
		// Then, rename any calls to the BlackJackView attribute
		this.dealerView = new Player2View(bj1.d2);
		this.playerView[0] = new Player2View(bj1.p2[0]);
		createBlackJackGame();
		

	}
//	play3(0);
	// Map engine state to views - especially the PlayerHands to the PlayerHandViews
	updateViewState()
	{
    this.dealerView.pName.textContent = bj1.d2.name + ": " + bj1.d2.hands[0].handTotal;
//    this.playerView[0].pName.textContent = bj1.p2[0].name + ": " + bj1.p2[0].hands[0].handTotal + "-" + bj1.p2[0].hands[0].handResult;
    document.getElementById("p1br").innerHTML = " BANKROLL: " + bj1.p2[0].bankRoll;

    let i: number = 0;
    for(i = 0; i < this.playerView[0].hView.length; i++)
    {
       this.playerView[0].hView[i].hBet.innerHTML = " HAND BET: " + bj1.p2[0].hands[i].handBet;
       this.playerView[0].hView[i].hWin.innerHTML = " HAND WIN: " + bj1.p2[0].hands[i].handWin;
       this.playerView[0].hView[i].hTotal.innerHTML = " TOTAL: " + bj1.p2[0].hands[i].handTotal + "-" + bj1.p2[0].hands[i].handResult;
    }
              if(bj1.rState == RoundState.DealerActive  || bj1.rState == RoundState.ActionComplete || bj1.rState == RoundState.PreDeal)
              { 
              this.disableHitButton();
              this.disableStayButton();
              this.disableDDButton();	
              }	
              if(bj1.rState == RoundState.PreDeal)
              {
	             this.enableDealButton();
              }
              if(bj1.rState == RoundState.PlayersActive)
              {
	             this.disableDealButton();
              this.enableHitButton();
              this.enableStayButton();
              this.enableDDButton();	
              }
	}
	
	disableHitButton()
	{
		const dbTemp = this.hitButton as HTMLInputElement;
        dbTemp.disabled = true;
	}

	enableHitButton()
	{
		const dbTemp = this.hitButton as HTMLInputElement;
        dbTemp.disabled = false;
	}
	
	disableStayButton()
	{
		const dbTemp = this.stayButton as HTMLInputElement;
        dbTemp.disabled = true;
	}

	enableStayButton()
	{
		const dbTemp = this.stayButton as HTMLInputElement;
        dbTemp.disabled = false;
	}
	
	disableDDButton()
	{
		const dbTemp = this.ddButton as HTMLInputElement;
		const gTemp = document.getElementById("ddb1") as HTMLInputElement;
		gTemp.disabled = true;
        dbTemp.disabled = true;
	}

	enableDDButton()
	{
		const dbTemp = this.ddButton as HTMLInputElement;
		const gTemp = document.getElementById("ddb1") as HTMLInputElement;
		gTemp.disabled = false;
        dbTemp.disabled = false;
	}
	
	disableDealButton()
	{
		const dbTemp = this.dealButton as HTMLInputElement;
		const gTemp = document.getElementById("db1") as HTMLInputElement;
		gTemp.disabled = true;
        dbTemp.disabled = true;
	}

	enableDealButton()
	{
		const dbTemp = this.dealButton as HTMLInputElement;
		const gTemp = document.getElementById("db1") as HTMLInputElement;
		gTemp.disabled = false;
        dbTemp.disabled = false;
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

}

// Part of view
// Really just finishing up the BlackJackView initialization.
function createBlackJackGame()
{
   document.body.appendChild(bj1view.dealerView.pElement);
   bj1.d2.hands[0].addCallbackObject(bj1view.dealerView);   // Should be moved to the handView

   let i: number = 0;  //This needs to be hands, not players
   let j: number = 0;
   for(i = 0; i < bj1view.playerView.length; i++)
   {
      document.body.appendChild(bj1view.playerView[i].pElement);
      for(j = 0; j < bj1view.playerView[i].hView.length; j++)
      {
         bj1.p2[i].hands[j].addCallbackObject(bj1view.playerView[i].hView[j]);
      }
   }


  // Leave action buttons with player 1 for now.
  bj1view.createHitButton();
  bj1view.playerView[0].pElement.appendChild(bj1view.hitButton);

  bj1view.createStayButton();
  bj1view.playerView[0].pElement.appendChild(bj1view.stayButton);

  bj1view.createDDButton();
  bj1view.playerView[0].pElement.appendChild(bj1view.ddButton);

  bj1view.createDealButton();
  bj1view.playerView[0].pElement.appendChild(bj1view.dealButton);

}

// Part of view
declare global {
    interface Window {
        play3:any;
    }
}

let bj1view: BlackJackView;
	let firstTime: boolean = true;  // This should really be another PlayerAction state.
window.play3 = function (type: PlayerAction)
{
	if(type == PlayerAction.InitiateBlackJackView)
	{
		bj1view = new BlackJackView();
		bj1view.initBlackJackEngine();
	}
	else
	{
    	
    	executeHand(type);
        if(firstTime)
        {
	       firstTime = false;
        }
        else
        {
	       if(type == PlayerAction.Hit)
           {
	          bj1view.disableDDButton();
           }
           bj1view.updateViewState();
        }
    }
}





