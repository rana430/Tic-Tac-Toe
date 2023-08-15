const cells = document.querySelectorAll(".cell");
const reset = document.getElementById("reset");
const messageDiv = document.getElementById("message");

let currentPlayer = "X";
let gameOver = false;

// Reset the game
reset.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#eee";
  });
  currentPlayer = "X";
  gameOver = false;
  messageDiv.textContent = "";
  messageDiv.style.display = "none";
});
// Switch player

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameOver && cell.textContent === "") {
      cell.textContent = currentPlayer;
      checkWinner();
      switchPlayer();
    }
  });
});

function checkWinner() {
  //handle winning case

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const idx of winningCombos) {
    const [a, b, c] = idx;

    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameOver = true;
      cells[a].style.backgroundColor = "#ff00dd";
      cells[b].style.backgroundColor = "#ff00dd";
      cells[c].style.backgroundColor = "#ff00dd";
      messageDiv.textContent = `Player ${currentPlayer} wins!`;
      messageDiv.style.display = "block";
      break;
    }

    if (
      !gameOver &&
      Array.from(cells).every((cell) => cell.textContent !== "")
    ) {
      gameOver = true;
      messageDiv.textContent = `It's a Tie`;
      messageDiv.style.display = "block";
    }
  }
}
