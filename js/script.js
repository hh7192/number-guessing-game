// -------------------- READING DOM ELEMENTS --------------------//
const userInput = document.querySelector("#userInput");
const guessButton = document.querySelector("#guessButton");
const resetButton = document.querySelector("#resetButton");
const previousGuesses = document.querySelector("#previousGuesses");
const remainingGuesses = document.querySelector("#remainingGuesses");
const output = document.querySelector("#output");
const error = document.querySelector("#error");
const resultContainer = document.querySelector("#resultContainer");
const finalMessage = document.querySelector("#finalMessage");

// -------------------- INITIALIZE --------------------//
let number = Math.ceil(Math.random() * 100);
// console.log(number);
let guesses = [];
let chances = 5;

// -------------------- FUNCTIONS --------------------//
// run the game
function runGame() {
  let userInputValue = Number(userInput.value);
  if (userInputValue) {
    if (isNaN(userInputValue)) {
      userInput.value = "";
      error.innerHTML = `
            <span class='text-danger'>
                That is not a number you fool!
            </span>
        `;
      setTimeout(() => error.remove(), 3000);
    } else if (userInputValue > 100 || userInputValue < 1) {
      userInput.value = "";
      error.innerHTML = `
            <span class='text-danger'>
                Which part of between 1 and 100 you didn't understand?!
            </span>
        `;
      setTimeout(() => error.remove(), 3000);
    }
  }
  if (userInputValue < 100 && userInputValue > 1) {
    if (userInputValue === number) {
      output.innerHTML = `
            <h4 class="output text-success m-5 p-3">
                Bingo! Your Number was ${number} 
            </h4>
        `;
      resultContainer.style.display = "block";
      finalMessage.innerHTML = `
            <span class="resultWin messageWin">
                You Won, Smart Ass!
            </span>"
        `;
      userInput.disabled = true;
    } else if (
      Math.abs(number - userInputValue) < 10 &&
      userInputValue > number
    )
      output.innerHTML = `
            <h4 class="output text-warning m-5 p-3">
                Ooooo! My number is slightly lesser than your guess!
            </h4>
        `;
    else if (Math.abs(number - userInputValue) < 10 && userInputValue < number)
      output.innerHTML = `
            <h4 class="output text-warning m-5 p-3">
                Ooooo! My number is slightly higher than your guess!
            </h4>
        `;
    else if (Math.abs(number - userInputValue) < 5 && userInputValue < number)
      output.innerHTML = `
            <h4 class="output text-danger m-5 p-3">
                It's BOILING! Higher baby, HIGHER!
            </h4>
        `;
    else if (Math.abs(number - userInputValue) < 5 && userInputValue > number)
      output.innerHTML = `
            <h4 class="output text-danger m-5 p-3">
                It's BOILING! Lesser baby, LESSER!
            </h4>
        `;

    if (Math.abs(number - userInputValue) >= 10 && userInputValue > number)
      output.innerHTML = `
            <h4 class="output m-5 p-3">
                Haha! Way too High!
            </h4>
        `;
    else if (Math.abs(number - userInputValue) >= 10 && userInputValue < number)
      output.innerHTML = `
            <h4 class="output m-5 p-3">
                Haha! Way too Low!
            </h4>
        `;

    updateUI();
  }
}

// update the UI on every entry
function updateUI() {
  let userInputValue = Number(userInput.value);
  userInput.value = "";
  guesses.push(userInputValue);
  previousGuesses.innerHTML += ` 
      <span class="guessesBox">
          ${userInputValue}
      </span>
  `;

  chances--;
  remainingGuesses.innerHTML = chances;
  if (chances === 0) {
    resultContainer.style.display = "block";
    finalMessage.innerHTML = `
        <span class="resultLose messageLose">You Lost, Loser!</span>"
    `;
    userInput.disabled = true;
  }
}

// reset the game
function playAgain() {
  number = Math.ceil(Math.random() * 100);
  //   console.log(number);
  guesses = [];
  chances = 10;
  previousGuesses.innerHTML = "";
  remainingGuesses.innerHTML = chances;
  resultContainer.style.display = "none";
  output.innerHTML = "";
  userInput.disabled = false;
}

// -------------------- EVENTS --------------------//
guessButton.onclick = runGame;

resetButton.onclick = playAgain;

userInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") runGame();
});
