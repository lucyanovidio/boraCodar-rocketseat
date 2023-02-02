import { createFriendMsg, createMyMsg, answerMyMsg } from "./functions.js";
import {
  randomNum,
  yesOrNoAnswers,
  emojiAnswers,
  genericAnswers,
  laughAnswers,
  defaultAnswers,
} from "./answers.js";

// Variables
const userInfoAside = document.querySelector("aside.user_info");
const userInfoCloseBtn = document.querySelector(".user_info__close_btn");
const chatHeader = document.querySelector(".chat__header");
const currentDateElement = document.querySelector(".chat__current_date span");
const chatMsgs = document.querySelector(".chat__msgs");
const modal = document.querySelector("dialog");
const input = document.querySelector(".chat__footer__input");
const sendMsgBtn = document.querySelector(".chat__send_msg_btn");
const emojiBtn = document.querySelector(".chat__emoji_btn");

// For current hour on message
let date = new Date();
let minutes = date.getMinutes();
minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);
let currentHour = date.getHours() + ":" + minutes;

window.addEventListener("click", (e) => {
  console.log(e)
})
// Events
window.addEventListener("load", startConversation);
chatHeader.addEventListener("click", toggleUserInfo);
userInfoCloseBtn.addEventListener("click", toggleUserInfo);
sendMsgBtn.addEventListener("click", sendMsg);

// Functions
function startConversation() {
  currentDateElement.innerText = currentHour;

  setTimeout(
    () =>
      createFriendMsg(
        chatMsgs,
        currentHour,
        "Tive uma ideia incrível para um projeto! 😍"
      ),
    500
  );
}

function toggleUserInfo() {
  userInfoAside.classList.toggle("expanded");
}

function sendMsg(event) {
  event.preventDefault();
  if (input.value === "") {
    return;
  }

  createMyMsg(chatMsgs, currentHour, input.value);

  setTimeout(() => {
    let deleteMsgBtns = document.querySelectorAll(".chat__msg__delete_btn");
    deleteMsgBtns.forEach(deleteMsgBtn => {
      deleteMsgBtn.addEventListener("click", deleteMsg);
    });
  }, 900);
  
  input.value = "";

  setTimeout(() => {
    answerMyMsg(
      chatMsgs,
      currentHour,
      "E se a gente fizesse um chat moderno e responsivo em apenas uma semana?",
      yesOrNoAnswers[randomNum(yesOrNoAnswers.length)],
      emojiAnswers[randomNum(emojiAnswers.length)],
      genericAnswers[randomNum(genericAnswers.length)],
      laughAnswers[randomNum(laughAnswers.length)],
      defaultAnswers[randomNum(defaultAnswers.length)]
    );
  }, 800);
}

function deleteMsg(event) {
  modal.showModal();

  let yesBtn = document.querySelector(".yes_btn");
  let noBtn = document.querySelector(".no_btn");
  let myMsgs = document.querySelectorAll("div.chat__msg.chat__msg_me");

  myMsgs.forEach(myMsg => {
    yesBtn.addEventListener("click", () => {
      event.path.find(element => element == myMsg).innerHTML = "";
      modal.close();
    });
  });
  noBtn.addEventListener("click", () => {
    modal.close();
  });
}

// Emoji Picker
let picker = new EmojiButton({
  position: "right-end",
});

picker.on("emoji", emoji => {
  input.value += emoji;
  input.focus();
});

emojiBtn.addEventListener("click", () => {
  if (picker.pickerVisible) {
    picker.hidePicker();
  } else {
    picker.showPicker(emojiBtn);
  }
});

// Feather icons
feather.replace();