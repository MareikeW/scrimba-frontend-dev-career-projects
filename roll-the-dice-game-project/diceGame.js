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

function showResetButton() {
    buttonRollDice.style.display = "none";
    buttonResetGame.style.display = "block";
}
buttonRollDice.addEventListener("click", function() {
    // Generiere eine Zahl zwischen 1 und 6 per Zufall
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    if (firstPlayerTurn) {
        player1DiceScore.textContent = randomNumber;
        player1Score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        player1DiceScore.classList.remove("active");
        player2DiceScore.classList.add("active");
        playersTurnHeading.textContent = "Spieler 1 ist an der Reihe";
    } else {
        player2DiceScore.textContent = randomNumber;
        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2DiceScore.classList.remove("active");
        player1DiceScore.classList.add("active");
        playersTurnHeading.textContent = "Spieler 2 ist an der Reihe";
    }

    if (player1Score >= 20) {
        playersTurnHeading.textContent = "Herzlichen Glückwunsch! Spieler 1 hat gewonnen!";
        showResetButton();
    } else if (player2Score >= 20) {
        playersTurnHeading.textContent = "Herzlichen Glückwunsch! Spieler 2 hat gewonnen!";
        showResetButton();
    }

    firstPlayerTurn = !firstPlayerTurn;
})

