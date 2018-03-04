
// ----------------------SETUP ----------------------//

var scores, roundScore, activePlayer, total;
var rollBtn = document.querySelector(".btn-roll");
var holdBtn = document.querySelector(".btn-hold");
var newBtn = document.querySelector(".btn-new");
var rulesBtn = document.querySelector(".btn-rules");
var close = document.querySelector(".closeWindow");
var diceDisplay = document.querySelector(".dice");
var diceDisplay2 = document.querySelector(".dice_2");
var player0Score = document.querySelector("#score-0");
var player1Score = document.querySelector("#score-1");
var player0Current = document.querySelector("#current-0");
var player1Current = document.querySelector("#current-1");
var player0Panel = document.querySelector(".player-0-panel");
var player1Panel = document.querySelector(".player-1-panel");
var setupForm = document.querySelector("input");
var number = document.querySelector("#number");
var rules = document.querySelector(".rules");
var playerPanel = document.querySelector(".player-0-panel");
// ================INIT===========================//

init();
helpButton();
closeHelp();

// play until user form
setupForm.addEventListener("change", function() {
    this.value = number.value;
});
// ======== ROLL DICE BUTTON ========================== //

rollBtn.addEventListener("click", function(){
    // generate random number
    var dice = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);
    // display the result
    diceDisplay.style.display = "block";
    diceDisplay.setAttribute("src", "resources/dice-" + dice + ".png");
    diceDisplay2.style.display = "block";
    diceDisplay2.setAttribute("src", "resources/dice-" + dice2 + ".png");
    // update the round score
    if ((dice !== 1 && dice2 !== 1) && (dice !== dice2)) {
    	// add score
    	roundScore += (dice + dice2);
    	document.querySelector("#current-" + activePlayer).textContent = roundScore;
    // VARITATION FOR ONE DICE
    // 	total = 0;
    // // the first time dice equals 6
    // } else if (dice === 6 && total === 0) {
    // 	total += dice;
    // 	roundScore += dice;
    // 	document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else if ((dice === dice2) && (dice !== 1 || dice2 !== 1) && (dice !== 6 && dice2 !== 6)) {
        roundScore += ((dice + dice2) * 2);
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else if (dice === 6 && dice2 === 6) {
    	scores[activePlayer] = 0;
    	document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    	nextPlayer();
    } else {
    	nextPlayer();
    }

});

// ============ HOLD BUTTON ====================== //

holdBtn.addEventListener("click", function() {
	// add current score to global score
	scores[activePlayer] += roundScore;
	// update the display
	document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
	// check if player won the game
    if (scores[activePlayer] >= setupForm.value) {
        document.querySelector("#name-" + activePlayer).textContent = "WINNER!"
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        diceDisplay.style.display = "none";
        diceDisplay2.style.display = "none";
        rollBtn.classList.add("noClick");
        holdBtn.classList.add("noClick");
    } else {
        nextPlayer();
    }
});

// ====================NEW GAME BUTTON==================//

newBtn.addEventListener("click", init);

// ================  FUNCTIONS ======================== //

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	total = 0;
	diceDisplay.style.display = "none";
	diceDisplay2.style.display = "none";
	player0Score.textContent = 0;
	player1Score.textContent = 0;
	player0Current.textContent = 0;
	player1Current.textContent = 0;
	document.querySelector("#name-0").textContent = "Player 1";
	document.querySelector("#name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
	rollBtn.classList.remove("noClick");
    holdBtn.classList.remove("noClick");
    rules.style.display = "none";
    playerPanel.style.display = "block";
}

function nextPlayer() {
	// next player
    	if (activePlayer === 0) {
    		activePlayer = 1;
    	} else {
    		activePlayer = 0;
    	}
    	// reset round score to 0
    	roundScore = 0;
    	player0Current.textContent = 0;
    	player1Current.textContent = 0;
    	total = 0;
    	// toggle between players on the game panel
    	player0Panel.classList.toggle("active");
    	player1Panel.classList.toggle("active");
    	// hide dice display
    	diceDisplay.style.display = "none";
    	diceDisplay2.style.display = "none";
}

function helpButton() {
    rulesBtn.addEventListener("click", function () {
    	rules.style.display = "block";
    	playerPanel.style.display = "none";
        diceDisplay.style.display = "none";
        diceDisplay2.style.display = "none";
        rollBtn.classList.add("noClick");
        holdBtn.classList.add("noClick");
    });
}

function closeHelp() {
    close.addEventListener("click", function() {
    	rules.style.display = "none";
    	playerPanel.style.display = "block";
        diceDisplay.style.display = "block";
        diceDisplay2.style.display = "block";
        rollBtn.classList.remove("noClick");
        holdBtn.classList.remove("noClick");
    });
}
