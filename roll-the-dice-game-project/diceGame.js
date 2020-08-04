/* Punktestand und wer ist am Zug? */
let player1score = 0;
let player2score = 0;
let firstPlayerTurn = true;

const playersTurnHeading = document.getElementById("playersTurn");
const player1Scoreboard = document.getElementById("player-1-scoreboard");
const player2Scoreboard = document.getElementById("player-2-scoreboard");
const player1DiceScore = document.getElementById("player-1-dice");
const player2DiceScore = document.getElementById("player-1-dice");
const buttonRollDice = document.getElementById("btn-roll-dice");
const buttonResetGame = document.getElementById("btn-reset-game");

buttonRollDice.addEventListener("click", function() {
    console.log("Button clicked!");
})

console.log("button");