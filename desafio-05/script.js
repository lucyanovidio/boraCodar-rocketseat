// ===== Variables =====

// Screens
let currentCalcScreen = document.querySelector(".calculator__current_calc");
let currentOperatorScreen = document.querySelector(
  ".calculator__current_operator"
);
let currentResultScreen = document.querySelector(".calculator__current_result");

// Buttons
const operatorBtns = document.querySelectorAll(".calculator__operator");
const numberBtns = document.querySelectorAll(".calculator__number");
const clearAllBtn = document.querySelector(".calculator__clear_all");
const clearOneBtn = document.querySelector(".calculator__clear_one");
const equalBtn = document.querySelector(".calculator__equal");
const historyBtn = document.querySelector(".calculator__history");

let history = [];

// ===== Events =====

clearAllBtn.addEventListener("click", clearAll);
clearOneBtn.addEventListener("click", clearOne);
historyBtn.addEventListener("click", showHistory);

equalBtn.addEventListener("click", () => {
  if (currentOperatorScreen.innerText !== "=") {
    calculate(equalBtn);
  }
});

operatorBtns.forEach(operatorBtn => {
  operatorBtn.onclick = () => {
    // Clearing if history is on screen
    if (currentOperatorScreen.innerText === historyBtn.innerText) {
      clearAll();
    }

    // Checking operation to prohibit operators after operators
    let firstCalcIntoArray = currentResultScreen.innerText.split("");
    let lastChar = firstCalcIntoArray[firstCalcIntoArray.length - 1];
    let isLastCharAnOperator = 
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "*" ||
      lastChar === "/" ||
      lastChar === "%";
    let isOperatorBtnProhibitedChar =
      operatorBtn.innerText === "*" ||
      operatorBtn.innerText === "/" ||
      operatorBtn.innerText === "%";

    // Preventing operation from starting with: *, / ou %
    if (currentResultScreen.innerText === "0" && isOperatorBtnProhibitedChar) {
      return;
    }
    // First operation
    if (!currentCalcScreen.innerText && !isLastCharAnOperator) {
      addOnResultScreen(operatorBtn);
      return;
    }
    // Next operations, happen only if last char is a number
    if (!isLastCharAnOperator) {
      calculate(operatorBtn);
    }
  };
});

numberBtns.forEach(numberBtn => {
  numberBtn.onclick = () => {
    // Clearing if history is on screen
    if (currentOperatorScreen.innerText === historyBtn.innerText) {
      clearAll();
    }

    // First operation
    if (!currentCalcScreen.innerText) {
      addOnResultScreen(numberBtn);
      return;
    }
    // Next operations
    if (currentResultScreen.innerText === currentCalcScreen.innerText) {
      currentResultScreen.innerText = "";
    }
    addOnResultScreen(numberBtn);
  };
});

// ===== Functions =====

function addOnResultScreen(element) {
  if (currentResultScreen.innerText == 0) {
    currentResultScreen.innerText = "";
  }
  currentResultScreen.innerText += element.innerText;
}

function calculate(operator) {
  let lastOperator = currentOperatorScreen.innerText;
  currentOperatorScreen.innerText = operator.innerText;

  // Conditions for first operation
  if (!currentCalcScreen.innerText) {
    currentCalcScreen.innerText = currentResultScreen.innerText;
  }
  if (currentCalcScreen.innerText === currentResultScreen.innerText) {
    let firstCalculation = currentResultScreen.innerText
    history.push(firstCalculation);
    
    currentResultScreen.innerText = eval(currentResultScreen.innerText).toFixed(2);
    return;
  }

  // Next operations

  // Starting writing the result on the screen above
  if (isCalcScreenAnOperation()) {
    currentCalcScreen.innerText = currentResultScreen.innerText;
  }
  // Conditions for next operations
  if (
    !isCalcScreenAnOperation() &&
    currentCalcScreen.innerText != currentResultScreen.innerText
  ) {
    let calculation =
      currentCalcScreen.innerText +
      lastOperator +
      currentResultScreen.innerText;

    history.push(calculation);

    currentCalcScreen.innerText = eval(calculation).toFixed(2);
    currentResultScreen.innerText = eval(calculation).toFixed(2);
  }
}

function clearAll() {
  currentCalcScreen.innerText = "";
  currentOperatorScreen.innerText = "";
  currentResultScreen.innerText = "0";
}

function clearOne() {
  let currentText = currentResultScreen.innerText;
  let newText = currentText.split("");

  newText.pop();
  currentResultScreen.innerText = newText.join("");
}

function isCalcScreenAnOperation() {
  let calcScreenIntoArray = currentCalcScreen.innerText.split("");
 
  return (
    calcScreenIntoArray.indexOf("+") > 0 ||
    calcScreenIntoArray.indexOf("-") > 0 ||
    calcScreenIntoArray.indexOf("*") > 0 ||
    calcScreenIntoArray.indexOf("/") > 0 ||
    calcScreenIntoArray.indexOf("%") > 0
  );
}

function showHistory() {
  if (history.length === 0) {
    return;
  }

  currentCalcScreen.innerText = "";
  currentOperatorScreen.innerText = historyBtn.innerText;
  currentResultScreen.innerText = history[history.length - 1];
}