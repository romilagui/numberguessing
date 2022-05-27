/*
RULES OF THE GAME:
- The user has to guess a number between a min and max
- The gets an amount of guesses
- Turnes red for worng answers and green for the right answer
- Notify the user the number of guesses remaining
- Notify the user of the correct answer if loose
- Let user choose to play again
*/
// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
// We create first the 'game' wrapper
// We have an id of game surrounding everything 
// we want to wrape everything in a #game
// We have the classes min-num and max-num
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
 
// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Create event listener for the submit button
// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // Conditional to validate our input 1<guessInput<10
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  // Check if it is the wining number
  if(guess === winningNum){
    // Game over - won
     gameOver(true, `${winningNum} is correct, YOU WIN!`)
  } else {
    // Wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0){
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game is not over but answer is incorrect
    //Change border color
    guessInput.style.borderColor = 'red';
    // Clear Input
    guessInput.value = '';
    // Tell user its the worng number
    setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}