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
const clearBtn = document.querySelector(".calculator__clear");
const clearEntryBtn = document.querySelector(".calculator__clear_entry");
const equalBtn = document.querySelector(".calculator__equal");
const toggleSignBtn = document.querySelector(".calculator__toggle_sign");

let firstTimeOperatorBtnClicked = 0;

// ===== Events =====

clearBtn.addEventListener("click", clear);
clearEntryBtn.addEventListener("click", clearEntry);
toggleSignBtn.addEventListener("click", toggleSign);

// Operating by typing
window.addEventListener("keydown", e => {
  operatorBtns.forEach(operatorBtn => {
    let operator = operatorBtn.querySelector("span");
    e.key === operator.innerText && operatorBtn.click();
  });
  numberBtns.forEach(numberBtn => {
    e.key === numberBtn.innerText && numberBtn.click();
  });
  e.key === "Backspace" && clearEntryBtn.click();
  e.key === "Enter" && equalBtn.click();
  e.key === "Escape" && clear();
});

equalBtn.addEventListener("click", () => {
  if (currentOperatorScreen.innerText !== "=" && currentCalcScreen.innerText) {
    // Operations by equal button
    calculate(equalBtn);
  }
});

operatorBtns.forEach(operatorBtn => {
  operatorBtn.onclick = () => {
    firstTimeOperatorBtnClicked++;
    // Operations by operator button
    let operator = operatorBtn.querySelector("span");
    calculate(operator);
  };
});

numberBtns.forEach(numberBtn => {
  numberBtn.onclick = () => {
    // Removing operator from calc screen to check if we need to erase before inserting new number
    let currentCalcIntoArray = currentCalcScreen.innerText.split("");
    currentCalcIntoArray.pop();

    if (currentCalcIntoArray.join("") === currentResultScreen.innerText) {
      currentResultScreen.innerText = "";
    }

    // Clearing if the screen is full
    if (currentOperatorScreen.innerText === "=") {
      clear();
    }
    // Inserting new number
    if (currentResultScreen.innerText == 0) {
      currentResultScreen.innerText = "";
    }
    currentResultScreen.innerText += numberBtn.innerText;
  };
});

// ===== Functions =====

function calculate(operator) {
  // Getting last operator and element before writing new ones
  let lastOperator = currentOperatorScreen.innerText;
  let firstElementOnCalc = currentCalcScreen.innerText;

  currentOperatorScreen.innerText = operator.innerText;

  // Starting writing the result on the screen above
  if (!currentCalcScreen.innerText || isAnOperator(operator.innerText)) {
    currentCalcScreen.innerText =
      currentResultScreen.innerText + operator.innerText;
  }

  // Calculating and writing on screen
  if (firstTimeOperatorBtnClicked > 1 || operator.innerText === "=") {
    if (lastOperator === "=") {
      firstElementOnCalc = currentResultScreen.innerText + operator.innerText;
    }

    let calculation = firstElementOnCalc + currentResultScreen.innerText;

    // In case it's an operator
    if (isAnOperator(operator.innerText) && lastOperator !== "=") {
      currentCalcScreen.innerText = eval(calculation) + operator.innerText;
      currentResultScreen.innerText = eval(calculation);
      return;
    }
    // In case it's an equal sign
    if (!isAnOperator(operator.innerText)) {
      currentCalcScreen.innerText = calculation;
      currentResultScreen.innerText = eval(calculation);
    }
  }
}

function clear() {
  currentCalcScreen.innerText = "";
  currentOperatorScreen.innerText = "";
  currentResultScreen.innerText = "0";

  firstTimeOperatorBtnClicked = 0;
}

function clearEntry() {
  let currentResultText = currentResultScreen.innerText;
  let newResultText = currentResultText.split("");

  if (currentResultText.length > 1) {
    newResultText.pop();
    currentResultScreen.innerText = newResultText.join("");
    return;
  }
  currentResultScreen.innerText = "0";
}

function toggleSign() {
  let currentResultIntoArray = currentResultScreen.innerText.split("");
  let currentCalcIntoArray = currentCalcScreen.innerText.split("");

  if (currentResultIntoArray[0] === "-") {
    currentResultIntoArray.shift();
    currentResultScreen.innerText = currentResultIntoArray.join("");
    return;
  }
  if (currentResultIntoArray[0] !== "-" && currentOperatorScreen.innerText === "+") {
    currentCalcIntoArray.pop(); 
    // Removing the plus sign and adding the minus sign
    currentOperatorScreen.innerText = "-";
    currentCalcScreen.innerText = currentCalcIntoArray.join("") + "-";
    return;
  }
  if (currentResultIntoArray[0] !== "-" && currentOperatorScreen.innerText === "-") {
    currentCalcIntoArray.pop(); 
    // Removing the minus sign and adding the plus sign
    currentOperatorScreen.innerText = "+";
    currentCalcScreen.innerText = currentCalcIntoArray.join("") + "+";
    return;
  }
  if (currentResultIntoArray[0] !== "-" && !currentOperatorScreen.innerText && currentResultScreen.innerText !== "0") {
    // Adding the minus sign
    currentOperatorScreen.innerText = "-";
    currentCalcScreen.innerText = "0-";
    return;
  }
}

function isAnOperator(element) {
  return (
    element === "+" ||
    element === "-" ||
    element === "*" ||
    element === "/" ||
    element === "%"
  );
}

// Feather Icons Lib
feather.replace();