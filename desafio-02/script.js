// Variáveis
const rotateBtn = document.querySelector(".rotate_btn");
const closeBtn = document.querySelector(".close_btn");
const staticSofa = document.querySelector(".static_sofa");
const rotatingSofa = document.querySelector(".rotating_sofa");

// Eventos
rotateBtn.addEventListener("click", toggleElementsVisibility);
closeBtn.addEventListener("click", toggleElementsVisibility);

// Funções
function toggleElementsVisibility() {
    toggleVisibility(rotateBtn, closeBtn); 
    toggleVisibility(staticSofa, rotatingSofa);
}

function toggleVisibility(element_1, element_2) {
    element_1.classList.toggle("hide");
    element_2.classList.toggle("hide");
}