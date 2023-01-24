// Variáveis
const defaultBtnsContainer = document.querySelectorAll(
  "#default-btns-container tr, #default-btns-container td, #default-btns-container button"
);
const hoverBtnsContainer = document.querySelectorAll(
  "#hover-btns-container tr, #hover-btns-container td, #hover-btns-container button"
);
const focusBtnsContainer = document.querySelectorAll(
  "#focus-btns-container tr, #focus-btns-container td, #focus-btns-container button"
);
const disabledBtnsContainer = document.querySelectorAll(
  "#disabled-btns-container tr, #disabled-btns-container td, #disabled-btns-container button"
);
const loadingBtnsContainer = document.querySelectorAll(
  "#loading-btns-container tr, #loading-btns-container td, #loading-btns-container button"
);
const movableBtnsContainer = document.querySelectorAll(
  "#movable-btns-container tr, #movable-btns-container td, #movable-btns-container button"
);
const previewContainerText = document.querySelector(".preview-container p");
const previewContainerButtons = document.querySelectorAll(
  ".preview-container button"
);
const buttonsContainer = document.querySelector(".buttons");

// Eventos
defaultBtnsContainer.forEach((element) => {
  element.addEventListener("click", showDefaultBtnsPreview);
});
hoverBtnsContainer.forEach((element) => {
  element.addEventListener("click", showHoverBtnsPreview);
});
focusBtnsContainer.forEach((element) => {
  element.addEventListener("click", showFocusBtnsPreview);
});
disabledBtnsContainer.forEach((element) => {
  element.addEventListener("click", showDisabledBtnsPreview);
});
loadingBtnsContainer.forEach((element) => {
  element.addEventListener("click", showLoadingBtnsPreview);
});
movableBtnsContainer.forEach((element) => {
  element.addEventListener("click", showMovableBtnsPreview);
});

// Funções
function showDefaultBtnsPreview() {
  showPreview("default-theme-preview");
}
function showHoverBtnsPreview() {
  showPreview("hover-theme-preview");
}
function showFocusBtnsPreview() {
  showPreview("focus-theme-preview");
}
function showDisabledBtnsPreview() {
  showPreview("disabled-theme-preview");
}
function showLoadingBtnsPreview() {
  showPreview("loading-theme-preview");
}
function showMovableBtnsPreview() {
  showPreview("movable-theme-preview");
}

function showPreview(cssClass) {
  previewContainerButtons.forEach((button) => {
    if (button.classList.length != 0) {
      button.classList = "";
    }
    button.classList.add(cssClass);
  });
  togglePreviewElementsVisibility();
}

function togglePreviewElementsVisibility() {
  if (previewContainerText.classList.length === 0) {
    previewContainerText.classList.add("hide");
  }
  buttonsContainer.classList.remove("hide");
}