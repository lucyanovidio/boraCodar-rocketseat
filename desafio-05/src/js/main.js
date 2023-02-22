import { isAnOperator } from "./utils.js"
import { screen } from "./screen.js";
import { button } from "./button.js"

let firstTimeOperatorButtonClicked = 0;

window.onkeydown = (e) => handleKeydown(e);

button.equal.onclick = () => 
  handleEqualButtonClick(button.equal);
button.operators.forEach(button =>
  button.onclick = () => handleOperatorButtonClick(button));
button.numbers.forEach(button =>
  button.onclick = () => handleNumberButtonClick(button));

function calculate(operator) {
  // Getting last operator and element before writing new ones
  let lastOperator = screen.currentOperator.innerText;
  let firstElementOnCalc = screen.currentCalc.innerText;

  screen.currentOperator.innerText = operator.innerText;

  // Starting writing the result on the screen above
  if (!screen.currentCalc.innerText || isAnOperator(operator.innerText)) {
    screen.currentCalc.innerText =
      screen.currentResult.innerText + operator.innerText;
  }

  // Calculating and writing on screen
  
  const wasSignRecentlyToggled = firstElementOnCalc === "0-" || firstElementOnCalc === "0+";

  if (firstTimeOperatorButtonClicked >= 1 || wasSignRecentlyToggled || operator.innerText === "=") {
    if (lastOperator === "=") {
      firstElementOnCalc = screen.currentResult.innerText + operator.innerText;
    }

    let calculation = firstElementOnCalc + screen.currentResult.innerText;

    // In case it's an operator
    if (isAnOperator(operator.innerText) && lastOperator !== "=") {
      screen.currentCalc.innerText = eval(calculation) + operator.innerText;
      screen.currentResult.innerText = eval(calculation);
      return;
    }
    // In case it's an equal sign
    if (!isAnOperator(operator.innerText)) {
      screen.currentCalc.innerText = calculation;
      screen.currentResult.innerText = eval(calculation);
    }
  }
}

function handleKeydown(e) {
  button.operators.forEach(button => {
    let operator = button.querySelector("span");
    e.key === operator.innerText && button.click();
  });
  button.numbers.forEach(button => {
    e.key === button.innerText && button.click();
  });

  e.key === "Backspace" && button.clearEntry.click();
  e.key === "Enter" && button.equal.click();
  e.key === "Escape" && screen.clear(firstTimeOperatorButtonClicked);
}

function handleEqualButtonClick(button) {
  const readyForCalculation = 
    screen.currentOperator.innerText !== "=" && screen.currentCalc.innerText;
  if (readyForCalculation) calculate(button);
}

function handleOperatorButtonClick(button) {
  let operator = button.querySelector("span");
  calculate(operator);
  
  firstTimeOperatorButtonClicked++;
}

function handleNumberButtonClick(button) {
  let currentCalcIntoArray = screen.currentCalc.innerText.split("");
  currentCalcIntoArray.pop();

  const currentCalcAndResultAreEqual = 
    currentCalcIntoArray.join("") === screen.currentResult.innerText;
  const isScreenFull = screen.currentOperator.innerText === "=";
  const isThisTheFirstOperation = screen.currentResult.innerText == 0;

  if (currentCalcAndResultAreEqual) screen.currentResult.innerText = "";
  if (isScreenFull) screen.clear(firstTimeOperatorButtonClicked);
  if (isThisTheFirstOperation) screen.currentResult.innerText = "";

  screen.currentResult.innerText += button.innerText;
}

// Feather Icons Lib
feather.replace();