import { screen } from "./screen.js";

export const button = {
    operators: document.querySelectorAll(".calculator__operator"),
    numbers: document.querySelectorAll(".calculator__number"),
    equal: document.querySelector(".calculator__equal"),
    clear: document.querySelector(".calculator__clear"),
    clearEntry: document.querySelector(".calculator__clear_entry"),
    toggleCalculationSign: document.querySelector(".calculator__toggle_sign"),
    firstTimeOperatorClicked: 0,
};

button.clear.onclick = () => screen.clear();
button.clearEntry.onclick = () => screen.clearEntry();
button.toggleCalculationSign.onclick = () => screen.toggleCalculationSign();