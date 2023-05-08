const rock = document.getElementById("rockEl");
const paper = document.getElementById("paperEl");
const scissors = document.getElementById("scissorsEl");
const resetGame = document.getElementById("resetGame");
const resultEl = document.getElementById("resultEl");
const movesEl = document.getElementById("movesEl");
const scoreEl = document.getElementById("scoreEl");

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

resetGame.addEventListener("click", function () {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem("score");
  updateScore();
});

let score = JSON.parse(localStorage.getItem("score"));
let result = "";

if (score === null) {
  score = {
    Wins: 0,
    Losses: 0,
    Ties: 0,
  };
}

updateScore();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You Lose.";
    } else if (computerMove === "scissors") {
      result = "You Win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You Lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose.";
    } else if (computerMove === "paper") {
      result = "You Win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }
  if (result === "You Win.") {
    score.Wins += 1;
  } else if (result === "You Lose.") {
    score.Losses += 1;
  } else if (result === "Tie.") {
    score.Ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScore();
  resultEl.textContent = result;
  movesEl.innerHTML = `You
  <img class="move-icon" src="emojis/${playerMove}-emoji.png" />
  <img class="move-icon" src="emojis/${computerMove}-emoji.png" />
  Computer`;
}

function updateScore() {
  scoreEl.textContent = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties} `;
}
rock.addEventListener("click", function () {
  playGame("rock");
});

paper.addEventListener("click", function () {
  playGame("paper");
});

scissors.addEventListener("click", function () {
  playGame("scissors");
});
