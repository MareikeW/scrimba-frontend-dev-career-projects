/* Punktestand und wer ist am Zug? */
let player1Score = 0;
let player2Score = 0;
let firstPlayerTurn = true;

const playersTurnHeading = document.getElementById("playersTurn");
const player1Scoreboard = document.getElementById("player-1-scoreboard");
const player2Scoreboard = document.getElementById("player-2-scoreboard");
const player1DiceScore = document.getElementById("player-1-dice");
const player2DiceScore = document.getElementById("player-2-dice");
const buttonRollDice = document.getElementById("btn-roll-dice");

const buttonResetGame = document.getElementById("btn-reset-game");

const openModalWindow = document.getElementById("modal-window");
const buttonWhoWillStart = document.getElementById("who-may-start");
const modalParagraph = document.getElementById("modal-paragraph");

function showResetButton() {
    buttonRollDice.style.display = "none";
    buttonResetGame.style.display = "block";
}

buttonRollDice.addEventListener("click", function() {
    // Generiere eine Zahl zwischen 1 und 6 per Zufall
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    if (firstPlayerTurn) {
        player1DiceScore.textContent = randomNumber;
        if (randomNumber === 6) {
            player1Score -= 6;
        } else {
            player1Score += randomNumber;
        }

        player1Scoreboard.textContent = player1Score;
        player1DiceScore.classList.remove("active");
        player2DiceScore.classList.add("active");
        playersTurnHeading.textContent = "Spieler 1 ist an der Reihe";
    } else {
        player2DiceScore.textContent = randomNumber;
        if (randomNumber === 6) {
            player2Score -= 6;
        } else {
            player2Score += randomNumber;
        }
        player2Scoreboard.textContent = player2Score;
        player2DiceScore.classList.remove("active");
        player1DiceScore.classList.add("active");
        playersTurnHeading.textContent = "Spieler 2 ist an der Reihe";
    }
// Wer zuerst 30 Punkte erzielt, gewinnt.
    if (player1Score >= 25) {
        playersTurnHeading.textContent = "Herzlichen Glückwunsch! Spieler 1 hat gewonnen!";
        showResetButton();
    } else if (player2Score >= 25) {
        playersTurnHeading.textContent = "Herzlichen Glückwunsch! Spieler 2 hat gewonnen!";
        showResetButton();
    }
// Spielerwechsel
    firstPlayerTurn = !firstPlayerTurn;
})


buttonResetGame.addEventListener("click", function() {
    reset();
})

/* Alles wird zurück auf Anfang gestellt */
function reset() {
    playersTurnHeading.textContent = "Spieler 1 ist an der Reihe";
    player1Scoreboard.textContent = "0";
    player2Scoreboard.textContent = "0";
    player1DiceScore.textContent = " ";
    player2DiceScore.textContent = " ";
    player1Score = 0;
    player2Score = 0;
    firstPlayerTurn = true;
    player1DiceScore.classList.add("active");
    player2DiceScore.classList.remove("active");

    buttonResetGame.style.display = "none";
    openModalWindow.style.display = "block";
    //buttonRollDice.style.display = "block";
}

/* Verzögert die automatische Schließung des Modalwindows. */
function timeOut() {
    setTimeout(function(){ 
        openModalWindow.style.display = "none";
        modalParagraph.textContent = `Um herauszufinden wer anfangen darf, klicke auf "Würfeln".`;
        buttonRollDice.style.display = "block";
    }, 3000);
}

/* Öffnet ein Modalwindow, in dem man um die Startreihenfolge würfeln kann. */
buttonWhoWillStart.addEventListener("click", function() {
    let randomNumberForName = Math.floor(Math.random() * 2) + 1;

    if (randomNumberForName === 1) {
        modalParagraph.textContent = "Spieler 1 beginnt!";
        timeOut();
    } else {
        modalParagraph.textContent = "Spieler 2 beginnt!";
        timeOut();
    }

})

