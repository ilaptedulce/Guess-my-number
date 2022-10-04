const startBtn = document.getElementById('start')
const checkBtn = document.getElementById('check')
const resetBtn = document.getElementById('reset')
const userInput = document.getElementById('guessField')
const info = document.getElementById('info')
const guesses = document.querySelector('#guesses')
let game
class Game {
  #secretNr = 0
  remainingAttempts = 5
  listOfguesses = []
  getSecretNumber () {
    this.#secretNr = Math.floor(Math.random() * 20) + 1
  }

  addGuess (guess) {
    this.listOfguesses.push(guess.getValue())
  }

  checkGuess (guess) {
    const guessValue = guess.getValue()
    this.remainingAttempts -= 1
    if (this.remainingAttempts > 0) {
      if (guessValue === this.#secretNr) {
        info.innerHTML = `You won. Number was ${this.#secretNr}`
        checkBtn.disabled = true
        userInput.disabled = true
        resetBtn.classList.remove('disable')
        container.classList.add('winner')
      } else if (guessValue > this.#secretNr) {
        info.innerHTML = `The random number is less than ${guessValue}. You have ${this.remainingAttempts} more attempts`
      } else {
        info.innerHTML = `The random number is greater than ${guessValue}. You have ${this.remainingAttempts} more attempts`
      }
    } else {
      info.innerHTML = `You lost. Number was ${this.#secretNr}`
      checkBtn.disabled = true
      userInput.disabled = true
      resetBtn.classList.remove('disable')
    }
    userInput.value = ''
    guesses.innerHTML = 'Previous guesses:' + this.listOfguesses.toString()
  }

  resetGame () {
    guesses.innerHTML = ''
    this.remainingAttempts = 5
    guesses.classList.add('disable')
    startBtn.classList.remove('disable')
    info.innerHTML = "If you're ready click Start"
    this.getSecretNumber()
  }
}

class Guess {
  #value = 0
  setValue (userInputValue) {
    this.#value = parseInt(userInputValue)
  }

  getValue () {
    return this.#value
  }
}
startBtn.addEventListener('click', () => {
  game = new Game()
  game.getSecretNumber()
  info.innerHTML = 'You have 5 attempts'
  startBtn.classList.add('disable')
  userInput.disabled = false
  checkBtn.disabled = false
  guesses.classList.remove('disable')
})

checkBtn.addEventListener('click', () => {
  const value = userInput.value
  const guess = new Guess()
  guess.setValue(value)
  game.addGuess(guess)
  game.checkGuess(guess)
})
resetBtn.addEventListener('click', () => {
  game.resetGame()
  resetBtn.classList.add('disable')
})
userInput.addEventListener('onkeyup' , () => validateInput())
function validateInput() {
  if( userInput.value > 20 || userInput.value < 0){
    checkBtn.disabled = true
  } else {
    checkBtn.disabled = false
  }
  
}
