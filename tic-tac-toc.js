// Get all elements
const buttons = document.querySelectorAll('.box');
const resetButton = document.getElementById('resetGame');
const playerScore = document.getElementById('playerScore');
const tableContainer = document.querySelector('.TableContainer');
const scoreTable = playerScore.querySelectorAll('td');
const message = document.querySelector('.containerr');
const messages = document.querySelector('.messages');

// Initialize variables
let currentPlayer = 'X';
let gameOver = false;
let moves = 0;
let xScore = 0;
let oScore = 0;
let lastWinner = null;
// alert input how many rounds you wat to play

let inputRound;
let round;

while (true) {
  inputRound = prompt("How many rounds do you want to play?");
  round = Number(inputRound);

  if (isNaN(round) || round % 1 !== 0 || round <= 0 || round > 50) {
    alert("The number you input is invalid");
  } else {
    break;
  }
}
 
// Add event listeners to buttons
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (!gameOver && button.textContent === "") {
      button.textContent = currentPlayer;
      moves++;
      checkWinner();
      switchPlayer();
    }
  });
});

// Reset game
resetButton.addEventListener('click', () => {
  resetGame();
});

// Check winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = null;
  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    const buttonsArray = Array.from(buttons);
    if (
      buttonsArray[a].textContent === buttonsArray[b].textContent &&
      buttonsArray[b].textContent === buttonsArray[c].textContent &&
      buttonsArray[a].textContent !== ""
    ) {
      winner = buttonsArray[a].textContent;
    }
  });
  if (winner) {
    gameOver = true;
    if (winner === 'X') {
      xScore++;
      scoreTable[1].textContent = xScore;
    } else {
      oScore++;
      scoreTable[0].textContent = oScore;
    }
    lastWinner = winner;
    announceWinner(winner);
    checkGameEnd();
  } else if (moves === 9) {
    announceDraw();
    lastWinner = currentPlayer === 'X' ? 'O' : 'X';
    resetBoard();
  }
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Announce winner
function announceWinner(winner) {
  alert(`Player ${winner} wins this round!`);
}

// Announce draw
function announceDraw() {
  alert("It's a draw!");
}

// Reset game
function resetGame() {
  buttons.forEach((button) => {
    button.textContent = '';
  });
  currentPlayer = lastWinner === 'X' ? 'O' : lastWinner === 'O' ? 'X' : 'X';
  gameOver = false;
  moves = 0;
  xScore = 0;
  oScore = 0;
  scoreTable[0].textContent = xScore;
  scoreTable[1].textContent = oScore;
  message.style.display = "block";
  const messageElement = document.querySelector('.Message');
  if (messageElement) {
    messageElement.remove();
  }
}

// Reset board
function resetBoard() {
  buttons.forEach((button) => {
    button.textContent = '';
  });
  currentPlayer = lastWinner === 'X' ? 'O' : lastWinner === 'O' ? 'X' : 'X';
  gameOver = false;
  moves = 0;
}

// Check game end
function checkGameEnd() {
  if (xScore === round) {
    const createElement = document.createElement("div");
    createElement.setAttribute("class", "Message");
    createElement.innerHTML = `Congratulations to player <span style="color:blue">X</span>!🎉🎊🎊🎊🎊🎉🎉🎉🎉🎉🎉🎊🎊. Player <span style="color:blue">X</span> won the game <br> <span class="score"> ${xScore} : ${oScore} </span>`;
    messages.appendChild(createElement);
    message.style.display = "none";
    lastWinner = 'X';
  } else if (oScore === round) {
    const createElement = document.createElement("div");
    createElement.setAttribute("class", "Message");
    createElement.innerHTML = `Congratulations to player <span style="color:blue">O</span>!🎉🎊🎊🎊🎊🎉🎉🎉🎉🎉🎉🎊🎊. Player <span style="color:blue">O</span> won the game <br> <span class="score">${oScore} : ${xScore}</span>`;
    messages.appendChild(createElement);
    message.style.display = "none";
    lastWinner = 'O';
  } else {
    gameOver = false;
    lastWinner = currentPlayer === 'X' ? 'O' : 'X';
    resetBoard();
  }
}


