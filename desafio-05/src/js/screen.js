export const screen = {
  currentCalc: document.querySelector(".calculator__current_calc"),
  currentResult: document.querySelector(".calculator__current_result"),
  currentOperator: document.querySelector(".calculator__current_operator"),

  toggleCalculationSign() {
    let currentResultIntoArray = screen.currentResult.innerText.split("");
    let currentCalcIntoArray = screen.currentCalc.innerText.split("");

    const negativeNumber = 
        currentResultIntoArray[0] === "-";
    const positiveNumberOnFirstOperation =
      currentResultIntoArray[0] !== "-" &&
      !screen.currentOperator.innerText && screen.currentResult.innerText !== "0";
    const sumWithPositiveNumbers =
      currentResultIntoArray[0] !== "-" && screen.currentOperator.innerText === "+";
    const subtractionWithPositiveNumbers =
        currentResultIntoArray[0] !== "-" && screen.currentOperator.innerText === "-";

    if (negativeNumber) return switchToPositive(currentResultIntoArray);
    if (positiveNumberOnFirstOperation) return switchToNegative();
    if (sumWithPositiveNumbers) return switchToSubtraction(currentCalcIntoArray);
    if (subtractionWithPositiveNumbers) return switchToSum(currentCalcIntoArray);
  },
  clear(counter) {
    screen.currentCalc.innerText = "";
    screen.currentOperator.innerText = "";
    screen.currentResult.innerText = "0";
    counter = 0;
  },
  clearEntry() {
    let currentResultText = screen.currentResult.innerText;
    let newResultText = currentResultText.split("");
  
    if (currentResultText.length > 1) {
      newResultText.pop();
      screen.currentResult.innerText = newResultText.join("");
      return;
    }
    screen.currentResult.innerText = "0";
  }
};

function switchToPositive(operationArray) {
  operationArray.shift();
  screen.currentResult.innerText = operationArray.join("");
}

function switchToNegative() {
  screen.currentOperator.innerText = "-";
  screen.currentCalc.innerText = "0-";
}

function switchToSubtraction(operationArray) {
  operationArray.pop();
  screen.currentOperator.innerText = "-";
  screen.currentCalc.innerText = operationArray.join("") + "-";
}

function switchToSum(operationArray) {
  operationArray.pop();
  screen.currentOperator.innerText = "+";
  screen.currentCalc.innerText = operationArray.join("") + "+";
}