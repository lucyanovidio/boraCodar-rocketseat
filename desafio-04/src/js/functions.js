function createFriendMsg(msgsContainer, hour, message) {
  msgsContainer.innerHTML += `
    <div class="chat__msg chat__msg_friend">
      <div class="chat__msg__content">
        <p>Cecília - ${hour}</p>
        <p class="chat__msg_text">
          ${message}
        </p>
      </div>
    </div>
  `;

  window.scrollBy(0, window.innerHeight);
}

function createMyMsg(msgsContainer, hour, message) {
  msgsContainer.innerHTML += `
    <div class="chat__msg chat__msg_me">
      <button class="chat__msg__delete_btn">
        <img src="./src/image/trash.svg" alt="Botão para excluir mensagem com ícone de lixo." />
      </button>
      <div class="chat__msg__content">
        <p>Você - ${hour}</p>
        <p class="chat__msg_text">${message}</p>
      </div>
    </div>
  `;

  window.scrollBy(0, window.innerHeight);
}

function answerMyMsg(msgsContainer, hour, firstAnswer, yesOrNoAnswer, emojiAnswer, genericAnswer, laughAnswer, defaultAnswer) {
  let allMsgs = document.querySelectorAll(".chat__msg");
  let myLastMsg = document.querySelector(".chat__msg_me:last-child");
  let myLastMsgContent = document.querySelector(
    ".chat__msg_me:last-child .chat__msg_text"
  ).innerText;

  let answer;

  if (myLastMsg === allMsgs[1]) {
    createFriendMsg(msgsContainer, hour, firstAnswer);
    return;
  }

  if (
    myLastMsgContent.includes("qual") ||
    myLastMsgContent.includes("quais") ||
    myLastMsgContent.includes("Qual") ||
    myLastMsgContent.includes("Quais") ||
    myLastMsgContent.includes("?")
  ) {
    answer = genericAnswer;
  } else if (
    !myLastMsgContent.includes(" ") ||
    myLastMsgContent.includes("!")
  ) {
    answer = emojiAnswer;
  } else {
    answer = defaultAnswer;
  }

  if (
    myLastMsgContent.includes("ocê") ||
    myLastMsgContent.includes("vc") ||
    myLastMsgContent.includes("ontigo")
  ) {
    answer = yesOrNoAnswer;
  }

  if (
    myLastMsgContent.includes("kk") ||
    myLastMsgContent.includes("haha") ||
    myLastMsgContent.includes("😹") ||
    myLastMsgContent.includes("😅") ||
    myLastMsgContent.includes("🤣") ||
    myLastMsgContent.includes("😂") ||
    myLastMsgContent.includes("rs")
  ) {
    answer = laughAnswer;
  } 

  return createFriendMsg(msgsContainer, hour, answer);
}

export { createFriendMsg, createMyMsg, answerMyMsg };