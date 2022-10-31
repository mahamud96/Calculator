class Calculator {
  constructor(previousCalculationTextElement, currentNumberTextElement) {
    this.previousCalculationTextElement = previousCalculationTextElement
    this.currentNumberTextElement = currentNumberTextElement
    this.clear()
  }

  clear() {
    this.currentNumber = ''
    this.previousCalculation = ''
    this.operation = undefined
  }

  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentNumber.includes('.')) return
    this.currentNumber = this.currentNumber.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentNumber === '') return
    if (this.previousCalculation !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousCalculation = this.currentNumber
    this.currentNumber = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousCalculation)
    const current = parseFloat(this.currentNumber)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentNumber = computation
    this.operation = undefined
    this.previousCalculation = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentNumberTextElement.innerText =
      this.getDisplayNumber(this.currentNumber)
    if (this.operation != null) {
      this.previousCalculationTextElement.innerText =
        `${this.getDisplayNumber(this.previousCalculation)} ${this.operation}`
    } else {
      this.previousCalculationTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousCalculationTextElement = document.querySelector(
  '[data-previous-calculation]')
const currentNumberTextElement = document.querySelector('[data-current-number]')



// hooking up variables and making them function on calculator

const calculator = new Calculator(previousCalculationTextElement, currentNumberTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })